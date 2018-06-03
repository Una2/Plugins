<template>
<div>
  {{msg1}} ----- demo---{{name}}
</div>
</template>
<script>
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'
    export default{
        data(){
            return{
        //   ,
            }
        },
        computed:{
            ...mapGetters(['name']),
              ...mapState({
                  msg1:state=>state.demo.name
              })
        },
        mounted(){
            console.log(this.$store.state.products,"this.$store") ;
            // console.log(mapState,"mapState")      ;
            // console.log(mapGetters,"mapGetters")     
        }
    }
</script>