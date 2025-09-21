export const STORAGE_TYPES = {SYNC:"sync", LOCAL:"local", SESSION:"session"}
/**
 * Stores the state of a checkbox. (Browser Extension)
 * @param {HTMLInputElement} element The html checkbox element
 * @param {String?} storageType One of the supported storage types. (See: https://developer.chrome.com/docs/extensions/reference/api/storage?hl=fr#property)
 * @param {String} storageName The unique storage name to use
 * @param {Function?} onClickCB Function called on click. (isChecked, element)=>{...}
 * @param {Function?} onloadCB Function called on load. (isChecked, element)=>{...}
 * @param {Boolean?} initChecked Whether the checkbox is initially checked
 * @returns The html checkbox element
 */
export function keepCheckbox(element, storageType, storageName, onClickCB, onloadCB, initChecked=false) {
    storageType??=STORAGE_TYPES.SYNC
    chrome.storage[storageType].get(r=>{
        const checked = element.checked=r[storageName]??initChecked
        if (typeof onloadCB=="function") onloadCB(checked, element)
    })
    element.addEventListener("click", ()=>{
        const checked = element.checked
        chrome.storage[storageType].set({[storageName]:checked})
        if (typeof onClickCB=="function") onClickCB(checked, element)
    })
    return element
}

export const MESSAGE_DESTINATIONS = {CONTENT:0, BACKGROUND:1, ALL:2}
/**
 * Sends a message to the background or the content
 * @param {Object} obj The object to send
 * @param {Boolean?} destination If true, sends the message to the content instead of the background
 * @param {Function?} onErrorCB Function called upon error. (err)=>{...}
 */
export function sendMessage(obj={}, destination=MESSAGE_DESTINATIONS.CONTENT, onErrorCB=(err)=>{console.log(err)}) {
    if (destination==MESSAGE_DESTINATIONS.BACKGROUND) chrome.runtime.sendMessage(obj).catch(onErrorCB)
    else if (destination==MESSAGE_DESTINATIONS.CONTENT || destination==MESSAGE_DESTINATIONS.ALL) {
        chrome.tabs.query({currentWindow:true, active:true}, tabs=>chrome.tabs.sendMessage(tabs[0].id, obj).catch(onErrorCB))
        if (destination==MESSAGE_DESTINATIONS.ALL) chrome.runtime.sendMessage(obj).catch(onErrorCB)
    }
}

/**
 * Returns the time in the following format 00:00:00
 */
export function getTime() {
    const d = new Date()
    return ["getHours","getMinutes","getSeconds"].reduce((a, b)=>a+":"+(d[b]()>9?d[b]():"0"+d[b]()),"").slice(1)
}

const monthBank = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
      weekdayBank = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
/**
 * Returns the date in the following format [weekday] [date] [month] [year]
 */
export function getDate() {
    const d = new Date()
    return `${weekdayBank[d.getDay()]} ${d.getDate()} ${monthBank[d.getMonth()]} ${d.getFullYear()}`
}