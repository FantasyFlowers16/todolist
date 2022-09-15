<template>
 <v-dialog
    class="popup-todo"
    v-model="show"
    transition="dialog-bottom-transition"
    max-width="600"
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar
          color="gray"
          dark
        >{{headerText}}</v-toolbar>
        <v-text-field
          class="popup-todo__text"
          label="Опишите задачу"
          v-model="textInput"
          hide-details="auto"
        ></v-text-field>
        <v-card-actions class="justify-end">
          <v-btn
            text
            @click="dialog.value = false"
          >Закрыть</v-btn>
                    <v-btn
            text
            @click="saveToDo"
          >Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>

export default {
  name: 'PopupTodos',
  components: { },
  data () {
    return {
      textInput: ''
    }
  },
  props: ['item', 'value', 'headerText', 'type'],
  methods: {
    saveToDo () {
      if (this.type === 'add') {
        this.addToDo()
      } else if (this.type === 'update') {
        this.updateToDo()
      }
    },
    updateToDo () {
      // на сервере
      const data = {
        userId: this.getUserId,
        id: this.item.id,
        title: this.textInput,
        completed: this.item.completed
      }
      this.$store.dispatch('updateTodo', data)
      // локально
      const todos = JSON.parse(JSON.stringify(this.getToDoList))
      todos.forEach(el => {
        if (el.id === this.item.id) {
          el.title = this.textInput
        }
      })
      this.$store.commit('setTodoList', todos)
      this.closeForm()
    },
    addToDo () {
      const data = {
        userId: this.getUserId,
        id: Date.now(),
        title: this.textInput,
        completed: false
      }
      // типо на сервере
      this.$store.dispatch('addTodo', data)
      // локально
      this.$store.commit('setTodoList', [data, ...this.getToDoList])
      this.clearText()
      this.closeForm()
    },
    clearText () {
      this.textInput = ''
    },
    closeForm () {
      this.$emit('input', false)
    }
  },
  computed: {
    getToDoList () {
      return this.$store.getters.getToDoList
    },
    getUserId () {
      return this.$store.getters.getUserId
    },
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  mounted () {
    if (this.item && this.item.title) {
      this.textInput = this.item.title
    }
  }
}
</script>

<style lang="scss">
.popup-todo {
  &__text {
    padding: 20px
  }
}

</style>
