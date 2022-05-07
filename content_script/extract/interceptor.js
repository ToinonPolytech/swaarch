//abort this part : found another solution but could be great to see how to use interceptors
function addInterceptorsXHR(urlsMatching) {
    return new Promise ( resolve => {
        console.info("[SWAARCH] - Add interceptors XHR"+urlsMatching);
        const XHR = window.XMLHttpRequest;
        const open = XHR.prototype.open;
        const send = XHR.prototype.send;
        let interceptedURL;
        XHR.prototype.open = function (method, url, async, user, pass) {
            console.log(url)
            if (!urlsMatching || urlsMatching.some(reg => url.includes(reg))) {
                interceptedURL = url;
                console.log("[SWAARCH] - Intercept initializing request"+url);
                this.addEventListener('load', function () {
                    console.log("[SWAARCH] - Intercept response");

                });
            }
            open.call(this, method, url, async, user, pass);
        };

      /*  XHR.prototype.send = function(data) {

            if (interceptedURL && (!urlsMatching || urlsMatching.some(reg => interceptedURL.includes(reg)))) {
                console.log(data)
                console.log("interceptedURL :"+interceptedURL)
                console.info("[SWAARCH] - Intercept request");
                if(interceptedURL.includes(urlsMatching[0])){
                    scrapPappers(interceptedURL)
                }
            }
            send.call(this,data );
        };*/
        resolve(true)
    })

}

