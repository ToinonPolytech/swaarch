

async function performGoogleSearch(keyword){
    return new Promise(async (resolve) => {
        console.log("performing search for keyword : "+keyword)
        let xhr = new XMLHttpRequest();
        //AIzaSyAa8yy0GdcGPHdtD083HiGGx_S0vMPScDM
        xhr.open('GET',"https://content-customsearch.googleapis.com/customsearch/v1?q="+keyword+"&siteSearch=linkedin.com/company&cx=d98a676583ffdd00d&key=AIzaSyAa8yy0GdcGPHdtD083HiGGx_S0vMPScDM&")
        xhr.responseType = 'json';
        xhr.send();
        xhr.onload =  function() {
            console.log(xhr.response);
            if(xhr.status===429){
                setTimeout( ()=> {
                    performGoogleSearch(keyword).then( res => { resolve(res)})
                }, 30000)

            } else {
                resolve(xhr.response);
            }
        }

    })

}
