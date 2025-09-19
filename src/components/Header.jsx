import { useEffect, useState } from "react"
import styles from "./CSS/Header.module.css"
import Button from "./Button"
import { getTime } from "../utils/utils"

/**
 * Displays the main Header
 */
function Header({canGoBack=9}) {
    const [time, setTime] = useState(getTime())


    useEffect(()=>{
        setInterval(()=>setTime(getTime()), 900)
    })

    return <div className={styles.header}>
        <div className={styles.content}>
            {canGoBack&&<Button className={styles.back}>$back</Button>}
            <h1 className={styles.title}>ULaval Extension</h1>
            <div className={styles.time}>{time}</div>
        </div>
    </div>
}
export default Header