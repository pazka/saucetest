import { create } from 'zustand'

interface Swap {
    sellToken: string
    buyToken: string
    sellAmount: string
}

interface SwapState {
    currentSwap: Swap | null
    quote: Quote | null
    setSwap: (Token?: Swap) => void
}

export const useSwapStore = create<SwapState>((set) => ({
    currentSwap: null,
    quote: null,
    setSwap: async (swap?: Swap) => set({ currentSwap: swap }),
    setQuote: (quote?: Quote) => set((state) => ({ quote })),
}))
