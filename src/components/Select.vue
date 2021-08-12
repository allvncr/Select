<template>
  <div>

    <!-----------Selection Simple--------------->
    <select v-if="type=='default'" v-model="simple"  @click="Simple">
      <option v-for="(item, i) in list" :key="i" :value="item">
        {{ item.name }}
      </option>
    </select>


    <!-----------Selection Multiple--------------->
    <select v-else-if="type=='multi'" v-model="multi" @click="Multi" multiple>
      <option v-for="(item, i) in list" :key="i" :value="item">
        {{ item.name }}
      </option> 
    </select>


    <!-----------Selection Guidée--------------->
    <div class="container" v-if="type=='guide'">
      <input
        type="search"
        placeholder="Search"
        v-model="text"
        @click="show = !show"
        @keyup="Search"
      />
      <div class="block" v-show="show">
        <p v-for="(item, i) in searchList" :key="i" @click="Choose(item)">
          {{ item.name }}
        </p>
        <p v-show="searchList.length==0" class="none">
          No results found
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    list: Array
  },
  data() {
    return {
      show: false,
      simple: {},
      multi: [],
      text: "",
      searchList: [],
    };
  },
  methods: {
    Search() {
      this.show = true;
      var results = [];
      this.list.forEach((item) => {
        if (item.name.includes(this.text)) results.push(item);
      });
      this.searchList = results;
    },

    Choose(item){
      this.text = item.name
      this.show = false
      this.$emit('Guide', item)
    },

    Simple(){
      this.$emit('Simple', this.simple)
    },

    Multi(){
      this.$emit('Multi', this.multi)
    }
  },
  mounted() {
    this.searchList = this.list;
  },
};
</script>

<style lang="scss" scoped>
  select {
    padding: 16px 24px;
    font-size: 18px;
    color: #0a0a0a;
    border-radius: 15px;
    max-height: 300px;
    overflow-y: scroll;
    outline: none;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    input{
      padding: 8px 16px;
      margin: 4px 0;
      width: 50%;
      border-radius: 15px;
      outline: none;
      border: 1px solid #dbdbdb;
    }

    input:focus{
      border-color: #7957D5;
      box-shadow: 0 0 0 0.125em rgba($color: #7957D5, $alpha: .25);
    }

    .block {
      background-color: #fff;
      border: 1px solid #000;
      width: 50%;
      padding: 0.5rem 0;
      border-radius: 5px;
      max-height: 400px;
      overflow-y: scroll;

      p {
        text-align: left !important;
        padding: 0.375rem 1rem;
        margin: 0;
        font-size: 0.875rem;
        line-height: 1.5;
        cursor: pointer;
        color: #0a0a0a;
        transition: all 0.3s ease;
      }
      p:hover {
        background-color: #f5f5f5;
      }
      .none{
        cursor: not-allowed;
      }
    }
  }
  
  
  
</style>
