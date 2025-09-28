import { useEffect, useRef, useState } from "react"
import styles from "./CSS/MultiDisplayer.module.css"
import ProgressCircle from "./ProgressCircle"
import { msToTime } from "../utils/utils"

const TYPES = {BATTERY:0, TEST:1},
      REFRESH_TIMES = {
        [TYPES.BATTERY]: 5000,
        [TYPES.TEST]: 1000,
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
          lastIntervalIdRef = useRef(null)

    function refreshDisplay(type) {
        if (type==TYPES.BATTERY) {
            navigator.getBattery().then(battery=>{
                const level = battery.level, time = msToTime(battery.dischargingTime*1000)
                progressRef.current.setFillPercent(level)
                setInfo1({title:"Battery pourcentile", text:((level*100)|0)+"%"})
                setInfo2({title:"Time remaining", text:time.every(x=>!x)?"Charging...":((time[1]?time[1]+"d ":"")+(time[2]?time[2]+"h ":"")+(time[3]?time[3]+"min":"")+"\nleft")})
            })
        } else {
            progressRef.current.setFillPercent(Math.random())
            setInfo1({title:"a", text:123})
            setInfo2({title:"b", text:456})
        }
    }

    function updateType(type) {
        refreshDisplay(type)
        clearInterval(lastIntervalId)
        setLastIntervalId(setInterval(()=>{
            refreshDisplay(type)
        }, REFRESH_TIMES[type]))
    }

    // Dismount interval id keeper
    useEffect(()=>{lastIntervalIdRef.current=lastIntervalId}, [lastIntervalId])

    useEffect(()=>{
        // TODO STORE WHAT TO DISPLAY
        updateType(0||TYPES.BATTERY)



        return ()=>{
            // Clear interval on dismount
            clearInterval(lastIntervalIdRef.current)
        }
    },[])


    return <><ProgressCircle ref={progressRef}>
        <select className={styles.select} onInput={e=>updateType(+e.target.value)}>
            <option value={TYPES.BATTERY}>Battery</option>
            <option value={TYPES.TEST}>Local</option>
        </select>
        <div className={styles.text} title={info1.title}>{info1.text}</div>
        <div className={styles.text} title={info2.title}>{info2.text}</div>
    </ProgressCircle></>
}
export default MultiDisplayer
