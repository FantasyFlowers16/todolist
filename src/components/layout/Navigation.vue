<template>
  <div>
    <v-navigation-drawer fixed  permanent >
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
        >
          <v-list-item-icon>
            <template>
            </template>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
          <div class="count">{{getActiveToDos}}</div>
        </v-list-item>
      </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn @click.stop="openPopup=true"  color="black" plain>
              <v-icon left>mdi-cog-outline</v-icon>
              New Task
            </v-btn>
          </div>
        </template>
    </v-navigation-drawer>
    <Popup v-model="openPopup" :type="'add'" :headerText="'Добавление новой задачи'" />
  </div>
</template>

<script>

import Popup from '../todos/popupToDo'

export default {
  name: 'Navigation',
  components: {
    Popup
  },
  data () {
    return {
      count: 1,
      openPopup: false,
      items: [
        { title: 'Tasks', icon: 'mdi-view-grid-outline' }
      ]
    }
  },
  computed: {
    getActiveToDos () {
      return this.$store.getters.getToDoList.filter(el => !el.completed).length
    }
  }
}
</script>

<style lang="scss" >
  .count{
    background: #1D2939;
    border-radius: 6px;
    padding: 2.5px 6px;
    color: #fff;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
  }
  .v-list-item {
    margin: 5px;
    border-radius: 4px;
    background: #F2F4F7;
  }
</style>
