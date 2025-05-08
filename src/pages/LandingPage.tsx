import NavbarStarting from '../components/NavbarStarting';
import Landingimage from '../assets/Online Learning Illustration.svg';
import { useNavigate } from 'react-router';
import { useStore } from '../app/config/store/store.ts';
import { useEffect } from 'react';


function LandingPage() {

  const navigate = useNavigate();

  const userData: {name: string, message: string, desc: string, img: string}[] = [
    {
      name: "Kamala",
      message: "This is a wonderful app. I am a self-learner and this app has allowed me to boost my prductivity.",
      desc: "-Web Developer, Adobe",
      img: "https://randomuser.me/api/portraits/women/85.jpg"
    },
    {
      name: "Alex",
      message: "I have been using this app since my Second year of University. And since Then it has been a great bonus for me.",
      desc: "-Security Researcher, Google",
      img: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      name: "Kamal Deep",
      message: "This is a wonderful app. I am a self-learner and this app has allowed me to boost my prductivity.",
      desc: "-UI/UX Engineer, Microsoft",
      img: "https://randomuser.me/api/portraits/men/65.jpg"
    },
    {
      name: "Raja",
      message: "This is a wonderful app. I am a self-learner and this app has allowed me to boost my prductivity.",
      desc: "-Security Researcher, Urban Monkey",
      img: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Sridevi",
      message: "This is a wonderful app. I am a self-learner and this app has allowed me to boost my prductivity.",
      desc: "-Full Stack Developer, TCS",
      img: "https://randomuser.me/api/portraits/women/8.jpg"
    },
    {
      name: "Shwetha",
      message: "This is a wonderful app. I am a self-learner and this app has allowed me to boost my prductivity.",
      desc: "-HR, Wipro",
      img: "https://randomuser.me/api/portraits/women/82.jpg"
    },
  ];

  return (
    <div>
        <header>
            <NavbarStarting />
        </header>
        <main>
          <div className='flex flex-col m-3 p-4 mb-20'>
            <img src={Landingimage} className='h-80 w-80 self-center mb-2 mt-2'/>
            <div className='h-28 w-195 self-center mb-4 text-wrap'>
              <p className='text-3xl'>Watch smarter, not harder. Skill Sprint helps you track, manage, and complete your learning.</p>
            </div>
            <button onClick={() => navigate('/login')} className='bg-primary hover:bg-primary-hover rounded-3xl p-2 w-35 self-center text-white h-12'>Get Started</button>
          </div>
          <section>
          <h1 className='text-primary text-2xl font-extrabold'>Testimonials</h1>
          <div className='flex gap-12 overflow-x-auto animate-infinite-scroll mx-12 scrollbar-hidden'>
            {userData.map((value) => (
              <div className='flex flex-col p-2 border rounded-md text-wrap w-60 items-center flex-shrink-0'>
                <img src={value.img} className='h-36 w-36 rounded-full mb-5'/>
                <p className='mb-5'>{value.message}</p>
                <h2 className='text-text-primary'><strong>{value.name}</strong></h2>
                <p className='text-text-secondary'>{value.desc}</p>
              </div>
            ))}
          </div>
          </section>
          <section className='mt-15 mb-15'>
            <h1 className='text-primary text-2xl font-extrabold'>Key Features</h1>
            <div className='mx-50 flex justify-between my-15'>
              <ul className='text-left'>
                <li className='mb-5 text-xl font-bold'>🎯 Progress Tracking</li>
                <li className='text-xl font-bold'>📚 Save Playlists</li>
              </ul>
              <ul className='text-left'>
                <li className='mb-5 text-xl font-bold'>📈 Visual Dashboard</li>
                <li className='text-xl font-bold'>✅ Completion Reminders</li>
              </ul>
            </div>
          </section>
          <div className='mb-15'>
            <h1 className='text-primary text-2xl font-extrabold'>How does it work?</h1>
            <p>Paste playlist → Track → Complete</p>
          </div>
          <div className='pb-4 mb-8'>
            <p className='text-3xl mb-20'>Ready to sprint? Start learning smarter today.</p>
            <button onClick={() => navigate('/login')} className='bg-primary hover:bg-primary-hover rounded-3xl p-2 w-35 self-center text-white h-12'>Get Started</button>
          </div>
        </main>
        <footer className='flex justify-between p-7 bg-shadow border-t-1 border-primary'>
          <p>©️ {new Date().getFullYear()} Skill Sprint</p>
          <p>Developed By S.Harsith Priyan</p>
        </footer>
    </div>
  )
}

export default LandingPage
