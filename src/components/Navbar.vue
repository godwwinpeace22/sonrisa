<template>
	<div style="background-color: #343d46;" id="top">
		<b-row>
			<b-col cols="12">
				<nav class="header">
					<a href="/#/" title="Sonrisa" id="brand"> Sonrisa</a>

					<div class="left upload">
						<b-button href="#" size="sm" variant="primary" id="upload" v-b-modal.modal-center>Upload an image</b-button>
					</div>

					<div class="left">
						
						<a href="/#/pun" id="">PUNs</a>
						<a href="/#/riddles" id="">Riddles</a>
						<a href="/#/about" id="about">About</a>
						<a href="#" v-if="!$store.state.loggedin" id="login" @click="triggerModal">Login</a>
						<!--router-link :to="'/register'" v-if="!$store.state.loggedin">Register</router-link-->
						
						<router-link to="#" v-if="$store.state.loggedin" id="username">{{$store.state.user.username}}</router-link>
						<a v-if="$store.state.loggedin" href="#" @click='logout'>Logout</a>
					</div>
					
				</nav>
			</b-col>
		</b-row>

		<!--upload form -->
		<b-container fluid>
			<b-col>
				<b-row>
					<b-modal id="modal-center" ref="modalcenter" centered title="Upload your own funny meme" header-bg-variant="light" footer-bg-variant="dark">
					<h6 style="font-size:12px;">Drag and drop enabled</h6>
					<b-form-file v-model="file" ref="fileinput" :state="Boolean(file)" accept="image/*" placeholder="Choose a file..."></b-form-file>
					<div class="mt-3">Selected file: {{file && file.name}}</div>
					<div slot='modal-footer'>
						<b-button variant="primary" size="sm" @click="uploadFile">{{uploadProgress ? 'Uploading...' : 'Upload'}}</b-button>
						<span v-show="uploadProgress" id="loading_spinner" style="position:absolute;top:80%;display:block;left:45%;"><img src="@/assets/loading_spinner.svg" style="width:20%" alt="spinner"></span>
					</div>
				</b-modal>
				</b-row>
			</b-col>
		</b-container>
		

		<!-- toast -->
		<b-col sm="6" offset-sm="3" style="position:absolute;top:5%;right:20px">
			<b-alert :show='dismissCountDown' variant="success" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged" dismissible>
				<p>{{alertMsg}}</p>
			</b-alert>
		</b-col>
		

		<b-container fluid>
			<b-row>
				<b-col cols="12" md="12" id="login_modal" class="login_modal" >
					
					
					<!-- Modal Content -->
					<div class="login_modal_content" id="login_modal_content">
						<!-- The Close Button -->
						<span class="login_modal_close">&times;</span>
						<span v-show="showSpinner" id="loading_spinner"><img src="@/assets/loading_spinner.svg" alt="spinner"></span>
						<h4>{{showRegisterModal ? 'Sign Up' : 'Login' }}</h4>
						<hr>
						<b-alert show variant="danger" v-show="showError">{{errorText}}</b-alert>
						<b-form @submit.prevent="login">
							<b-form-group label="Username">
								<b-form-input name="username" type="text" placeholder="username" v-model="form.username" required="required" class="form-control"/>
							</b-form-group>
							
							
							<b-form-group label="Password">
								<b-form-input name="password" type="password" placeholder="password" v-model="form.password" required="required" class="form-control"/>
							</b-form-group>
							<b-form-group v-if='showRegisterModal'>
								<b-form-input name="password" type="password" placeholder="Re-enter password" v-model="form.password2" required="required" class="form-control"/>
							</b-form-group>
							<b-form-group>
								<b-button name="login" type="submit" class="btn btn-primary" variant="primary">{{showRegisterModal ? 'Sign Up' : 'Login'}}</b-button>
							</b-form-group>
						</b-form>
						<a href="#" @click="showRegisterModal=!showRegisterModal;">{{showRegisterModal ? 'Or Login' : 'Or Sign Up'}}</a>
					</div>
					<!-- Modal Caption (Image Text) -->
					<div id="caption"></div>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import authService from '@/services/authService'
