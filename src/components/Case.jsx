import styles from "./CSS/Case.module.css"

/**
 * Represent a option box
 */
function Case({text, children}) {
    return <div className={styles.case}>
        <div className={styles.header}>{text}</div>
        <div className={styles.content}>
            {children}
        </div>
    </div>
}
export default Case