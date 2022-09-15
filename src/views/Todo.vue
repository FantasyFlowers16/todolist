<template>
  <div class="todos">
    <div class="todos__active">
      <div class="todos__title">TO DO</div>
      <div v-for="item in getToDoList" :key="item.id">
        <div v-if="!item.completed">
          <todo-item :type='"active"' :todo="item"></todo-item>
        </div>
      </div>
    </div>
    <div class="todos__completed">
      <div class="todos__title">DONE</div>
      <div v-for="item in getToDoList" :key="item.id">
        <div v-if="item.completed">
          <todo-item :type='"done"' :todo="item"></todo-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from './../components/todos/todosItem'

export default {
  name: 'Todos',
  components: { TodoItem },

  computed: {
    getToDoList () {
      return this.$store.getters.getToDoList
    }
  },
  methods: {
    updateMobileMenu () {
      this.$store.dispatch('updateTodoList')
      console.log('1', this.$store.dispatch)
    }
  },
  mounted () {
    this.updateMobileMenu()
  }
}
</script>

<style lang="scss">
.todos{
  padding: 80px 20px;
  margin-left: 270px;
  justify-content: center;
  display: flex;
  &__active,&__completed{
    max-width: 320px;
  }
  &__active{
    margin-right: 36px
  }
  &__title{
    color: #667085;
    margin-bottom: 32px;
    font: 700 15px/18px 'karla', sans-serif;
  }
}
</style>
