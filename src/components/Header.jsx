import { useEffect, useState } from "react"
import styles from "./CSS/Header.module.css"
import Button from "./Button"
import { getTime } from "../utils/utils"
import { PAGES } from "../App"

/**
 * Displays the main Header
 */
function Header({activePageState}) {
    const [time, setTime] = useState(getTime())


    useEffect(()=>{
        setInterval(()=>setTime(getTime()), 900)
    })

    return <div className={styles.header}>
        <div className={styles.content}>
            {activePageState[0]==PAGES.OPTIONS&&<Button className={styles.back} onClick={()=>activePageState[1](PAGES.ACCUEIL)}>$back</Button>}
            <h1 className={styles.title}>ULaval Extension</h1>
            <div className={styles.time}>{time}</div>
        </div>
    </div>
}
export default Header