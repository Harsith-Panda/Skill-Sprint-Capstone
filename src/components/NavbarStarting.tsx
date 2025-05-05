import { Link, useNavigate } from "react-router"
import logo from '../assets/logoipsum-249.svg';

function NavbarStarting() {
    const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center  w-full shadow-md p-2 px-6">
        <div>
            <Link to={'/'} className="text-xl font-extrabold"><img src={logo} className="inline mr-3"/>Skill-Sprint</Link>
        </div>
        <button className="bg-primary p-3 rounded-4xl hover:bg-primary-hover text-white" onClick={() => navigate('/login')}>Login / Register</button>
    </nav>
  )
}

export default NavbarStarting