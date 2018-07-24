<template>
<div>
	<nav-bar></nav-bar>
	<b-container fluid>
		<b-row class='home-banner' align-v='center'>
			<b-col id='banner-inner' sm='8' offset-sm="2"></b-col>
		</b-row>
		<b-row>
			<b-col cols='12'  class="images_section">

				<!-- programmatically add more memes -->
				<b-row>
					<b-col class='boxes' cols="6" md='4' mx-15 v-for='image in $store.state.images' :key='image._id'>
						<img :id="image._id"  :src="image.src" @click='triggerModal($event)'>
						<div class="overlay" >
							<div class="meta" >
								<span @click="loveit"  ><v-icon name='heart' :id='image._id' :class="$store.state.loggedin ? $store.state.user.likes.indexOf(image._id) == -1 ? 'notliked' : 'liked' : 'notliked' " v-b-tooltip.hover :title="$store.state.loggedin ? $store.state.user.likes.indexOf(image._id) == -1 ? 'Like this meme' : 'You have liked this' : 'Like this meme' "></v-icon></span>
								<span @click="shareit"><v-icon name='share-2' v-b-tooltip.hover title="Share this meme"></v-icon></span>
							</div>
						</div>
					</b-col>
				</b-row>

				<!-- 'Load More' button -->
				<b-row id="button-row">
					<b-col style="background:pin;">
						<b-button variant="dark" class='text-center' @click="loadMore">Load More</b-button>
					</b-col>
				</b-row>
			</b-col>
			<!--b-col sm='3' class='sidebar_section'></b-col-->
		</b-row>

		<!-- modal for images -->
		<b-row>
			<b-col id="myModalBox" class="modalbox" >
				<span class="modal-close">&times;</span>
				<b-carousel id="carousel1" class="modal-box-content2" 
									style="text-shadow: 1px 1px 2px #333;"
									controls
									indicators
									background="#ababab"
									:interval="4000"
									img-width="1024"
									
									v-model="slide"
									@sliding-start="onSlideStart"
									@sliding-end="onSlideEnd"
				>

				<!-- Slides -->
				<b-carousel-slide  :img-src="image.src" v-for='image in $store.state.images' :key='image._id' :id="image._id" class="slide">
				</b-carousel-slide>

			</b-carousel>

			<p class="mt-4">
				{{ `${slide} / ${$store.state.images.length}`}}<br>
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
			images:[],
			index:8,
			liked:false,
			slide:0,
			sliding:null
		}
	},
	methods:{
		onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
		like(id){
			let elem = document.getElementById(id);
			//console.log(elem.style)
			this.liked = !this.liked
			elem.style.color = this.liked ? 'red' : '#fff'
			
		},
		async loveit(event){
			try{
				// allow only users that are logged in to like a meme
				if(this.$store.state.loggedin){
					let heartIcon = event.currentTarget.children[0] 
					//toggle the icon color based on the original state and current user action
					switch(heartIcon.style.color){
						case 'red': 
							heartIcon.style.color = 'white'
							heartIcon.attributes[8].value = 'Like this meme'
							let likeRes = await api().post(`images/like/${this.$store.state.user._id}/${heartIcon.id}/unlike`,{})
							console.log(likeRes.data.done)
							this.$store.dispatch('setUser', likeRes.data.user)
							break

						case 'white':
							heartIcon.style.color = 'red'
							heartIcon.attributes[8].value = 'You have liked this'
							//console.log('now red')
							let likeRes2 = await api().post(`images/like/${this.$store.state.user._id}/${heartIcon.id}/like`,{})
							//console.log(likeRes2.data.done)
							this.$store.dispatch('setUser', likeRes2.data.user)
							break
						default :
							heartIcon.style.color = 'red'
							heartIcon.attributes[8].value = 'You have liked this'
							//console.log('now red')
							let likeRes3 = await api().post(`images/like/${this.$store.state.user._id}/${heartIcon.id}/like`,{})
							//console.log(likeRes3.data.done)
							this.$store.dispatch('setUser', likeRes3.data.user)
					}
				}// end If
				else{
					let confirm = window.confirm(`Sorry, you have to be loggedin to like a meme. Login now ?`)
					if(confirm){
						// trigger login modal
						let modal = document.getElementById('login_modal');
						modal.style.display = "block";
						//Get the <span> element that closes the modal
						let span = document.getElementsByClassName("login_modal_close")[0];
						
						// When the user clicks on <span> (x), close the modal
						span.onclick = function() { 
							modal.style.display = "none";
						}
					}
					else{}
				}
			}
			catch(err){
				console.log(err)
			}	
		},
		shareit(event){
			//console.log(event.srcElement)
			let shareIcon = event.currentTarget.children[0]
			//change the icon color color 
			shareIcon.style.color == 'red' ? shareIcon.style.color = 'white' : shareIcon.style.color = 'red';
		},
		triggerModal(event){
			var modal = document.getElementById('myModalBox');
			let span = document.getElementsByClassName("modal-close")[0];
			let imgIdsArr = []

			this.$store.state.images.map(
				(image,index) =>
				imgIdsArr.push(image._id)
			)
			let currSlide = imgIdsArr.indexOf(event.currentTarget.id)
			console.log(currSlide)
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
		downloadImg(src, event){

			//console.log(src)
			//console.log(event)
			api().get(src).then(function(response){
				//console.log(response)
				let blob = new Blob([response.data], {type:response.headers['content-type']});
				let link = document.createElement('img');
				link.href = window.URL.createObjectURL(blob);
				link.download = 'funnypic.jpg'
				link.click();
				var image = new Image(); 
				image.src = src; 
				document.body.appendChild(image);
				//console.log(image.src)
				let yu = document.getElementById('download')
				yu.href = image.src
				yu.click()
				
			})
			//let link = document.createElement('a')
			//link.setAttribute('href', 'http://www.google.com/google.png');
			//console.log(src)
			//link.setAttribute('download', 'funnypics.jpg');
			//console.log(link)
			//link.style.display = 'none';
			//document.body.appendChild(link);
			//event.preventDefault()
			//link.click()
			//event.preventDefault()
		},
		async loadMore(){
			try {
				let nextSet = await api().get(`images/${this.$store.state.images.length}`);
				this.images = this.images.concat(nextSet.data)
				this.$store.dispatch('loadMoreImages', nextSet.data)
				//console.log(nextSet.data)
				//console.log(this.images.length)
			} catch (error) {
				//console.log(error)
			}
			
		}
	},
	components:{
		'nav-bar':Navbar,
		foot:Footer
	},
	async mounted(){
		try {
			let result = await api().get('images/0')
			//console.log(result)
			this.images = result.data
			this.$store.dispatch('setImages', result.data)
			//console.log(result.data)
		} catch (error) {
			console.log(error)
		}
	}
}
</script>

