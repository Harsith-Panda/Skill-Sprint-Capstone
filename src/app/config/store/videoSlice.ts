import type { StateCreator } from "zustand";
import { Course } from "./courseSlice";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { immer } from "zustand/middleware/immer";

type Video = {
    id: string;
    title: string;
    courseId: string;
    watched: boolean;
    progress: number;
    duration: string;
    thumbnail: string;
    notes: string;
    userid: string;
}

type videoActions = {
    getVideos: (course: Course["id"] | undefined) => Promise<void>;
    deleteVideo: (id: Video["id"]) => Promise<void>;
    addVideo: (vidId: string) => Promise<void>;
}

export type videoSlice = {videos: Video[]} & videoActions;

const videosDocRef = collection(db, "videos");

export const createVideoSlice: StateCreator<videoSlice, [], [['zustand/immer',unknown]], videoSlice> = immer(((set) => ({
    videos: [],
    getVideos: async (course: Course["id"] | undefined) => {
        const q = query(
            videosDocRef,
            where("userid", "==", auth.currentUser?.uid),
            where("courseId", "==", course)
        )
        const data = await getDocs(q);
        const newValue = data.docs.map((doc) => ({id: doc.id, ...(doc.data() as Omit<Video, "id">)
        }));

        set((state) => {state.videos = newValue});
    },
    deleteVideo: async (id: Video["id"]) => {},
    addVideo: async(vidId: string) => {
        const vidRequest = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${import.meta.env.VITE_youtube}&part=snippet&id=${vidId}`);
        let vid = await vidRequest.json();
        console.log(vid);
    }
})))