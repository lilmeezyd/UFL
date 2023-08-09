import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import Leaderboard from './pages/Leaderboard'
import TeamSelection from './pages/TeamSelection'
import PickTeam from './pages/PickTeam';
import Points from './pages/Points'
import Transfers from './pages/Transfers';
import Teams from './pages/Teams'
import Matchdays from './pages/Matchdays'
import Positions from './pages/Positions'
import Players from './pages/Players'
import Fixtures from './pages/Fixtures'
import ProtectedRoute from './utils/ProtectedRoute';
import { useSelector } from "react-redux"
import { ModalContext } from './modalContext';

function App() {
  const user = useSelector((state) => state.auth)
  const [showModal, setShowModal] = useState(false) 
  const handleShow = () => {
    setShowModal(true)
  }
  const handleClose = () => {
    setShowModal(false)
  }
  const onClick = () => {
    //setShowModal(false)
  }
  return (
    <ModalContext.Provider value={showModal}>
    <>
    <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoute
            redirectPath='/login'
            isAllowed={!!user.user && !user.user.roles.includes(2048)}/>}>
            <Route path='/teamSelection' 
            element={<TeamSelection showPop={showModal} handleShow={handleShow} handleClose={handleClose} />} />
            <Route path='/points' element={<Points />} />
            <Route path='/pickteam' element={<PickTeam />} />
            <Route path='/transfers' element={<Transfers />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
          </Route>
          <Route element={<ProtectedRoute
            redirectPath='*'
            isAllowed={!!user.user && user.user.roles.includes(2048)} />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/dashboard/players' element={<Players />} />
            <Route path='/dashboard/teams' element={<Teams />} />
            <Route path='/dashboard/matchdays' element={<Matchdays />} />
            <Route path='/dashboard/fixtures' element={<Fixtures />} />
            <Route path='/dashboard/positions' element={<Positions />} />
          </Route>
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
        <Footer />
        {showModal && <div onClick={onClick} className="playerpopup"></div>}
        </div>
    </Router>
    <ToastContainer />
    </>
    </ModalContext.Provider>
  );
}

export default App;
