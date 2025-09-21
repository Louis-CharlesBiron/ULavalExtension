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