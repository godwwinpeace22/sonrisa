<template>
  <div>
    <nav-bar></nav-bar>
    <b-container fluid>
      <b-row>
        <b-col class="banner">
          <div id="banner-p-inner">
            <h1>PUN</h1>
            <p>A collection of hand-picked pun</p>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="puns_main" sm="10" offset-sm='1'>
          <b-row>
            <b-col cols="12" sm="6" md="4" lg="4" v-for="pun in puns" :key="pun._id" >
              <b-card class="box" sm='6' md='4' :id="pun._id" @click='triggerModal($event)'>
                <p style="text-overflow:clipped;">
                  {{pun.content}}.
                  </p>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <!-- modal for images -->
      <b-row>
        <b-col id="punModalBox" class="modalbox" >
          <span class="modal-close">&times;</span>
          <b-carousel id="carousel1" class="modal-box-content2" 
            style="text-shadow: 1px 1px 2px #333;"
            controls
            background="steelblue"
            :interval="4000"
            img-width="100%"
            
            v-model="slide"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >

          <!-- Slides -->
          <b-carousel-slide   v-for='pun in puns' :key='pun._id' :id="pun._id" class="slide" img-alt="Blank image">
            <h3>{{pun.content}}</h3>
          </b-carousel-slide>

        </b-carousel>

        <p class="mt-4">
          {{ `${slide + 1} / ${puns.length}`}}<br>
        </p>
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
      puns:[],
      slide:0,
      sliding:null
    }
  },
  methods:{
    onSlideStart (slide) {
      this.sliding = false
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    triggerModal(event){
			var modal = document.getElementById('punModalBox');
			let span = document.getElementsByClassName("modal-close")[0];
			let punsArr = []

			this.puns.map(
				(pun,index) =>
				punsArr.push(pun._id)
			)
      console.log(punsArr)
			let currSlide = punsArr.indexOf(event.currentTarget.id)
			//console.log(currSlide)
			this.slide = currSlide
			
			modal.style.display = "block";
	
			//when the user clicks the download button
			/*document.getElementById('modal-share-download').onclick = function(){
				imgdwld.href = event.target.src
				imgdwld.click()
			}*/
			// When the user clicks on <span> (x), close the modal
			span.onclick = function() { 
				modal.style.display = "none";
			}
		},
  },
  async mounted(){
    try {
      let res = await api().get('puns')
      this.puns = res.data
      console.log(location.pathname)
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

    #banner-p-inner{
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
  
  .puns_main{
    margin-top:5%;
  }
  a:hover{
    text-decoration: none;
  }
  .box{
    background-color:#607D8B;
    min-height:200px;
    margin-bottom:15px;
    margin-top:15px;
    &:hover{cursor:pointer;}
    h4{
      text-align: center;
      color:#fff;
    }
    .card-body{
      display:flex;
    }
    p{
      color:#f5ecec;
      margin:auto;
    }
  }

.modalbox {
    display: none;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0,0,0);
  }
  .w-100{
    height:400px;
  }
  .carousel-indicators li{
    background-color: #FF9800;
  }
  
  .modal-box-content2 {
    margin: auto !important;
    display: block;
    width: 60%;
    position: relative;
    top:15%;
    max-width: 900px;
  }

  /* Add Animation - Zoom in the Modal */
  .modal-box-content{ 
      animation-name: zoom;
      animation-duration: 0.6s;
  }

  @keyframes zoom {
      from {transform:scale(0)} 
      to {transform:scale(1)}
  }

  /* top slide indicator */
  .mt-4{
    position:absolute;
    top:15px;
    left:45px;
    color:#fff;
  }
  /* The Close Button */
  .modal-close {
      position: absolute;
      top: 15px;
      right: 35px;
      color: #f1f1f1;
      font-size: 2.5rem;
      font-weight: bold;
      transition: 0.3s;
  }

  .modal-close:hover,
  .modal-close:focus {
      color: #eee;
      text-decoration: none;
      cursor: pointer;
  }

  /* 100% Image Width on Smaller Screens */
  @media only screen and (max-width: 700px){
      .modal-box-content {
          width: 100%;
      }
  }
  @media only screen and (max-width: 650px){
    .modal-box-content2{
      width:100%;
    }
  }
  .slide{
    height:300px;
    background-color:steelblue;
    display:flex;
    justify-content: center;
  }
  .carousel-caption{
    width:75%;
  }
</style>