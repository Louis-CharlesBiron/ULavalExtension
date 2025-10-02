import { useContext, useEffect, useRef, useState } from "react"
import styles from "./CSS/MultiDisplayer.module.css"
import ProgressCircle from "./ProgressCircle"
import { msToTime } from "../utils/utils"
import { UserManagerContext } from "./contexts/UserManagerContext"

export const MD_TYPES = {DEFAULT:0, BATTERY:0, HOUR:1}

const REFRESH_TIMES = {
        [MD_TYPES.BATTERY]: 5000,
        [MD_TYPES.HOUR]: 5000,
    }

/**
 * Don't forget the doc!
 * @param {*}
 */
function MultiDisplayer() {
    const progressRef = useRef(null),
          [info1, setInfo1] = useState({title:"", text:""}),
          [info2, setInfo2] = useState({title:"", text:""}),
          [lastIntervalId, setLastIntervalId] = useState(null),
          lastIntervalIdRef = useRef(null),
          userManager = useContext(UserManagerContext)

    function refreshDisplay(type) {
        if (type==MD_TYPES.BATTERY) {
            navigator.getBattery().then(battery=>{
                const level = battery.level, time = msToTime(battery.dischargingTime*1000)
                progressRef.current.setFillPercent(level)
                setInfo1({title:"Battery pourcentile", text:((level*100)|0)+"%"})
                setInfo2({title:"Time remaining", text:time.every(x=>!x)?"Charging...":((time[1]?time[1]+"d ":"")+(time[2]?time[2]+"h ":"")+(time[3]?time[3]+"min":"")+"\nleft")})
            })
        } else if (type==MD_TYPES.HOUR) {
            const d = new Date(), hourPourcent = (d.getMinutes()*60000+d.getSeconds()*1000+d.getMilliseconds())/3600000, hourPourcentText = ((hourPourcent*100)|0)+"%", minutesLeft = 60-d.getMinutes()
            progressRef.current.setFillPercent(hourPourcent)
            setInfo1({title:minutesLeft+"left until the next hour", text:minutesLeft+"min until "+(d.getHours()+1)+":00"})
            setInfo2({title:hourPourcentText+" of the current hour is completed", text:hourPourcentText+" completed"})
        }
    }

    function updateType(type, saveToStorage) {
        setTimeout(()=>refreshDisplay(type),10)
        clearInterval(lastIntervalId)
        setLastIntervalId(setInterval(()=>refreshDisplay(type), REFRESH_TIMES[type]))

        userManager.setMultiDisplayerPref = type
        if (saveToStorage) userManager.saveMultiDisplayerPref(type)
    }

    // Dismount interval id keeper
    useEffect(()=>{lastIntervalIdRef.current=lastIntervalId}, [lastIntervalId])

    useEffect(()=>{
        return ()=>{
            // Clear interval on dismount
            clearInterval(lastIntervalIdRef.current)
        }
    },[])

    useEffect(()=>{
        updateType(userManager.multiDisplayerPref, false)
    }, [userManager.multiDisplayerPref])


    return <><ProgressCircle ref={progressRef}>
        <select className={styles.select} onChange={e=>updateType(+e.target.value, true)} value={userManager.multiDisplayerPref}>
            <option value={MD_TYPES.BATTERY}>Battery</option>
            <option value={MD_TYPES.HOUR}>Current Hour</option>
        </select>
        <div className={styles.text} title={info1.title}>{info1.text}</div>
        <div className={styles.text} title={info2.title}>{info2.text}</div>
    </ProgressCircle></>
}
export default MultiDisplayer
