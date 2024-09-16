import { create } from 'zustand'
import { getIndexDbPersistentData, saveIndexDbPersistentData } from '../lib/indexDb'

interface SecureUserState {
    user: SecureUser | null
    setUser: (user: SecureUser) => void
}


export const useUserStore = create<SecureUserState>((set) => ({
    user: null,
    setUser: async (user: SecureUser) => {
        console.log('ZUSTAND setting user', user)
        await saveIndexDbPersistentData('user', user)
        console.log('ZUSTAND DB SET', user)
        set({ user })
    },
}))

getIndexDbPersistentData('user').then((user : any) => {
    if (user) {
        useUserStore.setState({ user })
    }
})