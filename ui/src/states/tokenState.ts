import { create } from 'zustand'

interface DexScreenerState {
    token: DexScreener | null
    tokenMeta: TokenMetadataResponse | null
    locked: boolean
    setToken: (Token?: DexScreener) => void
    setLocked: (locked:boolean) => void
    setTokenMeta: (tokenMeta?: TokenMetadataResponse) => void
}


export const useTokenStore = create<DexScreenerState>((set) => ({
    token: null,
    tokenMeta: null,
    locked: false,
    setToken: async (token?: DexScreener) => set({ token }),
    setTokenMeta: async (tokenMeta?: TokenMetadataResponse) => set({ tokenMeta }),
    setLocked: (locked) => set((state) => ({ locked: locked })),
}))