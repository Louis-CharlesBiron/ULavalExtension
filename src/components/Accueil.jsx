import styles from "./CSS/Accueil.module.css"

/**
 * Displays the main menu
 */
function Accueil() {
    return <div className={styles.accueil}>
        <div className={styles.left}>
            <div className={styles.dateBlock}>
                
            </div>
            <div className={styles.notesBlock}>

            </div>
        </div>
        <div className={styles.right}>
            <div className={styles.batteryBlock}>
                
            </div>
            <div className={styles.optionsBlock}>

            </div>
            <div className={styles.statusBlock}>

            </div>
        </div>
    </div>
}
export default Accueil
