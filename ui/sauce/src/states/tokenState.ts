import { create } from 'zustand'

interface DexScreenerState {
    token: DexScreener | null
    locked: boolean
    setToken: (Token?: DexScreener) => void
    setLocked: (locked:boolean) => void
}


export const useTokenStore = create<DexScreenerState>((set) => ({
    token: null,
    locked: false,
    setToken: async (token?: DexScreener) => set({ token }),
    setLocked: (locked) => set((state) => ({ locked: locked })),
}))