import api from '@/services/api'
export default {
	data(){
		return {
			showSpinner:false,
			uploadProgress:false,
			showError:false,
			errorText:'',
			alertMsg:'',
			showRegisterModal:false,
			dismissSecs: 5,
			dismissCountDown: 0,
			file:null,
			form:{
				username:'',
				password:'',
				password2:''
			},
			cloudinary: {
       uploadPreset: 'izcl0gzg',
			 cloudName: 'unplugged'
     }, 
		}
	},
	methods:{
		logout(e){
			e.preventDefault()
			this.$store.dispatch('logout', 'data')
			this.alertMsg = 'You are logged out'
			this.dismissCountDown = this.dismissSecs
		},
		triggerModal(event){
			let modal = document.getElementById('login_modal');
			modal.style.display = "block";
			//Get the <span> element that closes the modal
			let span = document.getElementsByClassName("login_modal_close")[0];
			
			// When the user clicks on <span> (x), close the modal
			span.onclick = function() { 
				modal.style.display = "none";
			}
		},
		countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
		},
		async uploadFile(){
			try {
				if(this.file != null){ // allow images only
					console.log(this.file.type)
					console.log(typeof this.file.type)
					if(this.file.type != 'image/jpeg' && this.file.type != 'image/png'){
						alert('Sorry, only images are allowed.')
						this.$refs.fileinput.reset(); // reset file field
					}
					else{
						this.uploadProgress = true
						let formData = new FormData()
						formData.append('file', this.file)
						formData.append('upload_preset', this.cloudinary.uploadPreset);
						let res = await api().post(`https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/upload`, formData)
						console.log(res.data)
						this.uploadProgress = false
						this.$refs.fileinput.reset(); // reset file field
						this.$refs.modalcenter.hide()
						alert('Upload successful. Thank you!')
					}
					
				}
				else{
					alert('Please select a file')
				}
			} catch (error) {
				console.log(error)
				alert('Sorry, an error occured')
			}
			
			
		},
		async login(){
			try {
				this.showSpinner = true
				if(this.showRegisterModal){ // register user
					let response = await authService.Register('users/register', this.form)
					//console.log(response.data)
					this.$store.dispatch('setUser', response.data)
					this.showSpinner = false
					this.showError = false
					document.getElementById('login_modal').style.display = 'none'
					this.alertMsg = 'You are now logged in!'
					this.dismissCountDown = this.dismissSecs
					//this.$router.push('/')
					
				}
				else{ // log user in
					let response = await authService.Login('users/login', this.form)
					//console.log(response.data)
					//console.log(response.status)
					this.$store.dispatch('setUser', response.data)
					this.showSpinner = false
					this.showError = false
					document.getElementById('login_modal').style.display = 'none'
					this.alertMsg = 'You are now logged in!'
					this.dismissCountDown = this.dismissSecs
					//this.$router.push('/')
				}
				
			} catch (error) {
				//console.log(error)
				//console.log(error.response)
				this.showSpinner = false
				this.showError = true
				if(error.response  && error.response.status == 401){
					this.errorText = 'Invalid username or password'
				}
				else if(error.response && error.response.status == 404){
					this.errorText = error.response.data
				}
				else if(error.response && error.response.status == 500){
					this.errorText = 'Passwords do not match'
				}
				else{
					this.errorText = 'Sorry, something went wrong'
				}
			}
			
		}
	},
	mounted(){
		//console.log(this.$store.state.user);
	}
}
</script>

