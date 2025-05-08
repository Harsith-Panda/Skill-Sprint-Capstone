import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { useStore } from './app/config/store/store.ts';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage.tsx';
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';
import { ProtectedRoutes } from './app/utils/ProtectedRoutes.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    )
  }
])


function App() {
  const initAuth = useStore(state => state.initAuth);
  const isloading = useStore(state => state.isloading);

  useEffect(() => {
    const unsub = initAuth();

    return () => unsub();
  }, [initAuth])

  if (isloading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    ); // Show loading while Firebase is restoring user
  }

  return (
    <RouterProvider router={router} />
  )
}

export default App
