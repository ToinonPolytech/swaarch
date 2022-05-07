async function  isTabAvailable(tabId){
    return new Promise( async (resolve) => {
        try {
            let  msg = {
                message : "AreYouAliveSemantik"
            }

            let res = await browser.tabs.sendMessage(tabId, msg)
            console.log("checking if tab is alive results in ", res)
            if(browser.runtime.lastError || !res){
                console.log(browser.runtime.lastError)
                resolve(false);
            } else {
                resolve(true)
            }
        } catch(error){
            console.log(error);
            resolve(false)
        }
    })
}
async function sendMessageToTab(tab,msg){
    return new Promise(async (resolve) => {
        msg.origin = "background"
        console.log(msg);
        if(await isTabAvailable(tab.id)){
            const res= await  sendMessageToOpenTab(tab,msg)
            console.log("sending message to", tab.url, "results in ",res)
            resolve(res);
        } else {
            let b = 0
            console.log("google tab is not available")
            while(!await isTabAvailable(tab.id) && b<5){
                await sleep(100)
                b++
            }
            resolve(await sendMessageToTab(tab,msg))
        }
    });
}
async function sendMessageToOpenTab(tab,message){
    return new Promise( async resolve => {
        console.log(tab)
        let response = await browser.tabs.sendMessage(tab.id, message)
        console.log(" sending message to"+tab.url+" results in",response)
        resolve(response)
    })

}
//Open a pinned tab based on the received url
async function openPinnedTab(url){
    return new Promise(async  (resolve)=> {
        try {
            resolve(await browser.tabs.create({active:false, pinned:true,index:0, url}))
        } catch(e){
            console.log(e);
            resolve(false)
        }
    })
}
async function getActiveTab(){
    return  new Promise( async (resolve) => {
        try {
            let tabs = await browser.tabs.query({ active : true })
            console.log(tabs)
            tabs.length === 0?
                resolve(false):
                resolve(tabs[0]);
        } catch(e){
            resolve(false);
        }
    })
}
