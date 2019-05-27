<template>
  <div class="cartControl">
      <i class="cubeic-add icon"  @click.stop="updateFoodCount(true)"></i> 
      <div class="cart-count" v-show="food.count">{{food.count}}</div>
      <transition name="move">
          <i class="cubeic-remove icon" v-show="food.count" @click.stop="updateFoodCount(false)"></i>
      </transition>
  </div>
</template>

<script>
export default {
  name: 'cartControl',
  data() { 
    return {
        
    }
  },
  methods:{
      updateFoodCount(isAdd){
          this.$store.dispatch('updateFoodCount',{isAdd,food:this.food});
      }
  },
  props:['food']
 }
</script>

<style lang="scss" scoped>
  .cartControl{
    display: flex;
    flex-flow: row-reverse nowrap;
    position: absolute;
    right: 0.2rem;
    bottom: 0.08rem;
    font-size: 0.32rem;
    width: 0.9rem;
    align-items: center;
    .cart-count{
        width: 50%;
        text-align: center;
        font-size: 0.12rem;
    }
    .cubeic-add{
        color: #1dd3da;
    }
    .cubeic-remove{
        color: #1dd3da;
        &.move-enter-active,&.move-leave-active{
            transition: all 0.3s;
        }
        &.move-enter,&.move-leave-to{
            opacity: 0;
            transform: translateX(0.3rem) rotate(180deg);
        }
    }
  }
</style>