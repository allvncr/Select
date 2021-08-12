<template>
  <div id="app">
      <form action="">
          <div class="block">
            <p>Selection Simple: {{ textS.name }}</p>
            <Select :list="pokemons" type="default" @Simple="Simple" isRequired="true"></Select>
          </div>

            <div class="block">
              <p>Selection Multiple(ctrl for multiple choice): <span v-for="(item, i) in textM" :key="i"> {{item.name}}</span> </p>
              <Select :list="pokemons" type="multi" @Multi="Multi" isRequired="true"></Select>
            </div>

            <div class="block">
              <p>Selection Guidée: {{ textG.name }}</p>
              <Select :list="pokemons" type="guide" @Guide="Guide"></Select>
            </div>

          <button type="submit">Envoyer</button>
      </form>
  </div>
</template>

<script>
import Service from "./services/index"
import Select from "./components/Select.vue";

export default {
  name: "App",
  components: {
    Select,
  },
  data() {
    return {
      pokemons:[],
      textG : {},
      textS: {},
      textM: []
    };
  },

  methods: {
    getAll() {
      Service.getAll()
      .then(result =>{
        this.pokemons = result.data.results
      }).catch(error =>{
        console.log(error.response.data)
      })
    },

    Guide(value){
      this.textG = value
    },

    Multi(value){
      console.log(value)
      this.textM = value
    },

    Simple(value){
      this.textS = value
    }
  },
  mounted(){
    this.getAll();
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.block{
  padding: 15px;
}

</style>
