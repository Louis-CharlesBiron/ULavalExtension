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
            <div className={styles.dateBlock+" "+styles.block}>
                <span>{date}</span>
            </div>
            <div className={styles.notesBlock+" "+styles.block}>
                <textarea className={styles.notes} placeholder="
Notes..."></textarea>
            </div>
        </div>

        <div className={styles.right}>
            <div className={styles.batteryBlock+" "+styles.block}>
                
            </div>
            <div className={styles.optionsBlock+" "+styles.block}>
                <button className={styles.optionsBtn} onClick={()=>activePageState[1](PAGES.OPTIONS)}>Website options →</button>
            </div>
            <div className={styles.statusBlock+" "+styles.block}>
                By Louis-Charles Biron :)
            </div>
        </div>

    </div>
}
export default Accueil
