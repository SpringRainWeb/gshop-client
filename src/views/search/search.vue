<template>
  <div class="search">
    <header-con></header-con>
    <div class="search-wrapper">
      <cube-input v-model="searchCon"></cube-input>
      <cube-button>搜索</cube-button>
    </div>
    <div class="list-wrapper">
      <div class="no-search">暂无搜索结果</div>
    </div>
  </div>
</template>

<script>
import headerCon from "../../components/header";
export default {
  name: "search",
  data() {
    return {
      searchCon: ""
    };
  },
  components: {
    headerCon
  }
};
</script>

<style lang="scss" scoped>
.search {
  .search-wrapper{
    display: flex;
    justify-content: space-between;
    padding: 0.15rem;
    align-items: center;
    .cube-input {
      width: 60vw;
      height: 0.4rem;
      border-radius: 0.1rem;
    }
    button{
      background-color: #1dd3da;
      width: 26vw;
      height: 0.4rem;
      padding: 0;
      &:active{
        background-color: #19b4b9;
      }
    }
  }
  .list-wrapper{
    .no-search{
      text-align: center;
      color: #898989;
    }
    
  }
  
  .cube-input_active::after {
    border-color: #1dd3da;
  }
}
</style>