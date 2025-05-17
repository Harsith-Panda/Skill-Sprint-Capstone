import { useStore } from '../app/config/store/store'
import { auth } from '../app/config/firebase'
import NavbarStarting from '../components/NavbarStarting';

function Dashboard() {
  const user = useStore(state => state.user)
  console.log(Math.random())
  console.log(auth);
  return (
    <div>
        <header>
          <NavbarStarting />
        </header>
    </div>
  )
}

export default Dashboard