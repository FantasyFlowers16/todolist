<template>
  <div>
    <div class="header">
      <div class="header__burger" @click="openMenuMobile"></div>
    </div>
    <v-navigation-drawer class="navigation" :class="{_opened: isMenuOpen}" width="320" fixed  permanent >
      <div>
        <div class="navigation__close" @click="closeMenuMobile"></div>
        <div class="navigation__company company-block">
          <div class="company-block__img"></div>
          <div class="company-block__title">Company</div>
        </div>
      </div>
      <v-list dense>
        <v-list-item
        class="navigation__list"
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
      isMenuOpen: false,
      items: [
        { title: 'Tasks', icon: 'mdi-view-grid-outline' }
      ]
    }
  },
  methods: {
    openMenuMobile () {
      this.isMenuOpen = true
    },
    closeMenuMobile () {
      this.isMenuOpen = false
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
@import '../../assets/scss/variables.scss';
@import '../../assets/scss/mixin.scss';
.v-main{
  &__wrap{
    background: $bgWhite;
  }
}
.header{
  width: 100%;
  height: 40px;
  background: $bgHeader;
  &__burger{
    width: 28px;
    position: absolute;
    top: 5px;
    left: 5px;
    height: 28px;
    background: url('../../assets/svg/menu.svg') no-repeat;
    background-size: cover;
  }
}
.navigation{
  &__close{
    background: url('../../assets/svg/close.svg') no-repeat;
    background-size: cover;
    width: 28px;
    position: absolute;
    top: 5px;
    left: 5px;
    height: 28px;
  }
  &__list{
    margin: 5px;
    border-radius: 4px;
    background: $bgWhite;
  }
}
.navigation{
  padding: 24px;
  left: -100%;
  transition: left .3s ease;
  &._opened{
    left: 0%
  }
}
.count{
  background: $bgDark;
  border-radius: 6px;
  padding: 2.5px 6px;
  color: $cWhite;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
}
.company-block{
  padding: 12px 10px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  &__img{
    margin-right: 8px;
    background: $bgDark;
    border-radius: 4px;
    width: 24px;
    height: 24px;
  }
  &__title{
    @include Font(700,16px,19px)
  }
}

@media screen and (min-width: 1280px) {
  .navigation{
    left: 0;
  }
  .header{
    display: none;
  }
  .navigation{
    &__close{
      display: none;
    }
  }
}
</style>
