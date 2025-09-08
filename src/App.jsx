import { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider, NavLink } from 'react-router-dom'
import Calculator from "./Components/Calculator.jsx"
import Todoapp from "./Components/Todoapp.jsx"
import Tictactoe from "./Components/Tictactoe.jsx"

function App() {
  function Navbar (){
    return (
      <nav className='mainnavbar'>
        <NavLink className={(e)=>{return e.isActive?"red mainbuttons":"mainbuttons"}} to="/">Calculator</NavLink>
        <NavLink className={(e)=>{return e.isActive?"red mainbuttons":"mainbuttons"}} to="/todoapp">Todo App</NavLink>
        <NavLink className={(e)=>{return e.isActive?"red mainbuttons":"mainbuttons"}} to="/tictactoe">Tic Tac Toe</NavLink>
    </nav>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /><Calculator/></>
    },
    {
      path: "/todoapp",
      element: <><Navbar /><Todoapp/></>
    },
    {
      path: "/tictactoe",
      element: <><Navbar /><Tictactoe/></>
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
