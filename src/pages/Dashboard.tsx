import { useEffect } from 'react';
import { useStore } from '../app/config/store/store';
import NavbarStarting from '../components/NavbarStarting';
import { useNavigate } from 'react-router';
import Fallback from '../assets/undraw_easter-bunny_1v4n.svg';

function Dashboard() {
  const courses = useStore((state) => state.courses);
  const videos = useStore((state) => state.videos);
  const getCourses = useStore((state) => state.getCourses);
  const getAllVideos = useStore((state) => state.getAll);
  const navigate = useNavigate();

  useEffect(() => {
    getCourses();
    getAllVideos();
  }, []);

  const isValidImageUrl = (url: string) => {
    return /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg)$/i.test(url);
  };

  const handleCourseNav = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  const handleVideoNav = (videoId: string) => {
    navigate(`/video/${videoId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header>
        <NavbarStarting />
      </header>

      <main className="px-4 md:px-10 py-6 space-y-10">
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Courses</h2>
            <button
              onClick={() => navigate('/courses')}
              className="text-blue-500 text-sm hover:underline"
            >
              View All
            </button>
          </div>

          <div className="flex flex-wrap gap-4 justify-start">
            {courses && courses.length > 0 ? (
              courses.map((val) => (
                <div
                  key={val.id}
                  className="w-full sm:w-[48%] md:w-[30%] lg:w-[23%] bg-white rounded-xl shadow hover:shadow-md transition p-4 cursor-pointer"
                  onClick={() => handleCourseNav(val.id)}
                >
                  <img
                    src={isValidImageUrl(val.img) ? val.img : Fallback}
                    onError={(e) => {
                      e.currentTarget.src = Fallback;
                    }}
                    alt="Course Thumbnail"
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <div className="mt-2">
                    <h3 className="text-lg font-semibold truncate">{val.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{val.description}</p>
                    <p className="text-xs text-blue-500 mt-1">{val.category}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center w-full text-gray-500">No courses added yet!</p>
            )}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4 mt-8">
            <h2 className="text-2xl font-bold">All Videos</h2>
          </div>

          <div className="flex flex-wrap gap-4 justify-start">
            {videos && videos.length > 0 ? (
              videos.map((video) => (
                <div
                  key={video.id}
                  className="w-full sm:w-[48%] md:w-[30%] lg:w-[23%] bg-white rounded-xl shadow hover:shadow-md transition p-4 cursor-pointer"
                  onClick={() => handleVideoNav(video.id)}
                >
                  <img
                    src={isValidImageUrl(video.thumbnail) ? video.thumbnail : Fallback}
                    onError={(e) => {
                      e.currentTarget.src = Fallback;
                    }}
                    alt="Video Thumbnail"
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <div className="mt-2">
                    <h3 className="text-lg font-semibold truncate">{video.title}</h3>
                    <p className="text-xs text-green-500 mt-1">{video.notes}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center w-full text-gray-500">No videos uploaded yet!</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
