let h1 = document.getElementsByTagName("h1")[0];
h1.innerHTML="Working to find companies URL... Do not close this tab.";
document.title = "Swaarch - Currently building an awesome list"
let link = document.querySelector("link[rel~='icon']");
if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
}
link.href = 'https://cdn-icons-png.flaticon.com/512/4338/4338689.png';