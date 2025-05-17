import { FormEvent, useEffect, useState } from 'react'
import { useStore } from '../app/config/store/store'
import NavbarStarting from '../components/NavbarStarting'
import Fallback from '../assets/undraw_easter-bunny_1v4n.svg';
import { auth } from '../app/config/firebase';
import { Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router';

function Courses() {
  const [addButton, setAddButton] = useState(false);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const getCourses = useStore(state => state.getCourses);
  const addCourses = useStore(state => state.addCourse);
  const deleteCourse = useStore(state => state.deleteCourse);

  const navigate = useNavigate();

  useEffect(() => {
    getCourses();
  }, [])

  const courses = useStore(state => state.courses)

  function handleClick(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addCourses({id: title + auth.currentUser?.uid, title: title, description: description, img: image, category: category, createdAt: Timestamp.fromDate(new Date()), userid: auth.currentUser?.uid});
    setCategory("");
    setDescription("");
    setImage("");
    setTitle("");
    setAddButton(false);
  }

  const isValidImageUrl = (url: string) => {
    // Simple check: must start with http/https and end with image extension
    return /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg)$/i.test(url);
  };

  const handleNav = (courseId: string) => {
    navigate(`/course/${courseId}`);
  }

  return (
    <div>
      <header>
        <NavbarStarting />
      </header>
      <div>
      <div className="p-4 max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-4 justify-start">
          {courses && courses.length > 0 ? (
            courses.map((val) => (
              <div
                key={val.id}
                className="w-full sm:w-[48%] md:w-[30%] lg:w-[23%] bg-white rounded-xl shadow hover:shadow-md transition p-4"
                onClick={() => handleNav(val.id)}
              >
                <img
                  src={isValidImageUrl(val.img) ? val.img : Fallback}  // ✅ upfront check
                  onError={(e) => {
                    e.currentTarget.src = Fallback;  // ✅ fallback on load error
                  }}
                  alt="Course Thumbnail"
                  className="w-full h-40 object-cover rounded-md"
                />
                <div className="mt-2">
                  <h1 className="text-lg font-semibold truncate">{val.title}</h1>
                  <p className="text-sm text-gray-600 line-clamp-2">{val.description}</p>
                  <p className="text-xs text-blue-500 mt-1">{val.category}</p>
                  <button className="text-xs text-blue-500 mt-1 border border-blue-500 p-2 rounded-2xl" onClick={() => deleteCourse(val.id)}>Delete Course</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-full text-gray-500">No Courses added yet!</p>
          )}
          <div
            className="w-full sm:w-[48%] md:w-[30%] lg:w-[23%] flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl text-gray-700 cursor-pointer hover:bg-gray-50 transition p-4 min-h-[250px]"
          >
            {addButton ? (
              <form
                onSubmit={(e) => handleClick(e)}
                className="flex flex-col gap-3 w-full"
              >
                <input
                  placeholder="Course Name"
                  className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
                <input
                  placeholder="Category"
                  className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                />
                <input
                  placeholder="Description"
                  className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
                <button
                  type="submit"
                  className="bg-primary text-white py-2 rounded hover:bg-primary-hover transition text-sm"
                >
                  Submit
                </button>
                <button
                  onClick={() => setAddButton(false)}
                  className="bg-primary text-white py-2 rounded hover:bg-primary-hover transition text-sm"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <p
                onClick={() => setAddButton(true)}
                className="text-lg font-medium text-center hover:underline"
              >
                + Add Course
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  </div>
  )
}

export default Courses