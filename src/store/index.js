import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import todos from './todo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toDoList: [],
    loading: false,
    userId: 1
  },
  getters: {
    getToDoList: state => {
      return state.toDoList
    },
    getUserId: state => {
      return state.userId
    },
    getLoading: state => {
      return state.loading
    }
  },
  mutations: {
    setTodoList (state, value) {
      state.toDoList = value
    },
    setLoading (state, value) {
      state.loading = value
    }
  },
  actions: {
    updateTodoList ({ commit }) {
      commit('setLoading', true)
      axios.get('https://jsonplaceholder.typicode.com/todos').then((response) => {
        response.data.forEach(el => { el.toDelete = false })
        commit('setTodoList', response.data)
        commit('setLoading', false)
      })
        .catch((error) => {
          commit('setLoading', false)
          // обработка ошибок
          console.log(error)
        })
    },
    deleteTodo ({ commit }, id) {
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          // обработка ошибок
          console.log(error)
        })
    },
    addTodo ({ commit }, data) {
      axios.patch(`https://jsonplaceholder.typicode.com/todos/${data.id}`, data)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          // обработка ошибок
          console.log(error)
        })
    },
    updateTodo ({ commit }, data) {
      axios.put(`https://jsonplaceholder.typicode.com/todos/${data.id}`, { title: data.title })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          // обработка ошибок
          console.log(error)
        })
    }
  },
  modules: {
  }
})
