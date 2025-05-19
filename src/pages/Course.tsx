import React, { useEffect, useState } from 'react'
import NavbarStarting from '../components/NavbarStarting'
import { useParams } from 'react-router'
import { useStore } from '../app/config/store/store';

function Course() {

  const {courseId} = useParams<{courseId: string}>();
  const videos = useStore(state => state.videos);
  const getVideos = useStore(state => state.getVideos);
  const [url, setUrl] = useState("");
  const addVideo = useStore(state => state.addVideo)
  const toggleWatched = useStore(state => state.toggleWatched)
  const deleteVideo = useStore(state => state.deleteVideo)
  const updatenote = useStore(state => state.updateNote)
  const secondIsLoading = useStore(state => state.secondIsLoading)

  useEffect(() => {
    getVideos(courseId);
  }, [])

  const handle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    let temp = url.slice(url.indexOf("v") + 2);
    if (temp.indexOf('&') != -1) {
      temp = temp.slice(0,temp.indexOf('&'));
    }
    addVideo(temp, courseId, url);
    setUrl("");
  }

  if (secondIsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    ); 
  }
  
  return (
    <div>
      <NavbarStarting />
      <div className="min-h-screen p-4 bg-gray-50">
        <div className="flex flex-col items-center justify-center mb-6">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter video URL"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md mb-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handle}
            className="bg-primary text-white px-6 py-2 rounded-lg shadow-md hover:bg-primary-hover transition"
          >
            + Add Video
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white p-4 rounded-2xl shadow-md flex flex-col"
            >
              <img
                onClick={() => window.open(video.url, '_blank')}
                src={video.thumbnail}
                alt={video.title}
                className="rounded-lg w-full h-48 object-cover mb-3"
              />
              <h1 className="text-lg font-semibold mb-1">{video.title}</h1>
              <p className="mb-1 text-sm text-gray-600">
                {video.watched ? "✅ Watched" : "⏳ Not Watched"}
              </p>
              <input
                type="checkbox"
                checked={video.watched}
                onChange={() => toggleWatched(video.id)}
                className="mb-2"
              />
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 text-sm mb-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={3}
                placeholder="Add notes..."
                value={video.notes}
                onChange={(e) => updatenote(video.id, e.target.value)}
              />

              <button
                onClick={() => deleteVideo(video.id)}
                className="bg-primary text-white px-4 py-1 rounded-md hover:bg-primary-hover transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Course