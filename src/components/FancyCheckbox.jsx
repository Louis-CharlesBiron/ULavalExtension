import { useEffect } from "react"
import styles from "./CSS/FancyCheckbox.module.css"
import { chrome } from "../App"
import { STORAGE_TYPES } from "../utils/utils"

/**
 * Displays a fancy checkbox
 */
function FancyCheckbox({state, action, storageName, storageType=STORAGE_TYPES.SYNC, isDarkModeCheckbox=false}) {
    const [stateChecked, setChecked] = state

    useEffect(()=>{
        if (storageName) chrome.storage[storageType].get(r=>setChecked(r[storageName]??false))
    }, [])

    return <label className={styles.checkboxParent}>
        <input type="checkbox" checked={state[0]} onChange={e=>{
            const checked = e.target.checked
            setChecked(checked)
            if (storageName) chrome.storage[storageType].set({[storageName]:checked})
            if (typeof action=="function") action(checked, setChecked)
            }}></input>
        <span className={styles.checkCore+" "+(isDarkModeCheckbox?(stateChecked?styles.night:styles.day):"")}></span>
    </label>
}
export default FancyCheckbox