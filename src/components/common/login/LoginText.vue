<template>
  <div class="text">
    <van-field 
      v-model="content"
      :class="{fonts: true, tru : greenflag, fas: redflag}"
      :type="type" 
      :label="lable"
      :placeholder="placeholder"
      @blur="ruleText"
    />
  </div>
</template>

<script>
export default {
 name:'LoginText',
 data() {
   return {
     content:'',
     greenflag:false,
     redflag :false
   }
 },
 props:["lable","type","placeholder"],
 methods:{
   ruleText() {
    this.$emit('TextClick',this.content)
   }
 }
}
</script>

<style lang='less' scoped>
.text {
    margin: 4vw 0;
    .fonts {
      font-size: 4.267vw !important;
      align-items: center;
    }
    .tru{
      border:0.267vw solid rgb(133, 211, 133) ; 
    }
    .fas {
      border:0.267vw solid rgb(185, 73, 73) ;
    }
}
</style>