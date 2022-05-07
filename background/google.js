
async function getLinkedInCompaniesUrl(data){
    const googleTab = await openGoogleAPITab()
    const msg =  { origin : "background", action : "getLinkedInCompanies", data}
    await sendMessageToTab(googleTab,msg)
}
async function closeGoogleTab(){
    return new Promise(async  (resolve)=> {
        try {
            let tabs = await browser.tabs.query({ url : "https://explorer.apis.google.com/" })
            console.log(tabs)
            if(tabs.length) resolve(await browser.tabs.remove(tabs[0].id))
        } catch(e){
            console.log(e);
            resolve(false)
        }
    })
}

//Open a google Tab
async function openGoogleAPITab(){
    return new Promise(async (resolve) => {
        resolve(await openPinnedTab("https://explorer.apis.google.com/"))
    })
}
