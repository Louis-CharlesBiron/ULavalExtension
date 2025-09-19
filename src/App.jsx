import './App.css'
import Version from './components/Version'
import Header from './components/Header'
import Accueil from './components/Accueil'

function App() {


  return (
    <>
      <Header></Header>
      <Accueil></Accueil>

      <Version></Version>
    </>
  )
}

export default App

export const chrome = {
  downloads: {
    download:(obj)=>console.log("DOWNLOADING FILE ",obj)
  },
  windows: {
    create:(obj)=>console.log("NEW WINDOW CREATED AT ",obj)
  },
  storage:{
  syncv:{
      
  },
  localv:{
      
  },
  sync:{
      get:(cb, cb2)=>{
          setTimeout(()=>typeof cb !== "function" ? cb2(chrome.storage.syncv) : cb(chrome.storage.syncv), 100)
      },
      set:(obj)=>{
          setTimeout(()=>Object.keys(obj).forEach(key=>chrome.storage.syncv[key]=obj[key]), 100)
      },
      remove:(key)=>{
          setTimeout(()=>delete chrome.storage.syncv[key], 100)
      },
      clear:()=>chrome.storage.syncv = {},
      QUOTA_BYTES:102400,
      getBytesInUse:(cb)=>{
        setTimeout(()=>cb(random(100, 90000)), 100)
      },
  },
  local:{
      get:(cb, cb2)=>{
          setTimeout(()=>typeof cb !== "function" ? cb2(chrome.storage.localv) : cb(chrome.storage.localv), 100)
      },
      set:(obj)=>{
          setTimeout(()=>Object.keys(obj).forEach(key=>chrome.storage.localv[key]=obj[key]), 100)
      },
      remove:(key)=>{
          setTimeout(()=>delete chrome.storage.localv[key], 100)
      },
      clear:()=>chrome.storage.localv = {},
      getBytesInUse:(cb)=>{
        setTimeout(()=>cb(random(100, 100000)), 100)
      },
      QUOTA_BYTES: 10485760
  }
},
  management: {
    getSelf:(cb)=>setTimeout(()=>cb({versionName:"2.003"}),100)
  }
}
