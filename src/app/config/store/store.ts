import {create} from "zustand";
import { createUserSlice, userSlice } from "./userSlice";
import { createCourseSlice, coursesSlice } from "./courseSlice";
import { createVideoSlice, videoSlice } from "./videoSlice";

export const useStore = create<userSlice & coursesSlice & videoSlice>()((...a) => ({
    ...createUserSlice(...a),
    ...createCourseSlice(...a),
    ...createVideoSlice(...a)
}))