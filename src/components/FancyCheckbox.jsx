import styles from "./CSS/FancyCheckbox.module.css"

/**
 * Displays a fancy checkbox
 */
function FancyCheckbox({state, action, autoSave, isDarkModeCheckbox=false}) {
    return <label className={styles.checkboxParent}>
        <input type="checkbox" checked={state[0]} onChange={e=>{
            const checked = e.target.checked
            state[1](checked)
            if (typeof action=="function") action(checked)
            if (typeof autoSave=="function") autoSave(checked)
            }}></input>
        <span className={styles.checkCore+" "+(isDarkModeCheckbox?(state[0]?styles.night:styles.day):"")}></span>
    </label>
}
export default FancyCheckbox