import './App.css'
import Version from './components/Version'
import Header from './components/Header'
import Accueil from './components/Accueil'
import Options from './components/Options'
import { useState } from 'react'
import {UserManagerContext} from './components/contexts/UserManagerContext.jsx'
import useUserManager from './models/useUserManager.jsx'

export const PAGES = {ACCUEIL:0, OPTIONS:1}

function App() {
  const [activePage, setActivePage] = useState(PAGES.ACCUEIL),
        userManager = useUserManager()
        
  return (
    <UserManagerContext.Provider value={userManager}>
      <Header activePageState={[activePage, setActivePage]}></Header>
      {
        activePage==PAGES.ACCUEIL?<Accueil activePageState={[activePage, setActivePage]}></Accueil>
        :activePage==PAGES.OPTIONS?<Options></Options>:
        <></>
      }
      <Version></Version>
    </UserManagerContext.Provider>
  )
}

export default App