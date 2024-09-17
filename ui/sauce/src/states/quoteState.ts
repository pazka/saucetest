import { create } from 'zustand'

interface QuoteState {
    quote: Quote | null
    setQuote: (quote?: Quote) => void
}

export const useQuoteStore = create<QuoteState>((set) => ({
    quote: null,
    setQuote: (quote?: Quote) => set((state) => ({ quote })),
}))
