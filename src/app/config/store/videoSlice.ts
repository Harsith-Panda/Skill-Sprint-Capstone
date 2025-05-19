import type { StateCreator } from "zustand";
import { Course } from "./courseSlice";
import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { immer } from "zustand/middleware/immer";

type Video = {
    id: string;
    title: string;
    courseId: string | undefined;
    watched: boolean;
    thumbnail: string;
    notes: string;
    userid: string | undefined;
    url: string;
}

type videoActions = {
    getVideos: (course: Course["id"] | undefined) => Promise<void>;
    deleteVideo: (id: Video["id"]) => Promise<void>;
    addVideo: (vidId: string, courseId: string | undefined, url: string) => Promise<void>;
    toggleWatched: (id: string) => Promise<void>;
    updateNote: (id: string, note: string) => Promise<void>;
    getAll: () => Promise<void>;
}

export type videoSlice = {videos: Video[], secondIsLoading: boolean} & videoActions;

const videosDocRef = collection(db, "videos");

export const createVideoSlice: StateCreator<videoSlice, [], [['zustand/immer',unknown]], videoSlice> = immer(((set, get) => ({
    videos: [],
    secondIsLoading: false,
    getVideos: async (course: Course["id"] | undefined) => {
        set(() => ({ secondIsLoading: true }));
        try {
          const q = query(
            videosDocRef,
            where("userid", "==", auth.currentUser?.uid),
            where("courseId", "==", course)
          );
          const data = await getDocs(q);
          const newValue = data.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Video, "id">),
          }));
          set(() => ({ videos: newValue }));
        } catch (error) {
          console.error("Error fetching videos", error);
        } finally {
          set(() => ({ secondIsLoading: false }));
        }
    },
    deleteVideo: async (id: Video["id"]) => {
        try {
            const docInst = doc(db, "videos", id);
            await deleteDoc(docInst);
            set((state) => {
              state.videos = state.videos.filter((val) => val.id !== id);
            });
          } catch (error) {
            console.error("Failed to delete course:", error);
          }
    },

    addVideo: async(vidId: string, courseId: string | undefined, url: string) => {
        const vidRequest = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${import.meta.env.VITE_youtube}&part=snippet&id=${vidId}`);
        let {items} = await vidRequest.json();
        await setDoc(doc(db, "videos", items[0].snippet.title + auth.currentUser?.uid), {title: items[0].snippet.title, courseId: courseId, thumbnail: items[0].snippet.thumbnails.default.url, watched: false,userid: auth.currentUser?.uid, notes: "", url: url});
        set((state) =>  {state.videos.push({id: items[0].snippet.title + auth.currentUser?.uid, title: items[0].snippet.title, courseId: courseId, thumbnail: items[0].snippet.thumbnails.default.url, watched: false, userid: auth.currentUser?.uid, notes:"", url: url})});
    },

    toggleWatched: async(id: string) => {
        const { videos } = get();
        const updatedVideos = videos.map((video) =>
        video.id === id ? { ...video, watched: !video.watched } : video
        );
        set({ videos: updatedVideos });

        try {
        const docRef = doc(db, 'videos', id);
        await updateDoc(docRef, {
            watched: !videos.find((v) => v.id === id)?.watched,
        });
        } catch (error) {
        console.error('Error updating Firestore:', error);
        }
    },

    updateNote: async (id, note) => {
    const { videos } = get();
    const updatedVideos = videos.map(video =>
      video.id === id ? { ...video, notes: note } : video
    );
    set({ videos: updatedVideos });

    try {
      await updateDoc(doc(db, 'videos', id), { notes: note });
    } catch (error) {
      console.error('Error updating notes:', error);
    }
  },

  getAll: async() => {
    set(() => ({ secondIsLoading: true }));
    const q = query(
            videosDocRef,
            where("userid", "==", auth.currentUser?.uid)
        );
    const data = await getDocs(q);
    const newValue = data.docs.map((doc) => ({id: doc.id, ...(doc.data() as Omit<Video, "id">)}));

    set(() => ({
      videos: newValue,
      secondIsLoading: false,
    }));
  }
})))