chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request.origin+" said to "+request.action)
        if (request.origin === "background") {
            if(request.action === "scrapThisPage"){
                startScrapping()
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





async function getNumberOfPagesToScrap(){
    const availableResultsText = $("#app > div > div.min-height-100vh > div.informations > div.texte-droite.desktop-only > p").text()

    const availableResultsNumber = availableResultsText.split(" / ")[1]
    const pageToScrap = Math.ceil(availableResultsNumber/20)
    return pageToScrap
}

async function getUrlToScrap(){
    const urlToCatch =   ["v2/recherche"]
    await addInterceptorsXHR(urlToCatch)
    document.querySelector(".pagination .pagination-image-right").click()

}
let companyResults = []
async function startScrapping(){
    let nextButton = $("a.pagination-image-right")
    while(!nextButton.hasClass("disabled")){
        await getCompaniesFromDOM()
        nextButton.click()
    }
    sendResults(companyResults)
}
 async function getCompaniesFromDOM() {
 return new Promise( resolve => {
     let results = document.querySelectorAll(".nom-entreprise")
     console.log(results)
     results.forEach( element => companyResults.push(element.firstChild.text.trim()))
     resolve(true)
 })
}
