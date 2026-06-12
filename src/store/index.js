import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        isLogin: false,
        book: '',
        imageList: [],
        imageIndex: 0
    }),
    actions: {
        setUser(flag) {
            this.isLogin = flag
        },
        setBook(book) {
            this.book = book
        },
        setImageList(imageList) {
            this.imageList = imageList
        },
        setImageIndex(imageIndex) {
            this.imageIndex = imageIndex
        }
    }
})
