import { useEffect, useMemo, useState } from "react";
import { chrome } from "../scripts/DEV_fakeChrome";
import { SM } from "../utils/storageMapping";
import { MD_TYPES } from "../components/MultiDisplayer";

function useUserManager() {
    const [darkMode, setDarkMode] = useState(false), 
          [antiBloat, setAntiBloat] = useState(false), 
          [useGravity, setUseGravity] = useState(false), 
          [notes, setNotes] = useState(""),
          [multiDisplayerPref, setMultiDisplayerPref] = useState(MD_TYPES.DEFAULT)

    useEffect(()=>{
        chrome.storage.sync.get(r=>{
            setDarkMode(r[SM.darkMode])
            setAntiBloat(r[SM.antiBloat])
            setUseGravity(r[SM.useGravity])
            setNotes(r[SM.notes])
            setMultiDisplayerPref(r[SM.multiDisplayerPref])
        })
    }, [])

    const userManager = useMemo(()=>({
        get darkMode() {return darkMode},
        set setDarkMode(v) {setDarkMode(v)},
        saveDarkMode(v) {chrome.storage.sync.set({[SM.darkMode]:v??darkMode})},

        get antiBloat() {return antiBloat},
        set setAntiBloat(v) {setAntiBloat(v)},
        saveAntiBloat(v) {chrome.storage.sync.set({[SM.antiBloat]:v??antiBloat})},

        get useGravity() {return useGravity},
        set setUseGravity(v) {setUseGravity(v)},
        saveUseGravity(v) {chrome.storage.sync.set({[SM.useGravity]:v??useGravity})},

        get notes() {return notes},
        set setNotes(v) {setNotes(v)},
        saveNotes(v) {chrome.storage.sync.set({[SM.notes]:v})},

        get multiDisplayerPref() {return multiDisplayerPref},
        set setMultiDisplayerPref(v) {setMultiDisplayerPref(v)},
        saveMultiDisplayerPref(v) {chrome.storage.sync.set({[SM.multiDisplayerPref]:v??multiDisplayerPref})},

    }), [darkMode, antiBloat, useGravity, notes])

    return userManager
}

export default useUserManager