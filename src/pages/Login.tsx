import NavbarBar from "../components/NavbarLogin";

function Login() {
  return (
    <div className="flex flex-col min-h-screen">
        <NavbarBar />
        <div className="flex flex-col flex-1 justify-center items-center">
            <h1 className="text-primary">Get started using your Google Account!</h1>
            <button className="self-center border-3 border-primary hover:border-primary-hover p-5 rounded-2xl text-primary hover:text-primary-hover font-extrabold text-3xl">Sign-In with Google</button>
        </div>
    </div>
  )
}

export default Login