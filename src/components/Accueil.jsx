import { useEffect, useState } from "react"
import styles from "./CSS/Accueil.module.css"
import { getDate } from "../utils/utils"
import { PAGES } from "../App"

/**
 * Displays the main menu
 */
function Accueil({activePageState}) {
    const [date, setDate] = useState(getDate())

    useEffect(()=>{

        setInterval(()=>setDate(getDate()), 1000*60*60)

    }, [])

    return <div className={styles.menu}>

        <div className={styles.left}>
            <div className={styles.dateBlock}>
                <span>{date}</span>
            </div>
            <div className={styles.notesBlock}>
                <textarea className={styles.notes} placeholder="
Notes..."></textarea>
            </div>
        </div>

        <div className={styles.right}>
            <div className={styles.batteryBlock}>
                
            </div>
            <div className={styles.optionsBlock}>
                <button className={styles.optionsBtn} onClick={()=>activePageState[1](PAGES.OPTIONS)}>Website options →</button>
            </div>
            <div className={styles.statusBlock}>

            </div>
        </div>

    </div>
}
export default Accueil
