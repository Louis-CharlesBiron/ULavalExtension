// JS
// ULaval Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

//Display version
chrome.management.getSelf(e=>version.textContent="V"+e.versionName)

keepCheckbox(darkModeI, STORAGE_TYPES.SYNC, m.darkMode, (isChecked)=>{
    console.log("DARK MODE", isChecked)
}, c=>console.log(c))

keepCheckbox(antiBloatI, STORAGE_TYPES.SYNC, m.antiBloat, (isChecked)=>{
    console.log("ANTIBLOAT", isChecked)
    sendMessage({type:"antiBloat", value:isChecked}, true)
}, c=>console.log(c))




