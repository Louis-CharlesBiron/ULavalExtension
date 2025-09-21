import { useEffect, useState } from "react"
import styles from "./CSS/Version.module.css"
import { chrome } from "../scripts/DEV_fakeChrome"

/**
 * Displays the app version
 */
function Version() {
    const [version, setVersion] = useState("v")

    useEffect(()=>{
        chrome.management.getSelf(e=>setVersion("v"+e.versionName))
    }, [])

    return <span className={styles.versionDisplay}>{version}</span>
}
export default Version