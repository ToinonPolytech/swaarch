
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request.origin+" said to "+request.action)
        if (request.origin === "background") {
           if(request.action === "scrapThisPage"){
               scrapThisPage()
           }
        }
        sendResponse(true)
    });
function sendResults(results){
    chrome.runtime.sendMessage({
        origin : "content_script",
        data : { companyList : true, results, isLinkedInCompany : false}}, function(response) {
        console.log(response);
    });
}

function getUrlToScrap(){
    return new Promise (resolve => {
       // $("#pager > ul:nth-child(1) > li:nth-child(4) > a").click( function(){    resolve(window.location.href)  })
        //@TODO : find how to get urls with params
        resolve(window.location.href)
    })


}
function getNumberOfPagesToScrap(){
    const availableResultsText = $("#resultat").text()

    const availableResultsNumber = availableResultsText.split(" result")[0]
    const pageToScrap = Math.ceil(availableResultsNumber/20)
    return pageToScrap
}
async function scrapThisPage(){
    let urlToScrap = await getUrlToScrap()
    console.log(urlToScrap)
    let pageToScrap = getNumberOfPagesToScrap()
    console.log(pageToScrap)
    let res = []
    for(let j =1;j<=pageToScrap;j++){
        let result = await  fetch(urlToScrap+"&page="+j)
        result = await result.text()
        const html = document.createElement("html")
        html.innerHTML = result;
        for(let i=1;i<=20;i++){ let url = html.querySelector("#listeEnseigne > div > div:nth-child("+i+") > div.card-body.text-center > a")
            if(url){
                console.log(url.innerHTML)
                res.push(url.innerHTML)} }
    }
    console.log(res)
    sendResults(res)
}