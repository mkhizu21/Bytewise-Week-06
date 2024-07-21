import {FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='header'>
        <div className='logo'>
            <Link to={'/'}>GoalSetter</Link>
        </div>
        <ul>
            <li>
                <Link to={'/login'} className='btn btn-link'>
                    <FaSignInAlt /> Login
                </Link>
            </li>
            <li>
                <Link to={'/register'} className='btn btn-link'>
                    <FaUser /> Register
                </Link>
            </li>
        </ul>
    </header>
  )
}

export default Header
