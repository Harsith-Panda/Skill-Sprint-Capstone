// import { useState } from 'react'
import './App.css'
import NavbarStarting from './components/NavbarStarting'
import Landingimage from './assets/Online Learning Illustration.svg';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router';
import { useStore } from './app/config/store/store.ts';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage.tsx';
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';

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
    element: <Dashboard />
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
    return <div>Loading...</div>; // Show loading while Firebase is restoring user
  }

  return (
    <RouterProvider router={router} />
  )
}

export default App
