// JS
// ULaval Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

chrome.runtime.onInstalled.addListener(e=>{
    if (e.reason == "install" || e.reason == "update") {
        //console.log(e)
    }
})

chrome.runtime.onMessage.addListener(msg=>{
    if (msg.type=="darkMode") darkModeInjecter(msg.value)
})

function darkModeInjecter(enabled) {
    if (enabled) chrome.scripting.registerContentScripts([{
        id: "darkMode",
        css: ["./content/darkMode.css"],
        persistAcrossSessions: true,
        matches: ["https://monportail.ulaval.ca/*", "https://sitescours.monportail.ulaval.ca/*"],
        excludeMatches: ["*://*/*.pdf*"]
    }]).catch(()=>{})
    else chrome.scripting.unregisterContentScripts({ids:["darkMode"]}).catch(()=>{})
}
