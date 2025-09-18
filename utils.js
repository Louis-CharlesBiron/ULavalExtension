const STORAGE_TYPES = {SYNC:"sync", LOCAL:"local", SESSION:"session"}

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
function keepCheckbox(element, storageType, storageName, onClickCB, onloadCB, initChecked=false) {
    storageType??="sync"
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

/**
 * Sends a message to the background or the content
 * @param {Object} obj The object to send 
 * @param {Boolean?} sendToContent If true, sends the message to the content instead of the background
 * @param {Function?} onErrorCB Function called upon error. (err)=>{...}
 */
function sendMessage(obj={}, sendToContent, onErrorCB=(err)=>{console.log(err)}) {
    if (sendToContent) chrome.tabs.query({currentWindow:true, active:true}, tabs=>chrome.tabs.sendMessage(tabs[0].id, obj).catch(onErrorCB))
    else chrome.runtime.sendMessage(obj).catch(onErrorCB)
}