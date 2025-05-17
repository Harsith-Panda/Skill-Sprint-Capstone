import React, { useEffect, useState } from 'react'
import NavbarStarting from '../components/NavbarStarting'
import { HTMLFormMethod, useParams } from 'react-router'
import { useStore } from '../app/config/store/store';
import { ReactFormState } from 'react-dom/client';

function Course() {

  const {courseId} = useParams<{courseId: string}>();
  const videos = useStore(state => state.videos);
  const getVideos = useStore(state => state.getVideos);
  const [url, setUrl] = useState("");
  const addVideo = useStore(state => state.addVideo)

  useEffect(() => {
    getVideos(courseId);
  }, [])

  const handle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(url.indexOf("v"));
    let temp = url.slice(url.indexOf("v") + 2);
    temp = temp.slice(0,temp.indexOf('&'));
    console.log(temp);
    addVideo(temp);
  }
  return (
    <div>
      <NavbarStarting />
      <div>
        <input type='text' value={url} onChange={(e) => setUrl(e.target.value)}/>
        <button onClick={(e) => handle(e)}>+ Add Video</button>
      </div>
    </div>
  )
}

export default Course