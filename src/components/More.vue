<template>
  <div>
    <nav-bar></nav-bar>
    <b-container fluid>
      <b-row>
        <b-col class="banner">
          <div id="banner-r-inner">
            <h1>Riddles</h1>
            <p>A collection of funny and head-scratching puzzlers</p>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="more_main" sm="8" offset-sm='2'>
          <b-row>
            <b-col cols="12" sm="12" d-flex >
              <b-card class="box" sm='12'>
                <h1 class="title">{{riddle.title}}</h1>
                <p class="quest">{{riddle.question}}</p>
                <hr>
                
                <div class="show_ans" v-show="show_ans">
                  <h5>Ans</h5>
                  <p class="ans">{{riddle.answer}}</p>
                </div>
                <b-button @click="show_ans = true" v-show="!show_ans">Show answer</b-button>
                
              </b-card>
            </b-col>
          </b-row>
          <b-row style="margin-top:20px;">
            <b-col sm="12">
              <p v-show="show_ans" style="color:primary">Did you get it ? Try the next one</p>
              <b-button variant="primary" @click="prev" style="float:left;">Previous</b-button>
              <b-button variant="primary" @click="next" style="float:right;">Next ></b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <foot></foot>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import api from '@/services/api'
export default {
  data(){
    return {
      show_ans:false,
      riddles:[],
      riddle:{},
      index:0
    }
  },
  computed:{
    
  },
  methods:{

    getRiddle(){
      let loc = location.href.split('/')
      let cur_riddle = loc[loc.length -1].split('-').join(' ')
      //console.log(cur_riddle)
      let hldr = []
      for(let arr of this.riddles){
        hldr.push(arr.title)
      }

      this.index = hldr.indexOf(cur_riddle)
      this.riddle = this.riddles[this.index]
    },
    next(){
      if(this.index + 1 < this.riddles.length){
        let loc = location.href.split('/')
        let cur_riddle = loc[loc.length -1];
        let new_riddle = this.riddles[this.index + 1].title
        new_riddle = new_riddle.split(' ').join('-')
        this.index += 1
        this.show_ans = false
        this.riddle = this.riddles[this.index]
        window.location.href = `/#/riddles/${new_riddle}`;
      }
      else{
        alert('this is the last one')
      }
      
    },
    prev(){
      if(this.index > 1){
        let loc = location.href.split('/')
        let cur_riddle = loc[loc.length -1];
        let new_riddle = this.riddles[this.index - 1].title
        new_riddle = new_riddle.split(' ').join('-');
        this.index -= 1
        this.riddle = this.riddles[this.index]
        window.location.href = `/#/riddles/${new_riddle}`;
      }
      else{}
      
    }
  },
  async mounted(){
    try {
      let res = await api().get('riddles')
      //console.log(res.data)
      this.riddles = res.data

      this.getRiddle()
    } catch (error) {
      console.log(error)
    }
  },
  components:{
		'nav-bar':Navbar,
		foot:Footer
	}
}
</script>
<style lang="scss" scoped>
  .banner{
    background-color:steelblue;
    height:20%;
    padding:5%;
    text-align: center;
    color:#fff;
    position: relative;
    background-image: -webkit-repeating-radial-gradient(center center, rgba(0,0,0,.2), rgba(0,0,0,.2) 1px, transparent 1px, transparent 100%);
    background-image: -moz-repeating-radial-gradient(center center, rgba(0,0,0,.2), rgba(0,0,0,.2) 1px, transparent 1px, transparent 100%);
    background-image: -ms-repeating-radial-gradient(center center, rgba(0,0,0,.2), rgba(0,0,0,.2) 1px, transparent 1px, transparent 100%);
    background-image: repeating-radial-gradient(center center, rgba(0,0,0,.2), rgba(0,0,0,.2) 1px, transparent 1px, transparent 100%);
    -webkit-background-size: 3px 3px;
    -moz-background-size: 3px 3px;
    background-size: 3px 3px;

    #banner-r-inner{
      //background:hotpink;
      position:relative;
      top:30%;
      width:fit-content;
      margin:auto;
    }
    h1{
      font-weight: bolder;
    }
    
  }
  
  .more_main{
    margin-top:5%;
  }
  .box{
    .show_ans{
      transition: all .5 ease-in;
    }
    p{
    font-size: 1.75em;
    line-height: 1.5;
    color:#444;
    font-family: Noto Serif,Georgia,serif;
    margin:auto;
    }
  }
</style>

