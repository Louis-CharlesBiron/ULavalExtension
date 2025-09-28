import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import styles from "./CSS/ProgressCircle.module.css"

/**
 * Displays a wheel-like progress viewer
 */
const ProgressCircle = forwardRef(({radius=100, barWidth=radius*.18, children, maxGlowOpacity=0.35}, ref)=>{
    const diameter = radius*2, circ = diameter*Math.PI, [fillPercent, setFillPercent] = useState(0.1)

    useImperativeHandle(ref, ()=>({
        setFillPercent:v=>setFillPercent(v)
    }))

    return <div className={styles.progressCircle}>
        <svg className={styles.wheel} width={diameter} height={diameter} style={{boxShadow: `0px 0px 20px 0px rgba(var(--l1), ${maxGlowOpacity*fillPercent})`}}>
            <circle className={styles.back} strokeWidth={barWidth} cx={radius} cy={radius} r={radius}></circle>
            <circle className={styles.progress} strokeWidth={barWidth} cx={radius} cy={radius} r={radius} style={{strokeDasharray: `${circ*fillPercent}, ${circ}`}}></circle>
        </svg>
        <div className={styles.infoParent}>
            {children}
        </div>
    </div>
})

export default ProgressCircle
