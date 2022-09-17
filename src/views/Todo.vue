<template>
  <div class="todos" @keydown.delete="deleteTodo">
    <div class="todos__filter filter">
      <v-text-field
        color="#667085"
        class="filter__input"
        label="Введите текст задачи для фильтрации"
        hide-details="auto"
        v-model="filterText"
      ></v-text-field>
    </div>
    <div class="todos__container" v-if="!getLoading">
      <div class="todos__active">
        <div class="todos__title">TO DO</div>
        <div v-for="item in getFiltereItems" :key="item.id">
          <div v-if="!item.completed">
            <todo-item :type='"active"' :todo="item"></todo-item>
          </div>
        </div>
      </div>
      <div class="todos__completed">
        <div class="todos__title">DONE</div>
        <div v-for="item in getFiltereItems" :key="item.id">
          <div v-if="item.completed">
            <todo-item ref="todoitem" :type='"done"' :todo="item"></todo-item>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <Loader />
    </div>
  </div>
</template>

<script>
import TodoItem from '../components/todos/todosItem'
import Loader from '../components/Loader'

export default {
  name: 'Todos',
  components: { TodoItem, Loader },
  data () {
    return {
      filterText: ''
    }
  },
  computed: {
    getToDoList () {
      return this.$store.getters.getToDoList
    },
    getFiltereItems () {
      if (this.filterText.length) {
        return this.getToDoList.filter(el => el.title.includes(this.filterText))
      } else return this.getToDoList
    },
    getLoading () {
      return this.$store.getters.getLoading
    }
  },
  methods: {
    deleteTodo () {
      const data = this.getToDoList.filter(el => {
        // локально
        if (!el.toDelete) {
          return el
        }
        // на сервере
        if (el.toDelete) {
          this.$store.dispatch('deleteTodo', el.id)
        }
      })
      this.$store.commit('setTodoList', data)
    },
    updateMobileMenu () {
      this.$store.dispatch('updateTodoList')
    }
  },
  mounted () {
    this.updateMobileMenu()
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.filter{
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
  &__input{
    margin-bottom: 20px;
    width: 100%;
  }
}

.todos{
  padding: 60px 20px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  display: flex;
  &__container{
    justify-content: center;
    display: flex;
  }

  &__active,&__completed{
    max-width: 320px;
  }
  &__active{
    margin-right: 36px
  }
  &__title{
    color: $textGray;
    margin-bottom: 32px;
    font: 700 15px/18px 'karla', sans-serif;
  }
}
  @media screen and (min-width: 1280px) {
    .todos{
      padding: 80px 20px;
      margin-left: 270px;
    }
  }
</style>
