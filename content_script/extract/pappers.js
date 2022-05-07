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

function continueToScrap(){
    const availableResultsText = $("#app > div > div.min-height-100vh > div.informations > div.texte-droite.desktop-only > p").text()

    const currentPage = availableResultsText.split(" / ")[0]
    const maxPage = availableResultsText.split(" / ")[1]

    return Number(currentPage.trim())<=Number(maxPage.trim())
}

async function getUrlToScrap(){
    const urlToCatch =   ["v2/recherche"]
    await addInterceptorsXHR(urlToCatch)
    document.querySelector(".pagination .pagination-image-right").click()

}
async function sleep(ms){
    return new Promise(resolve => {
        setTimeout(function(){resolve()},ms);
    })

}
let companyResults = []
async function startScrapping(){
    let nextButton = $("a.pagination-image-right")[0]
    console.log(nextButton)
    while(continueToScrap()){
        await getCompaniesFromDOM()
        nextButton.click()
        await sleep(500)
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
