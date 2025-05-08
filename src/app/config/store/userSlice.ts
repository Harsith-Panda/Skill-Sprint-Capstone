import { getAuth, onAuthStateChanged } from "firebase/auth";
import type { StateCreator } from "zustand";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import type { User } from "firebase/auth";
import { persist } from "zustand/middleware";

type userState = {
    user: User | null;
    isloading: boolean;
}

type userActions = {
    initAuth: () => () => void;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

export type userSlice = userState & userActions;

export const createUserSlice: StateCreator<userSlice, [] ,[["zustand/persist", unknown]], userSlice> = persist((set) => ({
    user: null,
    isloading: false,
    initAuth: () => {
        console.log("Hi There")
        set({ isloading: true });

        const unsub = onAuthStateChanged(auth, (user) => {
            set({ user, isloading: false });
        });

        return unsub;
    },
    loginWithGoogle: async () => {
        const provider = new GoogleAuthProvider();

        try {
            set({ isloading: true });
            const result = await signInWithPopup(auth, provider);
            set({ user: result.user, isloading: false });
        } catch (e) {
            console.log(e);
            set({ isloading: false });
        }
    },
    logout: async () => {
        try {
            await auth.signOut();
            set({ user: null });
        } catch (e) {
            console.log(e);
        }
    },
}),{
    name:"App-User",
    partialize: (state) => ({
        user: state.user,
        isloading: state.isloading,
    }),
})