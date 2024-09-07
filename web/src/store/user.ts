
import { create } from "zustand";


interface useUserStoreState {
    hideSettingsMoveGuide: boolean;
    updateGuideState: ( moveSettingsToAvatar: boolean ) => void;
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
    onLogin: () => void;
}


export const useUserStore = create<useUserStoreState>((set) => ({
    hideSettingsMoveGuide: false,
    updateGuideState: (moveSettingsToAvatar) => {
        set({ hideSettingsMoveGuide: moveSettingsToAvatar });
    },
    isLogin: false,
    setIsLogin: (isLogin) => {
        set({ isLogin });
    },
    onLogin: () => {
        window.location.href = 'https://api.token-ai.cn/login?redirect_uri=' + window.location.href;
    }
}));

