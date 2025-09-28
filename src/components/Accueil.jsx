import { useEffect, useState } from "react"
import styles from "./CSS/Accueil.module.css"
import { classes, getDate } from "../utils/utils"
import { PAGES } from "../App"
import ProgressCircle from "./ProgressCircle"
import MultiDisplayer from "./MultiDisplayer"

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
            <div className={classes(styles.dateBlock, styles.block)}>
                <span>{date}</span>
            </div>
            <div className={classes(styles.notesBlock, styles.block)}>
                <textarea className={styles.notes} placeholder="
Notes..."></textarea>
            </div>
        </div>

        <div className={styles.right}>
            <div className={classes(styles.batteryBlock, styles.block)}>
                <MultiDisplayer/>
            </div>
            <div className={classes(styles.optionsBlock, styles.block)}>
                <button className={styles.optionsBtn} onClick={()=>activePageState[1](PAGES.OPTIONS)}>Website options →</button>
            </div>
            <div className={classes(styles.statusBlock, styles.block, "unobstrusive")}>
                By Louis-Charles Biron :)
            </div>
        </div>
    </div>
}
export default Accueil
