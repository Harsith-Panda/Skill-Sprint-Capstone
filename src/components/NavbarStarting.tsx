import { Link } from "react-router"
import logo from '../assets/logoipsum-249.svg';

function NavbarStarting() {
  return (
    <nav className="flex justify-between items-center  w-full shadow-md p-2">
        <div>
            <Link to={'/'} className="text-xl font-extrabold"><img src={logo} className="inline mr-3"/>Skill-Sprint</Link>
        </div>
        <div className="bg-[#6867EC] p-3 rounded-4xl hover:bg-[#5046E5]">
            <Link to={'/login'} className="text-white"> Login / Register</Link>
        </div>
    </nav>
  )
}

export default NavbarStarting