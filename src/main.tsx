import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import Login from './pages/Login.tsx';
import "normalize.css";
import injectGlobal from 'styled-components';

injectGlobal(`
  body {
    margin: 0;
    padding: 0;
  }
`);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/login',
    element: <Login />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
