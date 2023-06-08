import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import Leaderboard from './pages/Leaderboard'
import PickTeam from './pages/PickTeam';
import Points from './pages/Points'
import Transfers from './pages/Transfers';
import Teams from './pages/Teams'
import Matchdays from './pages/Matchdays'
import Positions from './pages/Positions'
import Players from './pages/Players'
import Fixtures from './pages/Fixtures'

function App() {
  return (
    <>
    <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/points' element={<Points />} />
          <Route path='/pickteam' element={<PickTeam />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
          <Route path='/transfers' element={<Transfers />} />
          <Route path='/dashboard/players' element={<Players />} />
          <Route path='/dashboard/teams' element={<Teams />} />
          <Route path='/dashboard/matchdays' element={<Matchdays />} />
          <Route path='/dashboard/fixtures' element={<Fixtures />} />
          <Route path='/dashboard/positions' element={<Positions />} />
        </Routes>
        <Footer />
        </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
