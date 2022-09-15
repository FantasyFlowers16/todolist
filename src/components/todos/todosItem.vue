<template>
  <div class="todos-item" @dblclick="editTodo" >
      <v-icon class="todos-item__edit" @click="deleteTodo" @click.stop="openPopup=true" >mdi-delete</v-icon>
      <v-icon class="todos-item__delete" @click="editTodo" >mdi-circle-edit-outline</v-icon>
    <div class="todos-item__title">{{todo.title}}</div>
    <div class="todos-item__text">Created by <span class="todos-item__text-number">1</span></div>
    <Popup v-model="openPopup" :type="'update'" :item="todo" :headerText="'Редактирование задачи'" />
  </div>
</template>

<script>
import Popup from './popupToDo'

export default {
  name: 'ToDoItems',
  props: ['todo', 'type'],
  components: { Popup },
  data () {
    return {
      openPopup: false
    }
  },
  computed: {
    getToDoList () {
      return this.$store.getters.getToDoList
    }
  },
  methods: {
    deleteTodo () {
      // типо на сервере
      const data = {
        id: this.todo.id,
        title: this.text
      }
      this.$store.dispatch('updateTodo', data)
      // локально
      this.$store.commit('setTodoList', this.getToDoList.filter(el => el.id !== this.todo.id))
    },
    editTodo () {
      this.openPopup = true
    }
  }

}
</script>

<style lang="scss">
.todos-item{
  background: #FCFCFD;
  box-shadow: 0px 0.5px 2px rgba(16, 24, 40, 0.3);
  border-radius: 8px;
  position: relative;
  padding: 20px;
  margin-bottom: 24px;
  transition: box-shadow .3s, background .3s ease;
  cursor: pointer;
  &:hover{
    box-shadow: 0px 0.5px 2px rgba(16, 24, 40, 0.5);
    background: #f0f0f3;
    .todos-item__delete ,.todos-item__edit{
      opacity: 1;
    }

  }
  &__title{
    font: 700 20px/150% 'karla', sans-serif;
    margin-bottom: 6px;
  }
  &__text{
    font: 700 14px/150% 'karla', sans-serif;
    color: #98A2B3;
  }
  &__text-number{
    color: #667085;
  }
  &__delete,&__edit{
    position: absolute!important;
    top: 5px;
    right: 10px;
    opacity: 0;
    transition: opacity .3s;
    &:hover{
      color: red;
    }
  }
  &__edit{
    right: 30px;
  }
}

</style>
