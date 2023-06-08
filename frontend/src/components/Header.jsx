import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import DashboardHeader from "../components/DashboardHeader"

function Header() {
  
  const navigate = useNavigate() 
  const dispatch = useDispatch() 
  const { user } = useSelector(
    (state) => state.auth
  )

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  return (
    <header className='header'>
        <div className='logo'>
            <Link to='/'>Fantasy</Link>
        </div>
        <ul>
                {
                    user && user.roles.includes(1) && user.roles.length === 1 && <>
                    <li>
                <Link to='/points'>
                    Points
                </Link>
               </li>
                    <li><Link to='/pickteam'>
                    Pick Team
                </Link>
                </li>
                <li>
                <Link to='/transfers'>
                    Transfers
                </Link>
                </li>
                <li>
                <Link to='/leaderboard'>
                    Leaderboard
                </Link>
                </li></>}
                {user && user.roles.includes(2048) && 
                <DashboardHeader />}
                {user ? (
                    <>
                <li>
                    <button className='btn' onClick={onLogout}>
                         Logout
                    </button>
                </li>
                </>
            ) : (<>
            <li>
                <Link to='/login'>
                    Login
                </Link>
            </li>
            <li>
                <Link to='/register'>
                    Signup
                </Link>
            </li>
            </>)}
        </ul>
    </header>
  )
}

export default Header