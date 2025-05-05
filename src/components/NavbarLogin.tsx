import { Link } from "react-router"
import logo from '../assets/logoipsum-249.svg';

function NavbarBar() {
  return (
    <nav className="flex justify-start items-center  w-full shadow-md p-2 px-6">
        <div>
            <Link to={'/'} className="text-xl font-extrabold"><img src={logo} className="inline mr-3"/>Skill-Sprint</Link>
        </div>
    </nav>
  )
}

export default NavbarBar