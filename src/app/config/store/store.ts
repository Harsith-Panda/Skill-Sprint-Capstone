import {create} from "zustand";
import { createUserSlice, userSlice } from "./userSlice";

export const useStore = create<userSlice>()((...a) => ({
    ...createUserSlice(...a)
}))