<style lang="scss" scoped>
	@mixin borderRadius($t,$l,$b,$r){
		border-radius:$t $l $b $r;
		-webkit-border-radius:$t $l $b $r;
		-moz-border-radius:$t $l $b $r;
		-o-border-radius:$t $l $b $r;
		-ms-border-radius:$t $l $b $r;
	}
	#top{
		background-image: -webkit-repeating-radial-gradient(center center, rgba(0,0,0,.2), rgba(0,0,0,.2) 1px, transparent 1px, transparent 100%);
    background-image: -moz-repeating-radial-gradient(center center, rgba(0,0,0,.2), rgba(0,0,0,.2) 1px, transparent 1px, transparent 100%);
    background-image: -ms-repeating-radial-gradient(center center, rgba(0,0,0,.2), rgba(0,0,0,.2) 1px, transparent 1px, transparent 100%);
    background-image: repeating-radial-gradient(center center, rgba(0,0,0,.2), rgba(0,0,0,.2) 1px, transparent 1px, transparent 100%);
    -webkit-background-size: 3px 3px;
    -moz-background-size: 3px 3px;
    background-size: 3px 3px;
		background-color:#343d46;
	}
	nav{
		//width:100%;
		height: 45px;
		line-height:42px;
		overflow: aut;
		a{
			color:#eff1f5;
			font-size: 18px;
			text-decoration:none;
		}
		#brand{
			float:left;
			padding-left:15px;
			text-transform:uppercase;
			font-weight: bold;
			width: fit-content;
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		}
		.left{
			float:right;
			padding-left:15px;
			padding-right:15px;
			a{
				font-size: 14px;
				margin-left:5px;
				margin-right:5px;
				&:hover{
					color:#FFC107;
				}
			}
			
			#about::after{
				content:'|';
				color:#fff;
				margin-left:10px;
				margin-right:10px;
				font-size: 18px;
			}

			#username{color:#3ed423;}
		}
		v-icon, .icon-chevron-down{
			width:20px;
			margin-top:12px;
			float:right;
			display:inline-block;

			
		}
	}

	.login_modal {
			 display: none;/* Hidden by default */
			position: fixed; /* Stay in place */
			z-index: 100; /* Sit on top */
			//padding-top: 100px; /* Location of the box */
			left: 0;
			top: 0;
			width: 100%; /* Full width */
			height: 100%; /* Full height */
			//overflow: auto; /* Enable scroll if needed */
			background-color:rgba(0, 0, 0, 0.57); /* Black w/ opacity */
		}

		/* Modal Content (Image) */
		.login_modal_content {
			margin: auto;
			display: block;
			padding:15px;
			padding-top:0px;
			//width: 30%;
			//height: 65%;
			position: relative;
			top:15%;
			max-width: 700px;
			background:#fff;
			@include borderRadius(5px, 5px, 5px, 5px);
			box-shadow: 1px 5px 10px black;
			h4{
				text-align:center;
				margin-top:-8%;
			}
			.btn{
				width:100%;
			}
		}

		/* Add Animation - Zoom in the Modal */
		.login_modal_content{ 
				animation-name: zoom;
				animation-duration: 0.6s;
		}

		@keyframes zoom {
				from {transform:scale(0)} 
				to {transform:scale(1)}
		}

		/* The Close Button */
		.login_modal_close {
				position: relative;
				top: 0;
				left:90%;
				color: #000;
				font-size: 2.5rem;
				font-weight: bold;
				transition: 0.3s;
		}

		.login_modal_close:hover,
		.login_modal_close:focus {
				color: #333;
				text-decoration: none;
				cursor: pointer;
		}

		/* 100% Image Width on Smaller Screens */
		@media only screen and (max-width: 700px){
				.login_modal_content {
						width: 100%;
				}
		}
		#loading_spinner{
			display: block;
			position: absolute;
			z-index: 100;
			top: 20%;
			left: 20%;
		}
		.alert-success{
			color: #f3f7f3;
			background-color: #3eb73e;
			border-color: #3eb73e;
		}
		@media (max-width: 512px){
			nav{
				height:fit-content;
				#brand{
					display:block;
					margin:auto;
					float:none;
				}
				.left{
					width:fit-content;
					margin:auto;
					display:block;
					float:none;
				}
			}
		}
</style>
