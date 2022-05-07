

/* Message listener ; allow to communicate with content script and popup

 */
browser.runtime.onMessage.addListener( async (msg,sender,sendResponse) =>{
    console.log("message received from ",msg)
    switch(msg.origin) {
        case "popup" :
            startScrapping(msg.currentTab)
            break;
        case "content_script" :
            handleScrappingResults(msg.data)
            break;
        case "google" :
            //closeGoogleTab()
            handleScrappingResults(msg.data)
            break;
        default : console.log("backgrund received unknown message")
    }
})



async function sleep(ms){
    return new Promise(resolve => {
        setTimeout(function(){resolve()},ms);

    })

}

/* Main logic */
async function startScrapping(currentTab){
    //we ask the concerned tab to start scrapping the page
    await  sendMessageToOpenTab(currentTab,{origin: "background" , action : "scrapThisPage" })
}

async function handleScrappingResults(data){
    data.isLinkedInCompany?createLinkedInSearchFromLinkedInCompany(data.results):getLinkedInCompaniesUrl(data.results)
}