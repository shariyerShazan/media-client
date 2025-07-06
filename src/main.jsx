import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router";
import { Router } from './routes/Routes';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>

  <>
  <RouterProvider router={Router}/>
  <ToastContainer  position="top-left"
autoClose={5000} />
  </>
  </StrictMode>,
)
