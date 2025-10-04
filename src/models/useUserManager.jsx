import { useEffect, useMemo, useState } from "react";
import { chrome } from "../scripts/DEV_fakeChrome";
import { SM } from "../utils/storageMapping";
import { MD_TYPES } from "../components/MultiDisplayer";

const DEFAULT_DARKMODE_VALUE = false,
      DEFAULT_ANTIBLOAT_VALUE = false,
      DEFAULT_USEGRAVITY_VALUE = false,
      DEFAULT_NOTES_VALUE = "",
      DEFAULT_MD_VALUE = MD_TYPES.DEFAULT,
      DEFAULT_PREVENTINACTIVITY_VALUE = false

function useUserManager() {
    const [darkMode, setDarkMode] = useState(DEFAULT_DARKMODE_VALUE), 
          [antiBloat, setAntiBloat] = useState(DEFAULT_ANTIBLOAT_VALUE), 
          [useGravity, setUseGravity] = useState(DEFAULT_USEGRAVITY_VALUE), 
          [notes, setNotes] = useState(DEFAULT_NOTES_VALUE),
          [multiDisplayerPref, setMultiDisplayerPref] = useState(DEFAULT_MD_VALUE),
          [preventInactivity, setPreventInactivity] = useState(DEFAULT_PREVENTINACTIVITY_VALUE)

    useEffect(()=>{
        chrome.storage.sync.get(r=>{
            setDarkMode(r[SM.darkMode]??DEFAULT_DARKMODE_VALUE)
            setAntiBloat(r[SM.antiBloat]??DEFAULT_ANTIBLOAT_VALUE)
            setUseGravity(r[SM.useGravity]??DEFAULT_USEGRAVITY_VALUE)
            setNotes(r[SM.notes]??DEFAULT_NOTES_VALUE)
            setMultiDisplayerPref(r[SM.multiDisplayerPref]??DEFAULT_MD_VALUE)
            setPreventInactivity(r[SM.preventInactivity]??DEFAULT_PREVENTINACTIVITY_VALUE)
        })
    }, [])

    const userManager = useMemo(()=>({
        get darkModeState() {return [darkMode, setDarkMode]},
        get darkMode() {return darkMode},
        set setDarkMode(v) {setDarkMode(v)},
        saveDarkMode(v) {chrome.storage.sync.set({[SM.darkMode]:v??darkMode})},

        get antiBloatState() {return [antiBloat, setAntiBloat]},
        get antiBloat() {return antiBloat},
        set setAntiBloat(v) {setAntiBloat(v)},
        saveAntiBloat(v) {chrome.storage.sync.set({[SM.antiBloat]:v??antiBloat})},

        get useGravityState() {return [useGravity, setUseGravity]},
        get useGravity() {return useGravity},
        set setUseGravity(v) {setUseGravity(v)},
        saveUseGravity(v) {chrome.storage.sync.set({[SM.useGravity]:v??useGravity})},

        get notesState() {return [notes, setNotes]},
        get notes() {return notes},
        set setNotes(v) {setNotes(v)},
        saveNotes(v) {chrome.storage.sync.set({[SM.notes]:v})},

        get multiDisplayerPrefState() {return [multiDisplayerPref, setMultiDisplayerPref]},
        get multiDisplayerPref() {return multiDisplayerPref},
        set setMultiDisplayerPref(v) {setMultiDisplayerPref(v)},
        saveMultiDisplayerPref(v) {chrome.storage.sync.set({[SM.multiDisplayerPref]:v??multiDisplayerPref})},

        get preventInactivityState() {return [preventInactivity, setPreventInactivity]},
        get preventInactivity() {return preventInactivity},
        set setPreventInactivity(v) {setPreventInactivity(v)},
        savePreventInactivity(v) {chrome.storage.sync.set({[SM.preventInactivity]:v})},

    }), [darkMode, antiBloat, useGravity, notes, multiDisplayerPref, preventInactivity])

    return userManager
}
export default useUserManager