// JS
// ULaval Extension by Louis-Charles Biron
// Please don't use nor credit this code as your own.
//

chrome.storage.sync.get(r=>{
console.log(r)
    antiBloat(r.b)
})

chrome.runtime.onMessage.addListener(m=>{
    //console.log(m)
    if (m.type=="antiBloat") antiBloat(m.value)
})

console.log("YOOOO", m.darkMode)

function antiBloat(enabled) {
    const bloatElements = document.querySelectorAll("section:not(.mpo--liste-cours), div.mpo--site-hors-session, footer"), b_ll = bloatElements.length,
          visibility = enabled?"none":""
          console.log(bloatElements)
    for (let i=0;i<b_ll;i++) bloatElements[i].style.display = visibility
}