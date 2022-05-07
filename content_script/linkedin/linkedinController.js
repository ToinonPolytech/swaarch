chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request.origin+" said to "+request.action)
        if (request.origin === "background") {
            if(request.action === "buildLinkedInSearches"){
                buildLinkedInSearches(request.data)
            }
        }
        sendResponse(true)
        return true;
    });
function sendResults(results){
    chrome.runtime.sendMessage({
        origin : "linkedin",
        data : { companyList : true, results, isLinkedInCompany : false}}, function(response) {
        console.log(response);
    });
}

async function buildLinkedInSearches(data) {
    let csrf = await getCSRFToken()
    let companies = data;
    companies = companies.filter( e => e!==null)
    let companiesName = companies.map(e => e.split("?").shift())
    companiesName = companiesName.map( (e) => { if(e.charAt(e.length - 1)==="/"){let arr=  e.split("/") ; return arr[arr.length-2]} else { return e.split("/").pop() } })
    let ids = [];
    let id;
    let i=0;
    let results=[]
    for await (const companyName of companiesName) {
        console.log("loading id of "+companyName)
        id=false
        if (Number.isInteger(companyName)) {
            id = company
        } else {
            id = await new Promise((resolve) =>
                fetch(
                    `https://www.linkedin.com/voyager/api/organization/companies?decorationId=com.linkedin.voyager.deco.organization.web.WebFullCompanyMain-37&q=universalName&universalName=${encodeURIComponent(companyName)}`,
                    {
                        headers: {
                            accept: 'application/vnd.linkedin.normalized+json+2.1',
                            'csrf-token': csrf
                        },
                        referrer: 'https://www.linkedin.com/',
                        referrerPolicy: 'strict-origin-when-cross-origin',
                        body: null,
                        method: 'GET',
                        mode: 'cors',
                        credentials: 'include',
                    },
                ).then((r) => r.json().then((res) => resolve(res.data['*elements'][0].split(':').pop()))).catch(() => resolve(false)),
            );
        }
        if(id)
            ids.push('"' + id + '"');

        if(i===200){
            //if we have 200 companies, we generate an search url and start over again
            i=0
            let linkedinSearchURL="https://www.linkedin.com/search/results/people/?currentCompany=%5B" + ids.join('%2C') +"%5D"
            console.log(linkedinSearchURL);
            results.push(linkedinSearchURL)
            ids=[]
        } else {
            i++
        }
    }
    let linkedinSearchURL="https://www.linkedin.com/search/results/people/?currentCompany=%5B" + ids.join('%2C')+"%5D"
    console.log(linkedinSearchURL);
    window.open(linkedinSearchURL)
    results.push(linkedinSearchURL)
    console.log(results)
}