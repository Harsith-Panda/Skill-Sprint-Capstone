import NavbarStarting from '../components/NavbarStarting';
import Landingimage from '../assets/Online Learning Illustration.svg';
import { useNavigate } from 'react-router';

function LandingPage() {
  const navigate = useNavigate();

  const userData: { name: string, message: string, desc: string, img: string }[] = [
    {
      name: "Kamala",
      message: "This is a wonderful app. I am a self-learner and this app has allowed me to boost my productivity.",
      desc: "-Web Developer, Adobe",
      img: "https://randomuser.me/api/portraits/women/85.jpg"
    },
    {
      name: "Alex",
      message: "I have been using this app since my Second year of University. And since then it has been a great bonus for me.",
      desc: "-Security Researcher, Google",
      img: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      name: "Kamal Deep",
      message: "This is a wonderful app. I am a self-learner and this app has allowed me to boost my productivity.",
      desc: "-UI/UX Engineer, Microsoft",
      img: "https://randomuser.me/api/portraits/men/65.jpg"
    },
    {
      name: "Raja",
      message: "This is a wonderful app. I am a self-learner and this app has allowed me to boost my productivity.",
      desc: "-Security Researcher, Urban Monkey",
      img: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Sridevi",
      message: "This is a wonderful app. I am a self-learner and this app has allowed me to boost my productivity.",
      desc: "-Full Stack Developer, TCS",
      img: "https://randomuser.me/api/portraits/women/8.jpg"
    },
    {
      name: "Shwetha",
      message: "This is a wonderful app. I am a self-learner and this app has allowed me to boost my productivity.",
      desc: "-HR, Wipro",
      img: "https://randomuser.me/api/portraits/women/82.jpg"
    },
  ];

  return (
    <div>
      <header>
        <NavbarStarting />
      </header>

      <main className="px-4 md:px-20 lg:px-32">
        <div className="flex flex-col items-center my-10 space-y-5">
          <img src={Landingimage} className="h-60 w-60 md:h-80 md:w-80" />
          <p className="text-xl md:text-3xl text-center">
            Watch smarter, not harder. Skill Sprint helps you track, manage, and complete your learning.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-primary hover:bg-primary-hover rounded-3xl px-5 py-2 text-white h-12"
          >
            Get Started
          </button>
        </div>

        <section className="my-16">
          <h1 className="text-primary text-2xl font-extrabold text-center mb-6">Testimonials</h1>
          <div className="flex gap-6 overflow-x-auto px-4 py-4 scrollbar-hidden">
            {userData.map((value) => (
              <div key={value.name} className="flex flex-col p-4 border rounded-md w-64 flex-shrink-0 items-center bg-white">
                <img src={value.img} className="h-24 w-24 md:h-36 md:w-36 rounded-full mb-4" />
                <p className="mb-3 text-center text-sm md:text-base">{value.message}</p>
                <h2 className="text-text-primary font-bold">{value.name}</h2>
                <p className="text-text-secondary text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="my-16">
          <h1 className="text-primary text-2xl font-extrabold text-center mb-6">Key Features</h1>
          <div className="flex flex-col md:flex-row justify-center gap-12">
            <ul className="text-left space-y-4">
              <li className="text-xl font-bold">🎯 Progress Tracking</li>
              <li className="text-xl font-bold">📚 Save Playlists</li>
            </ul>
            <ul className="text-left space-y-4">
              <li className="text-xl font-bold">📈 Visual Dashboard</li>
              <li className="text-xl font-bold">✅ Completion Reminders</li>
            </ul>
          </div>
        </section>

        <div className="text-center my-16 space-y-4">
          <h1 className="text-primary text-2xl font-extrabold mb-10">How does it work?</h1>
          <ul className="text-xl mb-10">
            <li className='justify-self-start'>Create a Course</li>
            <li className='justify-self-start'>List Videos in that Course</li>
            <li className='justify-self-start'>Paste the links and add videos in respective Course</li>
            <li className='justify-self-start'>All Done! Now track your progress easily.</li>
          </ul>
        </div>

        <div className="text-center my-16 space-y-6">
          <p className="text-2xl md:text-3xl">Ready to sprint? Start learning smarter today.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-primary hover:bg-primary-hover rounded-3xl px-5 py-2 text-white h-12"
          >
            Get Started
          </button>
        </div>
      </main>

      <footer className="flex flex-col md:flex-row justify-between items-center p-6 bg-shadow border-t border-primary text-center md:text-left">
        <p>©️ {new Date().getFullYear()} Skill Sprint</p>
        <p>Developed By S.Harsith Priyan</p>
      </footer>
    </div>
  )
}

export default LandingPage;