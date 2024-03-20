import { reactive } from 'vue'
import { io } from 'socket.io-client'

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
})

// "undefined" means the URL will be computed from the `window.location` object

export const socket = io()

socket.on('connect', () => {
  console.log('tt')
  state.connected = true
})

socket.on('disconnect', () => {
  state.connected = false
})

socket.on('foo', (...args) => {})

socket.on('bar', (...args) => {})
