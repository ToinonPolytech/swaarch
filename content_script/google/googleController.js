chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request.origin+" said to "+request.action)
        if (request.origin === "background") {
            if(request.action === "getLinkedInCompanies"){
                getLinkedInCompaniesUrl(request.data)
            }
        }
        sendResponse(true)
        return true;
    });
function sendResults(results){
    chrome.runtime.sendMessage({
        origin : "google",
        data : { companyList : true, results, isLinkedInCompany : true}}, function(response) {
        console.log(response);
    });
}
async function sleep(ms){
    return new Promise(resolve => {
        setTimeout(function(){resolve()},ms);

    })

}

async function getLinkedInCompaniesUrl(data) {
    console.log(data)
    let res = [];
    for(let i=0;i<data.length;i++){
        let response = await performGoogleSearch(data[i])
        if(response.items && response.items[0]){
            const url = response.items[0].link
            console.log(url)
            res.push(url)
        }

        await sleep(2000);
    }
    sendResults(res)

}