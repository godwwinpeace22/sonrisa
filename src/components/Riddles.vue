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
        <b-col class="rdls_main" sm="10" offset-sm='1'>
          <b-row>
            <b-col cols="12" sm="6" md="4" lg="4" v-for="riddle in 6" :key="riddle._id">
              <a href="spinaltap(riddle.title)"><b-card class="box" sm='6' md='4'>
                <h4>{{riddle.title}}Title</h4>
                <p style="text-overflow:clipped;">{{riddle.question ? shorten(riddle.question) : ''}}.
                  lorem ipusm dolor sit amet consectuture uuy and by sonri caps do ye good if me lorem ipusm dolor sit amet consectuture uuy and by sonri caps do ye good if me
                </p>
                
                <hr>
                <p>Read more</p>
              </b-card></a>
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
      riddles:[]
    }
  },
  methods:{
    shorten(question){
      return `${question.substr(0,100)} ...`
    },
    spinaltap(title){
      return `${location.href}/${title.split(' ').join('-')}`
    }
  },
  async mounted(){
    try {
      let res = await api().get('riddles')
      this.riddles = res.data
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
  
  .rdls_main{
    margin-top:5%;
  }
  a:hover{
    text-decoration: none;
  }
  .box{
    background-color:#607D8B;
    height:200px;
    margin-bottom:15px;
    margin-top:15px;
    &:hover{cursor:pointer;}
    h4{
      text-align: center;
      color:#fff;
      }
    p{
      color:#f5ecec;
    }
  }
</style>

