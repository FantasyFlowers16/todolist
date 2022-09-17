<template>
  <div  class="todos-item" @dblclick="editTodo" :class="{_delete: activeToDelete}">
    <v-icon class="todos-item__delete"  @click="activeToDeleteTodo" >mdi-delete</v-icon>
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
      openPopup: false,
      activeToDelete: false
    }
  },
  computed: {
    getToDoList () {
      return this.$store.getters.getToDoList
    }
  },
  methods: {
    activeToDeleteTodo () {
      this.activeToDelete = !this.activeToDelete
      const data = [...this.getToDoList]
      data.forEach(el => {
        if (el.id === this.todo.id) {
          el.toDelete = !el.toDelete
        }
      })
      this.$store.commit('setTodoList', data)
    },
    editTodo () {
      this.openPopup = true
    }
  }
}
</script>

<style lang="scss">

@import '../../assets/scss/variables.scss';
@import '../../assets/scss/mixin.scss';

.todos-item{
  background: $bgLight;
  box-shadow: 0px 0.5px 2px rgba(16, 24, 40, 0.3);
  border-radius: 8px;
  position: relative;
  padding: 20px;
  margin-bottom: 24px;
  transition: box-shadow .3s, background .3s ease, border .3s ease;
  cursor: pointer;
  border: 1px solid transparent;
  &._delete{
    border: 1px solid $cRed
  }
  &:hover{
    box-shadow: 0px 0.5px 2px rgba(16, 24, 40, 0.5);
    background: $bgLightHover;
    .todos-item__delete ,.todos-item__edit{
      opacity: 1;
    }
  }
  &__title{
    @include Font(700,14px, 21px);
    margin-bottom: 6px;
  }
  &__text{
    @include Font(700,12px,16px);
    color: $textGray2;
  }
  &__text-number{
    color: $textGray3;
  }
  &__delete{
    position: absolute!important;
    top: 5px;
    right: 10px;
    opacity: 0;
    transition: opacity .3s;
    &:hover{
      color: $cRed;
    }
  }
}

@media screen and (min-width: 1280px) {
  .todos-item{
    &__title{
      @include Font(700,20px,30px);
    }
    &__text{
      @include Font(700,14px,21px);
    }
  }
}

</style>
