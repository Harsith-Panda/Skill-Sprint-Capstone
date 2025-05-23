import NavbarBar from "../components/NavbarLogin";
import { useStore } from "../app/config/store/store";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();
  const loginWithGoogle = useStore(state =>  state.loginWithGoogle);
  
  async function handleLogin() {
    await loginWithGoogle();
    navigate('/dashboard')
  }
  return (
    <div className="flex flex-col min-h-screen">
        <NavbarBar />
        <div className="flex flex-col flex-1 justify-center items-center">
            <h1 className="text-primary">Get started using your Google Account!</h1>
            <button onClick={handleLogin} className="self-center border-3 border-primary hover:border-primary-hover p-3 rounded-2xl text-primary hover:text-primary-hover font-extrabold text-xl mt-8">Sign-In with Google</button>
        </div>
    </div>
  )
}

export default Login