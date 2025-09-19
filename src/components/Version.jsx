import { useEffect, useState } from "react"
import styles from "./CSS/Version.module.css"

/**
 * Displays the app version
 */
function Version() {
    const [version, setVersion] = useState("v")

    useEffect(()=>{
        const chrome = {management:{getSelf:(cb)=>setTimeout(()=>cb({versionName:"1.0"}),100)}}// CHROME TODEL
        chrome.management.getSelf(e=>setVersion("v"+e.versionName))
    }, [])

    return <span className={styles.versionDisplay}>{version}</span>
}
export default Version