<style lang="scss">
	@mixin borderRadius($t,$l,$b,$r){
		border-radius:$t $l $b $r;
		-webkit-border-radius:$t $l $b $r;
		-moz-border-radius:$t $l $b $r;
		-o-border-radius:$t $l $b $r;
		-ms-border-radius:$t $l $b $r;
	}
	.home-banner{
		background-color:#dddddd;
		background-image: url(../assets/banana.jpg);
		background-position: center;
		background-size:cover;
		background-repeat: no-repeat;
		height:350px;
	}
	#banner-inner{
		background-color:rgba(0,0,0,0.3);
		height: 100px;
	}
	.images_section{
		background:#fff;
		margin-top:3%;
		width:100%;
	}
	.boxes{
		@include borderRadius(2px,2px,2px,2px);
		padding-left:8px;
		padding-right:8px;
		margin-bottom:10px;
		height:200px;
		&:hover{
			//opacity: .5;
			cursor: pointer;
			-webkit-filter: drop-shadow(8px 8px 10px gray); /* Safari */
    	filter: drop-shadow(8px 8px 10px gray);
		}
		img{
			width:100%;
			height:200px;
			@include borderRadius(2px,2px,2px,2px);
			box-shadow: 1px 3px 4px 0px #656565;
		}

		.overlay{
			height:0;
			position: absolute;
			z-index: 12;
			bottom:0;
			left:0;
			right:0;
			overflow: hidden;
			background:#343d46;
			width:100%;
			transition:.5s ease;
			@include borderRadius(0px, 0px, 5px, 5px);
		}
		&:hover .overlay{
			cursor: default;
			height:30%;
		}
		.meta{
			//cursor: pointer;
			//visibility: visible;
			width:100%;
			padding-left:15px;
			padding-right:15px;
			//background:peru;
			color:#fff;
			position:absolute;
			bottom: 10%;
			top:50%;
			left:50%;
			transform: translate(-50%, -50%);
  		-ms-transform: translate(-50%, -50%);
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

		/* Caption of Modal Image (Image Text) - Same Width as the Image */
		.modal-share {
				margin: auto;
				display: block;
				width: 20%;
				//max-width: 700px;
				text-align: center;
				color: #ccc;
				padding: 10px 0;
				height: 80%;
				background:#343d46;
				position: absolute;
				right: 0;
				top:15%;
		}

		/* Add Animation - Zoom in the Modal */
		.modal-box-content, .modal-share { 
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
	#button-row{
		margin-top:18px;
		margin-bottom: 25px;
	}
	#button-row button{
		margin:auto;
		display:block;
	}

	// style icons
	v-icon, .icon-heart, .icon-share-2, .icon-download{
		width:25px;
		margin-right:15px;
		float:right;
		&:hover{
			cursor: pointer;
		}
		
	}
	.modal-share .icon-download, .modal-share .icon-share-2{
		width:3rem;
		display:block;
		margin:auto;
		margin-top:50%;
		color:#fbf9fd;
		float:none;
		position: relative;
		top:10%;
	}
	.notliked{
		color:white;

	}
	.liked{
		color:red;
	}
	.modal-share .icon-share-2{
		margin-top:60%;
	}
	
</style>
