import styles from "./CSS/Options.module.css"
import styles2 from "./CSS/Accueil.module.css"
import Case from "./Case"
import FancyCheckbox from "./FancyCheckbox"
import { useState } from "react"
import { darkModeAction, removeBloatAction, useGravityAction } from "../scripts/optionsFunctions"
import {SM} from "../utils/storageMapping"

/**
 * Displays the options menu
 */
function Options() {

    const antiBloatEnabledState = useState(false),
          darkModeEnabledState = useState(false),
          useGravityEnabledState = useState(false)


    return <div className={styles2.menu+" "+styles.options}>
        <div className={styles.row}>
            <Case></Case>
            <Case text="Remove Bloat"><FancyCheckbox state={antiBloatEnabledState} action={removeBloatAction} storageName={SM.antiBloat}></FancyCheckbox></Case>
            <Case text="Dark Mode"><FancyCheckbox state={darkModeEnabledState} action={darkModeAction} storageName={SM.darkMode} isDarkModeCheckbox={true}></FancyCheckbox></Case>
        </div>

        <div className={styles.row}>
            <Case text="Enable Gravity"><FancyCheckbox state={useGravityEnabledState} action={useGravityAction} storageName={SM.useGravity}></FancyCheckbox></Case>
            <Case text="Custom Indicators"></Case>
            <Case></Case>
        </div>

        <div className={styles.row}>
            <Case text="Auto Open Zoom"></Case>
            <Case text="Save menu location"></Case>
            <Case text="Auto Login"></Case>
        </div>
        
    </div>
}
export default Options