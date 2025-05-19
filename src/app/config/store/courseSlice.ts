import { collection, deleteDoc, doc, getDocs, query, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import type { StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { auth, db } from "../firebase";

export type Course = {
    id: string;
    img: string;
    title: string;
    category: string;
    description: string;
    createdAt: Timestamp;
    userid: string | undefined;
}

type courseActions = {
    addCourse: (course: Course) => Promise<void>
    deleteCourse: (course: Course["id"]) => Promise<void>
    updateCourse: (course: Course["id"], updatedValue: Course) => Promise<void>
    getCourses: () => Promise<void>
}

export type coursesSlice = {courses: Course[], thirdIsLoading: boolean} & courseActions;

const courseDocRef = collection(db, "courses");

export const createCourseSlice: StateCreator<coursesSlice, [], [['zustand/immer', unknown]], coursesSlice> = immer((set)=> ({
    courses: [] as Course[],
    thirdIsLoading: false,
    addCourse: async (course: Omit<Course, "id">) => {
        await setDoc(doc(db, "courses", course.title + auth.currentUser?.uid), course);

        set((state) =>  {state.courses.push({id: course.title + auth.currentUser?.uid, ...course})});
    },
    deleteCourse: async (courseId: Course["id"]) => {
        try {
            const docInst = doc(db, "courses", courseId);
            await deleteDoc(docInst);
            set((state) => {
              state.courses = state.courses.filter((val) => val.id !== courseId);
            });
          } catch (error) {
            console.error("Failed to delete course:", error);
          }
    },
    updateCourse: async(courseId: Course["id"], updatedValue: Course) => {
        const docInst = doc(db, "courses", courseId);
        await updateDoc(docInst, updatedValue);
    },
    getCourses: async () => {
        const q = query(
            courseDocRef,
            where("userid", "==", auth.currentUser?.uid)
        )
        const data = await getDocs(q);
        const newValues = data.docs.map((doc) => ({id: doc.id, ...(doc.data() as Omit<Course, "id">)}))
        set((state) => {state.courses = newValues})
    }
}))