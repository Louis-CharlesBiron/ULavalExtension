import styles from "./CSS/Options.module.css"
import styles2 from "./CSS/Accueil.module.css"
import Case from "./Case"
import FancyCheckbox from "./FancyCheckbox"
import { useContext } from "react"
import { darkModeAction, preventInactivity, removeBloatAction, useGravityAction } from "../scripts/optionsFunctions"
import {SM} from "../utils/storageMapping"
import { UserManagerContext } from './contexts/UserManagerContext'

/**
 * Displays the options menu
 */
function Options() {
    const userManager = useContext(UserManagerContext)

    return <div className={styles2.menu+" "+styles.options}>
        <div className={styles.row}>
            <Case text="Prevent Inactivity"><FancyCheckbox state={userManager.preventInactivityState} action={preventInactivity} storageName={SM.preventInactivity} autoSave={userManager.savePreventInactivity}></FancyCheckbox></Case>
            <Case text="Remove Bloat"><FancyCheckbox state={userManager.antiBloatState} action={removeBloatAction} storageName={SM.antiBloat} autoSave={userManager.saveAntiBloat}></FancyCheckbox></Case>
            <Case text="Dark Mode"><FancyCheckbox state={userManager.darkModeState} action={darkModeAction} storageName={SM.darkMode} autoSave={userManager.saveDarkMode} isDarkModeCheckbox={true}></FancyCheckbox></Case>
        </div>

        <div className={styles.row}>
            <Case text="Enable Gravity"><FancyCheckbox state={userManager.useGravityState} action={useGravityAction} autoSave={userManager.saveUseGravity} storageName={SM.useGravity}></FancyCheckbox></Case>
            <Case text="Custom Indicators"></Case>
            <Case text="Custom Theme"></Case>
        </div>

        <div className={styles.row}>
            <Case text="Auto Open Zoom">?</Case>
            <Case text="Save menu location">?</Case>
            <Case text="Auto Login">?</Case>
        </div>
        
    </div>
}
export default Options