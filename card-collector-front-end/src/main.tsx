import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginSignup  from "./views/LoginSignup"
import { ChecklistView } from './views/ChecklistView'
import InventoryView from './views/InventoryView'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login-signup',
        element: <LoginSignup />
      },
      {
        path: '/checklist',
        element: <ChecklistView />
      },
      {
        path: '/inventory',
        element: <InventoryView />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>,
)
