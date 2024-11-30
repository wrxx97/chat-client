import { create } from "zustand";

interface AppStore {
  // 当前置顶窗口的 ID
  topWindowId: string | null;

  // 是否启用暗黑模式
  darkMode: boolean;

  // 应用语言
  language: string;

  // 界面布局配置（可扩展）
  layoutConfig: Record<string, any>;

  // 更新置顶窗口 ID
  setTopWindow: (windowId: string | null) => void;

  // 切换暗黑模式
  toggleDarkMode: () => void;

  // 设置语言
  setLanguage: (language: string) => void;

  // 更新布局配置
  updateLayoutConfig: (config: Record<string, any>) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  topWindowId: null,
  darkMode: false,
  language: "en",
  layoutConfig: {},

  setTopWindow: (windowId) =>
    set(() => ({
      topWindowId: windowId,
    })),

  toggleDarkMode: () =>
    set((state) => ({
      darkMode: !state.darkMode,
    })),

  setLanguage: (language) =>
    set(() => ({
      language,
    })),

  updateLayoutConfig: (config) =>
    set((state) => ({
      layoutConfig: { ...state.layoutConfig, ...config },
    })),
}));
