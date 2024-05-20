import { lazy, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import {Route, Routes} from 'react-router-dom'
import { UserContextProvider } from './contexts/UserContext'
import Layout from './Layout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import Interests from './pages/Interests'
import Organize from './pages/Organize'
import InitiativesPage from './pages/InitiativesPage'
import ChallengesPage from './pages/ChallengesPage'

// const Home = lazy(() => import('./pages/Home'));
// const InitiativesPage = lazy(() => import('./pages/InitiativesPage'));
// const ChallengesPage = lazy(() => import('./pages/ChallengesPage'));

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home />}/> 
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/interests' element={<Interests />} />
          <Route path='/dashboard/:subpage?' element={<Dashboard />} />  
          <Route path='/dashboard/:subpage/:action' element={<Organize />} /> 
          <Route path='/initiatives' element={<InitiativesPage />} /> 
          <Route path='/challenges' element={<ChallengesPage />} /> 
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
