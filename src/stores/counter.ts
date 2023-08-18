import { defineStore } from 'pinia'

export const useToaster = defineStore('toaster', {
  state: () => ({ show: false, text: '', color: 'error', timeout: 4000 }),
  actions: {
    action() {
      this.show = !this.show
    },
    notify(text: string, color: string, timeout: number) {
      this.color = color
      this.text = text
      this.timeout = timeout
      this.show = !this.show
    }
  }
})
