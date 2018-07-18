<template>
<div>
	<nav-bar></nav-bar>
	<b-container fluid='fluid'>
		<b-row class='home-banner' align-v='center'>
			<b-col id='banner-inner' cols='8' offset-sm="2"></b-col>
		</b-row>
		<b-row>
			<b-col cols='12' offset-sm='1' class="images_section">

				<b-row>
					
					<b-col class='boxes' sm='3' mx-15 >
						<img id="funnyimg1"  src="@/assets/funny-science.jpg" @click='triggerModal($event)'>
						<div class="overlay" >
							<div class="meta" >
								<span @click="loveit"><v-icon name='heart' v-b-tooltip.hover title="Like this meme"></v-icon></span>
								<span @click="shareit"><v-icon name='share-2' v-b-tooltip.hover title="Share this meme"></v-icon></span>
							</div>
						</div>
					</b-col>
					<b-col class='boxes' sm='3' mx-15 >
						<img id="funnyimg2" @click='triggerModal($event)' src="@/assets/That’s-the-reason-I’m-single….jpg">
						<div class="overlay" >
							<div class="meta" >
								<span @click="loveit"><v-icon name='heart' v-b-tooltip.hover title="Like this meme"></v-icon></span>
								<span @click="shareit"><v-icon name='share-2' v-b-tooltip.hover title="Share this meme"></v-icon></span>
							</div>
						</div>
					</b-col>
					<b-col class='boxes' sm='3' mx-15 >
						<img id="funnyimg3" @click='triggerModal($event)' src="@/assets/the-best-funny-pictures-of-morning-cats.jpg">
						<div class="overlay" >
							<div class="meta" >
								<span @click="loveit"><v-icon name='heart' v-b-tooltip.hover title="Like this meme"></v-icon></span>
								<span @click="shareit"><v-icon name='share-2' v-b-tooltip.hover title="Share this meme"></v-icon></span>
							</div>
						</div>
					</b-col>
					<b-col class='boxes' sm='3' mx-15 >
						<img id="funnyimg4" @click='triggerModal($event)' src="@/assets/Toddler_meme.jpg">
						<div class="overlay" >
							<div class="meta" >
								<span @click="loveit" ><v-icon name='heart' v-b-tooltip.hover title="Like this meme"></v-icon></span>
								<span @click="shareit"><v-icon name='share-2' v-b-tooltip.hover title="Share this meme"></v-icon></span>
							</div>
						</div>
					</b-col>
					<b-col class='boxes' sm='3' mx-15 >
						<img id="funnyimg5" @click='triggerModal($event)' src="@/assets/watermelon.jpg">
						<div class="overlay" >
							<div class="meta" >
								<span @click="loveit"><v-icon name='heart' v-b-tooltip.hover title="Like this meme"></v-icon></span>
								<span @click="shareit"><v-icon name='share-2' v-b-tooltip.hover title="Share this meme"></v-icon></span>
							</div>
						</div>
					</b-col>
					<b-col class='boxes' sm='3' mx-15 >
						<img id="funnyimg6" @click='triggerModal($event)' src="@/assets/dogface.jpg">
						<div class="overlay" >
							<div class="meta" >
								<span @click="loveit"><v-icon name='heart' v-b-tooltip.hover title="Like this meme"></v-icon></span>
								<span @click="shareit"><v-icon name='share-2' v-b-tooltip.hover title="Share this meme"></v-icon></span>
							</div>
						</div>
					</b-col>
					<b-col class='boxes' sm='3' mx-15 >
						<img id="funnyimg7" @click='triggerModal($event)' src="@/assets/takingcatout.jpg">
						<div class="overlay" >
							<div class="meta" >
								<span @click="loveit"><v-icon name='heart' v-b-tooltip.hover title="Like this meme"></v-icon></span>
								<span @click="shareit"><v-icon name='share-2' v-b-tooltip.hover title="Share this meme"></v-icon></span>
							</div>
						</div>
					</b-col>
					<b-col class='boxes' sm='3' mx-15 >
						<img id="funnyimg8" @click='triggerModal($event)' src="@/assets/trynottofart.jpg">
						<div class="overlay" >
							<div class="meta" >
								<span @click="loveit"><v-icon name='heart' v-b-tooltip.hover title="Like this meme"></v-icon></span>
								<span @click="shareit"><v-icon name='share-2' v-b-tooltip.hover title="Share this meme"></v-icon></span>
							</div>
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col id="myModalBox" class="modalbox">
						<!-- The Close Button -->
						<span class="modal-close">&times;</span>

						<!-- Modal Content (The Image) -->
						<img class="modal-box-content" id="img01">
						<a href="" id="imglink" download></a>
						<div class="modal-share">
							<v-icon name='download' id="modal-share-download"></v-icon>
							<v-icon name='share-2' id="modal-share-share"></v-icon>

							<b-tooltip target="modal-share-download" title="download"></b-tooltip>
							<b-tooltip target="modal-share-share" title="Share on facebook"></b-tooltip>
						</div>
						<!-- Modal Caption (Image Text) -->
						<div id="caption"></div>
					</b-col>
				</b-row>

				<!-- programmatically add more memes -->
				<b-row>
					<b-col class='boxes' sm='3' mx-15 v-for='image in images' :key='image._id'>
						<img id="funnyimg1"  :src="getPics(image.src)" @click='triggerModal($event)'>
						<div class="overlay" >
							<div class="meta" >
								<span @click="loveit"><v-icon name='heart' v-b-tooltip.hover title="Like this meme"></v-icon></span>
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
			liked:false
		}
	},
	methods:{
		getRef(id){
			return id
		},
		getPics(src){
			return src
		},
		setRef(id){
			return id
		},
		setId(id){
			return id
		},
		myModal (id) {
			//console.log(id)
			return id
		},
		hideModal (id) {
			//console.log(this.$refs[id][0])
			this.$refs[id][0].hide()
		},
		like(id){
			let elem = document.getElementById(id);
			//console.log(elem.style)
			this.liked = !this.liked
			elem.style.color = this.liked ? 'red' : '#fff'
			
		},
		loveit(event){
			//console.log(event.target)
			let heartIcon = event.target
			//change the icon color color 
			heartIcon.style.color == 'red' ? heartIcon.style.color = 'white' : heartIcon.style.color = 'red';
		},
		shareit(event){
			//console.log(event.srcElement)
			let shareIcon = event.target
			//change the icon color color 
			shareIcon.style.color == 'red' ? shareIcon.style.color = 'white' : shareIcon.style.color = 'red';
		},
		triggerModal(event){
			//console.log(event.target.id)
			// Get the modal
			var modal = document.getElementById('myModalBox');
			var img = document.getElementById(event.target.id);
			var modalImg = document.getElementById("img01");
			var imgdwld = document.getElementById("imglink");

			modal.style.display = "block";
			modalImg.src = event.target.src;
			modalImg.style.height = '80%'
			// Get the <span> element that closes the modal
			var span = document.getElementsByClassName("modal-close")[0];
			
			
			//when the user clicks the download button
			document.getElementById('modal-share-download').onclick = function(){
				imgdwld.href = event.target.src
				imgdwld.click()
			}
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
				let nextSet = await api().get(`images/${this.images.length}`);
				this.images = this.images.concat(nextSet.data)
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
		/*try {
			let result = await api().get('images/0')
			console.log(result)
			this.images = result.data
			console.log(result.data)
		} catch (error) {
			console.log(error)
		}*/
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
		background:peachpuf;
		margin-top:3%;
		margin-left:10px;
		width:100%;
	}
	.boxes{
		//border:1px solid #eee;
		background-size:cover;
		background-repeat:no-repeat;
		@include borderRadius(2px,2px,2px,2px);
		padding-left:5px;
		padding-right:5px;
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
			display: none; /* Hidden by default */
			position: fixed; /* Stay in place */
			z-index: 100; /* Sit on top */
			//padding-top: 100px; /* Location of the box */
			left: 0;
			top: 0;
			width: 100%; /* Full width */
			height: 100%; /* Full height */
			//overflow: auto; /* Enable scroll if needed */
			background-color: rgb(0,0,0); /* Fallback color */
			background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
		}

		/* Modal Content (Image) */
		.modal-box-content {
			margin: auto !important;
			display: block;
			width: 60%;
			position: relative;
			top:15%;
			max-width: 700px;
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
	.modal-share .icon-share-2{
		margin-top:60%;
	}
	
</style>
