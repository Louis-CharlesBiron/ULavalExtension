import './App.css'
import Version from './components/Version'
import Header from './components/Header'
import Accueil from './components/Accueil'
import Options from './components/Options'
import { useState } from 'react'

export const PAGES = {ACCUEIL:0, OPTIONS:1}

function App() {
  const [activePage, setActivePage] = useState(PAGES.ACCUEIL)


  return (
    <>
      <Header activePageState={[activePage, setActivePage]}></Header>
      {
        activePage==PAGES.ACCUEIL?<Accueil activePageState={[activePage, setActivePage]}></Accueil>
        :activePage==PAGES.OPTIONS?<Options></Options>:
        <></>
      }
      

      <Version></Version>
    </>
  )
}

export default App



export const chrome={downloads:{download:e=>console.log("DOWNLOADING FILE ",e)},windows:{create:e=>console.log("NEW WINDOW CREATED AT ",e)},storage:{syncv:{},localv:{},sync:{get:(e,o)=>{setTimeout((()=>"function"!=typeof e?o(chrome.storage.syncv):e(chrome.storage.syncv)),100)},set:e=>{setTimeout((()=>Object.keys(e).forEach((o=>chrome.storage.syncv[o]=e[o]))),100)},remove:e=>{setTimeout((()=>delete chrome.storage.syncv[e]),100)},clear:()=>chrome.storage.syncv={},QUOTA_BYTES:102400,getBytesInUse:e=>{setTimeout((()=>e(random(100,9e4))),100)}},local:{get:(e,o)=>{setTimeout((()=>"function"!=typeof e?o(chrome.storage.localv):e(chrome.storage.localv)),100)},set:e=>{setTimeout((()=>Object.keys(e).forEach((o=>chrome.storage.localv[o]=e[o]))),100)},remove:e=>{setTimeout((()=>delete chrome.storage.localv[e]),100)},clear:()=>chrome.storage.localv={},getBytesInUse:e=>{setTimeout((()=>e(random(100,1e5))),100)},QUOTA_BYTES:10485760}},management:{getSelf:e=>setTimeout((()=>e({versionName:"2.003"})),100)}};
