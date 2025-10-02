import { classes } from "../utils/utils"
import styles from "./CSS/Case.module.css"

/**
 * Represent a option box
 */
function Case({text, helpText="Help text", children}) {
    return <div className={styles.case}>
        <div className={styles.header}>
            {text}
            <span className={styles.help} title={helpText}>(?)</span>    
        </div>
        <div className={styles.content}>
            {children}
        </div>
    </div>
}
export default Case