
availableURLs = [
    "https://www.observatoiredelafranchise.fr/",
    "https://www.pappers.fr/recherche"]
let currentTab;
chrome.tabs.query(
    {active:true},
    tabs=>{
        currentTab=tabs[0];
        console.log("URL:", currentTab.url)
        isAvailable(currentTab.url)
    }
)
function isAvailable(url){
    let isAvailableBool = availableURLs.some(function(item){
        return url.includes(item)
    })
    if(isAvailableBool){
        $("#scrapping_button").show();
        $("#unavailableUrl").hide()
    } else {
        $("#scrapping_button").hide();
        $("#unavailableUrl").show()
    }
}
/*  When we click on the scrapping button, it will send a message to the backgrond to start scrapping */
$(document).on("click", "#scrapping_button", function(){
    console.log("send message to background")
    chrome.runtime.sendMessage({
        origin:"popup",
        currentTab
    },()=>{})
})