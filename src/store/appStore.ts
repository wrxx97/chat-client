import type { UserInfo } from '..'
import { create } from 'zustand'
import { clearAccessToken } from '../utils/token'

interface AppStore {
  user: UserInfo | null

  // 当前置顶窗口的 ID
  topWindowId: string | null

  // 是否启用暗黑模式
  darkMode: boolean

  // 应用语言
  language: string

  // 界面布局配置（可扩展）
  layoutConfig: Record<string, any>

  setUser: (user: UserInfo | null) => void

  // 更新置顶窗口 ID
  setTopWindow: (windowId: string | null) => void

  // 切换暗黑模式
  toggleDarkMode: () => void

  // 设置语言
  setLanguage: (language: string) => void

  // 更新布局配置
  updateLayoutConfig: (config: Record<string, any>) => void

  logout: () => void
}

export const useAppStore = create<AppStore>(set => ({
  user: null,
  topWindowId: null,
  darkMode: false,
  language: 'en',
  layoutConfig: {},

  setUser: user =>
    set(() => ({
      user,
    })),

  setTopWindow: windowId =>
    set(() => ({
      topWindowId: windowId,
    })),

  toggleDarkMode: () =>
    set(state => ({
      darkMode: !state.darkMode,
    })),

  setLanguage: language =>
    set(() => ({
      language,
    })),

  updateLayoutConfig: config =>
    set(state => ({
      layoutConfig: { ...state.layoutConfig, ...config },
    })),

  logout: () => {
    // 清空token
    clearAccessToken()
    window.location.href = '/'
    // 清空用户信息
    set(() => ({
      user: null,
    }))
  },
}))
