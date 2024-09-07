

import { create } from "zustand";


interface SystemState {
    theme: "light" | "dark" | "auto";
    setTheme: (theme: "light" | "dark" | "auto") => void;
}

export const useSystemStore = create<SystemState>((set) => ({
    theme: (localStorage.getItem("theme") as "light" | "dark" | "auto") ?? "auto",
    setTheme: (theme) => {
        set({ theme });
        localStorage.setItem("theme", theme);
    },
}));