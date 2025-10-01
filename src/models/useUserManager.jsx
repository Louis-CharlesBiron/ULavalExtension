import { useEffect, useMemo, useState } from "react";
import { chrome } from "../scripts/DEV_fakeChrome";
import { SM } from "../utils/storageMapping";

function useUserManager() {
    const [darkMode, setDarkMode] = useState(false), 
          [antiBloat, setAntiBloat] = useState(false), 
          [useGravity, setUseGravity] = useState(false), 
          [notes, setNotes] = useState("INIT STATE (BAD)")

    useEffect(()=>{
        chrome.storage.sync.get(r=>{
            setDarkMode(r[SM.darkMode])
            setAntiBloat(r[SM.antiBloat])
            setUseGravity(r[SM.useGravity])
            setNotes(r[SM.notes])
        })
    }, [])

    const userManager = useMemo(()=>({
        get darkMode() {return darkMode},
        set setDarkMode(v) {setDarkMode(v)},

        get antiBloat() {return antiBloat},
        set setAntiBloat(v) {setAntiBloat(v)},

        get useGravity() {return useGravity},
        set setUseGravity(v) {setUseGravity(v)},

        get notes() {return notes},
        set setNotes(v) {setNotes(v)},
        saveNotes(v) {chrome.storage.sync.set({[SM.notes]:v})}
    }), [darkMode, antiBloat, useGravity, notes])

    return userManager
}

export default useUserManager