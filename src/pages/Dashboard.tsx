import { useState } from 'react'
import NavbarStarting from '../components/NavbarStarting'
import { useStore } from '../app/config/store/store'
import { auth } from '../app/config/firebase'

function Dashboard() {
  const user = useStore(state => state.user)
  console.log(Math.random())
  console.log(auth);
  return (
    <div>
        <header>
            Dashboard
            {user.displayName}
        </header>
    </div>
  )
}

export default Dashboard