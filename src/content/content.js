// JS
// ULaval Extension by Louis-Charles Biron
// Please don't use nor credit this code as your own.
//

// HELLO MESSAGE
console.log("%cThank you for using ULaval Extension :)", "color:lime;font-size:16px")
console.log(`%c${logoVariations[random(0, logoVariations.length-1)]}`, "font-size:11.5px;font-family:monospace;white-space:pre;color:aliceblue")
console.log("\n\nBy Louis-Charles Biron\n\n\n")

// GLOBALS
const preloadBacklog = []
let loadingFinished = false

// MESSAGE LISTENER
chrome.runtime.onMessage.addListener(execMapper)

// FUNCTION MAPPER
function execMapper(msg) {
    if (!loadingFinished && msg.postLoad) preloadBacklog.push(msg)
    else {
        if (msg.type=="antiBloat") antiBloat(msg.value)
        else if (msg.type=="darkMode") darkMode(msg.value)
    }
}

// AUTO APPLY FROM STORAGE
chrome.storage.sync.get(r=>{
    if (r[SM.antiBloat]) execMapper({type:"antiBloat", value:r[SM.antiBloat], postLoad:true})
})

// LOADING OBSERVER
const loadingClass = "mpo-squelette-cadre", targetElement = document.querySelector("."+loadingClass)
if (targetElement) {
const loadingObserver = new MutationObserver(list=>{
    list.forEach(mut=>mut.removedNodes.forEach(el=>{
        if (el.className.includes(loadingClass)) {
            // ON LOAD
            console.log("LOADING FINISHED")
            loadingFinished = true
            preloadBacklog.forEach(msg=>execMapper(msg))
            loadingObserver.disconnect()
        }
    }))
})
    loadingObserver.observe(targetElement.parentElement, {childList:true})
}

// FUNCTIONS DEFINITIONS
function antiBloat(enabled) {
    const bloatElements = document.querySelectorAll("section:not(.mpo--liste-cours), div.mpo--site-hors-session, footer, .mpo-gabarit-accordeon-liste-cours__nombre-nouvautes"), b_ll = bloatElements.length, visibility = enabled?"none":""
    for (let i=0;i<b_ll;i++) bloatElements[i].style.display = visibility

    // CENTER THE DIV
    const parent = document.querySelector(".mpo-smart-page-tableau-bord__zone-cours-et-messages-importants")
    parent.style.display = "flex"
    parent.style.justifyContent = "center"

    // CLEAN EDITION TEXT
    document.querySelector(".mpo-smart-entete-cadre__logo-mpo").innerHTML = "mon<b>Portail</b><i style='font-size:0.85em'>&nbsp;Clean edition</i>"
}

function darkMode(enabled) {
    const head = document.querySelector("head"),
          styleElement = document.createElement("style"),
          id = "__ULEDM__",
          oldElement = document.getElementById(id)
    
    styleElement.id = id
    if (oldElement) oldElement.remove()
    styleElement.appendChild(document.createTextNode(enabled ? manualDarkModeCSS: manualLightModeCSS))
    head.appendChild(styleElement)
}