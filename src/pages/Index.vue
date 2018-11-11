<template>
  <q-page class="flex flex-center">
    <h3 style="font-size: 20px">This Week on the Menu</h3>
    <q-card inline class="q-ma-sm width" v-for="d in data" :key="d.index">
      <q-card-title class="title">
        <h4>{{ d.day.toUpperCase() }}</h4>
      </q-card-title>
      <q-card-separator inset />
      <q-card-title  class="subtitle" v-if="d.meal.lunch.menu.length > 0">
          <span slot="subtitle">{{ d.meal.lunch.daytime }}</span>
      </q-card-title>
      <q-card-main class="main-card" v-if="d.meal.lunch.menu.length > 0">
        <ul>
          <li v-for="f in d.meal.lunch.menu" :key="f.index">
            <p>{{ f }}</p>
          </li>
        </ul>
      </q-card-main>
      <!-- <q-card-separator inset /> -->
      <q-card-title class="subtitle" v-if="d.meal.diner.menu.length > 0">
        <span slot="subtitle">{{ d.meal.diner.daytime }}</span>
      </q-card-title>
      <q-card-main class="main-card" v-if="d.meal.diner.menu.length > 0">
        <ul>
          <li v-for="f in d.meal.diner.menu" :key="f.index">
            <p>{{ f }}</p>
          </li>
        </ul>
      </q-card-main>
      <q-btn round
             color="primary"
             icon="add_circle"
             size="medium"
             class="btn-add-md"
             @click="openModal(d)"/>
    </q-card>
    <q-modal v-if="showModal" v-model="showModal" minimized ref="modalRef" class="modal">

      <q-card-title class="title">
        <h4>{{ updateMenu.day.toUpperCase() }}</h4>
      </q-card-title>
      <q-card-separator inset />
      <q-card-title  class="subtitle" v-if="updateMenu.meal.lunch.menu.length > 0">
          <span slot="subtitle">{{ updateMenu.meal.lunch.daytime }}</span>
      </q-card-title>
      <q-card-main class="modal-main-card" v-if="updateMenu.meal.lunch.menu.length > 0">
        <ul style="margin:auto">
          <li v-for="f in updateMenu.meal.lunch.menu" :key="f.index">
            <q-field>
              <div class="input-update">
                <q-input inverted
                          color="grey"
                          :value = "f"
                          style="width:90%"
                          />
                <img src="./../statics/icons/cross-close.svg">
              </div>
            </q-field>
          </li>
          <q-btn round
             color="primary"
             icon="add_circle"
             size="small"
             class="btn-add"/>
        </ul>
      </q-card-main>
      <q-card-title class="subtitle" v-if="updateMenu.meal.diner.menu.length > 0">
        <span slot="subtitle">{{ updateMenu.meal.diner.daytime }}</span>
      </q-card-title>
      <q-card-main class="modal-main-card" v-if="updateMenu.meal.diner.menu.length > 0">
        <ul style="margin:auto">
          <li v-for="f in updateMenu.meal.diner.menu" :key="f.index">
            <q-field>
              <div class="input-update">
                <q-input inverted
                          color="grey"
                          :value = "f"
                          style="width:90%"
                          />
                <img src="./../statics/icons/cross-close.svg">
              </div>
            </q-field>
          </li>
          <q-btn round
             color="primary"
             icon="add_circle"
             size="small"/>
        </ul>
      </q-card-main>
      <q-card-separator inset />
      <div class="btn__action">
        <q-btn color="secondary "
        sv-close-overlay label="SAVE" @click="showModal = false" class="btn"/>
        <q-btn color="tertiary "
        sv-close-overlay label="CANCEL" @click="showModal = false" class="btn"/>
      </div>
    </q-modal>
  </q-page>
</template>

<style>
</style>

<script>
import { data } from './../data.js';

export default {
  name: 'PageIndex',
  data() {
    return {
      emptyLunchMeal: false,
      emptyDinerMeal: false,
      emptyMealMessage: 'Nothing added yet!',
      data,
      showModal: false,
      updateMenu: [],
      email: '',
    };
  },
  methods: {
    openModal(el) {
      this.showModal = true;
      this.updateMenu = el;
      // eslint-disable-next-line
      console.log('updateMenu', this.updateMenu);
    },
  },
  beforeUpdate() {
    // eslint-disable-next-line
    console.log('data', this.showModal);
  },
};
</script>
<style>
.width {
  width: 90%;
}
.title {
  padding: 10px 16px 0 16px;
}
h4, p {
  margin: inherit;
}
.subtitle {
  text-align: center;
  padding: 10px 16px 0 16px;
}
ul {
  padding-left: 25px;
}
li {
  list-style-type: none;
  padding-bottom: 5px;
}
.btn-add-md {
  background-color: #444BED;
  color: #fff;
  float: right;
  margin: 0 10px 10px 10px;
}
.btn-add {
  margin-top: 5px;
}
.main-card {
  padding-bottom: inherit;
}
.modal ul {
  padding: inherit;
}
.modal-main-card {
  padding-left: 5px;
  padding-right: 5px;
}
.btn__action {
  display: flex;
  justify-content: space-around;
}
.btn {
  border-radius: 20px;
  margin: 10px 0px;;
  padding: 4px 20px;
}
.input-update {
  display: flex;
  justify-content: space-between;
}

</style>
