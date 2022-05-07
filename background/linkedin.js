
async function createLinkedInSearchFromLinkedInCompany(data){
    const linkedInTab = await openLinkedInTab()
    const msg =  { origin : "background", action : "buildLinkedInSearches", data}
    await sendMessageToTab(linkedInTab,msg)
}
//Open a LinkedIn tab
async function openLinkedInTab(){
    return new Promise(async (resolve) => {
        resolve(await openPinnedTab("https://www.linkedin.com"))
    })
}
