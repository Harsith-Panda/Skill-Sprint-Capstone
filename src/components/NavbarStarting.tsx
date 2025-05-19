import { Link, useNavigate } from "react-router";
import logo from '../assets/logoipsum-249.svg';
import { useStore } from "../app/config/store/store";
import { useState } from "react";

function NavbarStarting() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useStore(state => state.user);
  const logout = useStore(state => state.logout);
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center w-full shadow-md p-2 px-6 relative z-20 bg-white">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-extrabold flex items-center">
          <img src={logo} className="inline mr-3 w-10 h-10" alt="Logo" />
          Skill-Sprint
        </Link>
      </div>

      <div className="hidden md:flex gap-10 items-center">
        <Link to="/dashboard" className="text-lg font-medium text-primary">Dashboard</Link>
        <Link to="/courses" className="text-lg font-medium text-primary">Courses</Link>
        {user !== null && <Link to="/profile" className="text-lg font-medium text-primary">Profile</Link>}
        {user === null ? (
          <button className="bg-primary p-3 rounded-4xl hover:bg-primary-hover text-white" onClick={() => navigate('/login')}>
            Login / Register
          </button>
        ) : (
          <button className="bg-primary p-3 rounded-4xl hover:bg-primary-hover text-white" onClick={() => logout()}>
            Logout
          </button>
        )}
      </div>

      <button className={`md:hidden text-3xl z-30 ${(isOpen) ? 'hidden' : 'block'}`} onClick={() => setIsOpen(true)}>☰</button>

      {isOpen && (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center gap-10 z-20">
          <button className="absolute top-5 right-5 text-3xl text-black" onClick={() => setIsOpen(false)}>X</button>

          <div className="absolute top-5 left-5 flex items-center">
            <img src={logo} className="inline mr-2 w-10 h-10" alt="Logo" />
            <span className="text-xl font-extrabold">Skill-Sprint</span>
          </div>

          <Link to="/dashboard" className="text-lg font-medium text-primary" onClick={() => setIsOpen(false)}>Dashboard</Link>
          <Link to="/courses" className="text-lg font-medium text-primary" onClick={() => setIsOpen(false)}>Courses</Link>
          {user !== null && <Link to="/profile" className="text-lg font-medium text-primary" onClick={() => setIsOpen(false)}>Profile</Link>}
          {user === null ? (
            <button className="bg-primary p-3 rounded-4xl hover:bg-primary-hover text-white" onClick={() => { setIsOpen(false); navigate('/login'); }}>
              Login / Register
            </button>
          ) : (
            <button className="bg-primary p-3 rounded-4xl hover:bg-primary-hover text-white" onClick={() => { setIsOpen(false); logout(); }}>
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavbarStarting;