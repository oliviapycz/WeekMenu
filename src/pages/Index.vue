<template>
  <q-page class="flex flex-center">
    <h3 style="font-size: 20px">This Week on the Menu</h3>
    <q-card inline class="q-ma-sm width" v-for="d in data" :key="d.index">
      <q-card-title class="title">
        <h4>{{ d.day.toUpperCase() }}</h4>
      </q-card-title>
      <q-card-separator inset />
      <q-card-title  class="subtitle" v-if="d.meal.lunch.menu[0] !== ''">
          <span slot="subtitle">{{ d.meal.lunch.daytime }}</span>
      </q-card-title>
      <q-card-main class="main-card" v-if="d.meal.lunch.menu[0] !== ''">
        <ul>
          <li v-for="food in d.meal.lunch.menu" :key="food.index">
            <p>{{ food }}</p>
          </li>
        </ul>
      </q-card-main>
      <!-- <q-card-separator inset /> -->
      <q-card-title class="subtitle" v-if="d.meal.diner.menu[0] !== ''">
        <span slot="subtitle">{{ d.meal.diner.daytime }}</span>
      </q-card-title>
      <q-card-main class="main-card" v-if="d.meal.diner.menu[0] !== ''">
        <ul>
          <li v-for="food in d.meal.diner.menu" :key="food.index">
            <p>{{ food }}</p>
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
          <li v-for="f in updateMenu.meal.lunch.menu" :key="updateMenu.meal.lunch.menu.indexOf(f)">
            <q-field>
              <div class="input-update">
                index :{{updateMenu.meal.lunch.menu.indexOf(f)}}
                <q-input inverted
                          color="grey"
                          :value = "f"
                          @blur.prevent="(newVal) => {
                            i = updateMenu.meal.lunch.menu.indexOf(f);
                            f = newVal;
                            lunch = 'lunch';
                            updateInput(newVal.target.value, i, lunch)}"
                            style="width:90%"
                          />
                <img src="./../statics/icons/cross-close.svg"
                      @click="() => {
                                  i = updateMenu.meal.lunch.menu.indexOf(f);
                                  f;
                                  lunch = 'lunch';
                                  deleteInput(f, i, lunch)}">
              </div>
            </q-field>
          </li>
          <q-btn round
             color="primary"
             icon="add_circle"
             size="small"
             class="btn-add"
             @click="() => {
                        lunch = 'lunch';
                        addInput(lunch)}"/>
        </ul>
      </q-card-main>
      <q-card-title class="subtitle" v-if="updateMenu.meal.diner.menu.length > 0">
        <span slot="subtitle">{{ updateMenu.meal.diner.daytime }}</span>
      </q-card-title>
      <q-card-main class="modal-main-card" v-if="updateMenu.meal.diner.menu.length > 0">
        <ul style="margin:auto">
          <li v-for="f in updateMenu.meal.diner.menu" :key="updateMenu.meal.diner.menu.indexOf(f)">
            <q-field>
              <div class="input-update">
                index :{{updateMenu.meal.diner.menu.indexOf(f)}}
                <q-input inverted
                          color="grey"
                          :value = "f"
                          @blur="(newVal) => {
                            i = updateMenu.meal.diner.menu.indexOf(f);
                            f = newVal;
                            diner = 'diner'
                            updateInput(newVal.target.value, i, diner)}"
                          style="width:90%"
                          />
                <img src="./../statics/icons/cross-close.svg"
                     @click="() => {
                            i = updateMenu.meal.diner.menu.indexOf(f);
                            f;
                            diner = 'diner';
                            deleteInput(f, i, diner)}">
              </div>
            </q-field>
          </li>
          <q-btn round
             color="primary"
             icon="add_circle"
             size="small"
             @click="() => {
                        diner = 'diner';
                        addInput(diner)}"/>
        </ul>
      </q-card-main>
      <q-card-separator inset />
      <div class="btn__action">
        <q-btn color="secondary "
        sv-close-overlay label="SAVE"
        @click="updateDailyMenu(updateMenu)" class="btn"/>
        <q-btn color="tertiary "
        sv-close-overlay label="CANCEL" @click="cancelUpdateDailyMenu(updateMenu)" class="btn"/>
      </div>
    </q-modal>


  </q-page>
</template>

<style>
</style>

<script>
// import { data } from './../data.js';
import axios from './../axios.js';

export default {
  name: 'PageIndex',
  data() {
    return {
      emptyLunchMeal: false,
      emptyDinerMeal: false,
      emptyMealMessage: 'Nothing added yet!',
      data: [],
      showModal: false,
      updateMenu: [],
      email: '',
    };
  },
  methods: {
    getMenu() {
      axios.get('/menu.json')
        .then((res) => {
          /*eslint-disable*/
          console.log('THIS DATA', this.data);
          this.data = res.data;
          /*eslint-disable*/
          console.log('fetched DATA', JSON.stringify(this.data));
        });
    },
    addInput(meal) {
      console.log('MEAL', meal);
      /*eslint-disable*/
      if (meal === 'lunch') {
        this.updateMenu.meal.lunch.menu.push('');
      } else {
        this.updateMenu.meal.diner.menu.push('');
      }
      /*eslint-disable*/
      console.log('RES', JSON.stringify(this.updateMenu));
    },
    updateInput(el, key, meal) {
      console.log('EL', el);
      console.log('INDEX', key);
      console.log('MEAL', meal);
      /*eslint-disable*/
      if (meal === 'lunch') {
        for (let index = 0; index < this.updateMenu.meal.lunch.menu.length; index++) {
          if (index === key) {
            this.updateMenu.meal.lunch.menu[key] = el;
          }
        }
      } else {
        for (let index = 0; index < this.updateMenu.meal.diner.menu.length; index++) {
          if (index === key) {
            this.updateMenu.meal.diner.menu[key] = el;
          }
        }
      }
      /*eslint-disable*/
      console.log('RES', JSON.stringify(this.updateMenu));
    },
    deleteInput(el, key, meal) {
      console.log('EL', el);
      console.log('INDEX', key);
      console.log('MEAL', meal);
      /*eslint-disable*/
      if (meal === 'lunch') {
        for (let index = 0; index < this.updateMenu.meal.lunch.menu.length; index++) {
          if (index === key) {
            this.updateMenu.meal.lunch.menu.splice(index, 1);
          }
        }
      } else {
        for (let index = 0; index < this.updateMenu.meal.diner.menu.length; index++) {
          if (index === key) {
            this.updateMenu.meal.diner.menu.splice(index, 1);
          }
        }
      }
      /*eslint-disable*/
      console.log('RES', JSON.stringify(this.updateMenu));
    },
    updateDailyMenu(el) {
      console.log('EL IN updateDailyMenu', JSON.stringify(el));
      console.log(' DATA', JSON.stringify(this.data));
      axios.put('/menu.json', this.data)
        .then(res => console.log(res))
        .catch(err => console.log(err));
      this.showModal = false;
    },
    cancelUpdateDailyMenu(el) {
      console.log('cancelUpdateDailyMenu', JSON.stringify(el));
      this.getMenu();
      this.showModal = false;
    },
    openModal(el) {
      this.showModal = true;
      this.updateMenu = el;
      // eslint-disable-next-line
      console.log('updateMenu', JSON.stringify(this.updateMenu));
    },
  },
  beforeUpdate() {
    // eslint-disable-next-line
    console.log('this.showModal', this.showModal);
  },
  beforeMount() {
    console.log('beforeMount DATA', this.data);
    // axios.post('/menu.json', this.data)
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
    this.getMenu();
    
    console.log('beforeMount UPDATE MENU', this.data);
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
