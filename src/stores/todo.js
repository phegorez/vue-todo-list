import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const useTodoStore = defineStore('todo', {
  state: () => ({
    list: [],
    statuses: ['Pending', 'Doing', 'Done'],
    selectedTodo: {}
  }),
  actions: {
    // getTodo
    async loadTodos() {
      try {
        const response = await axios.get(`${API_URL}/todos`)
        const data = response.data
        this.list = data
      } catch (err) {
        console.log("Error loading todos", err)
      }
    },
    // getTodo by ID
    async loadTodo(id) {
      try {
        const response = await axios.get(`${API_URL}/todos/${id}`)
        const data = response.data
        this.selectedTodo = data
      } catch (err) {
        console.log("Error loading todos", err)
      }
    },
    // add Todo
    async addTodo(todoName) {
      // newTodo format
      const newTodo = {
        name: todoName,
        status: 'Pending'
      }
      try {
        const response = await axios.post(`${API_URL}/todos`, newTodo)
        const data = response.data
        this.list.push(data)
      } catch (err) {
        console.log("Error loading todos", err)
      }
    },
    // edit Todo
    async editTodo(todoData, id) {
      try {
        const response = await axios.put(`${API_URL}/todos/${id}`, todoData)
        const data = response.data
        this.selectedTodo = data
      } catch (err) {
        console.log("Error loading todos", err)
      }
    },
    // delete Todo
    async deleteTodo(id) {
      try {
        const response = await axios.delete(`${API_URL}/todos/${id}`)
        const data = response.data
        this.list = data
      } catch (err) {
        console.log("Error loading todos", err)
      }
    }
  }
})
