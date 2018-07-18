<template>
	<div>
		<nav-bar></nav-bar>
		<b-container>
			<b-row>
				<b-col class="col-sm-10 offset-sm-1 login">
					<h4>Login</h4>
					<b-form @submit.prevent="login">
						<b-form-group>
							<b-form-input name="username" type="text" placeholder="username" v-model="form.username" required="required" class="form-control"/>
						</b-form-group>
						
						
						<b-form-group>
							<b-form-input name="password" type="password" placeholder="password" v-model="form.password" required="required" class="form-control"/>
						</b-form-group>
						
						<b-form-group>
							<b-button name="login" type="submit" class="btn btn-primary">Login</b-button>
						</b-form-group>
					</b-form>
					<router-link :to="'/register'">Or Register</router-link>
				</b-col>
			</b-row>
			
		</b-container>
		<foot></foot>
		
	</div>
</template>
<script>
import authService from '@/services/authService'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
export default {
	data(){
		return{
			form:{
				username:'',
				password:''
			}
		}
	},
	components:{
		'nav-bar':Navbar,
		foot:Footer,
	},
	methods:{
		async login(){
			try {
				let response = await authService.Login('users/login', this.form)
					console.log(response.data)
					console.log(response.status)
					this.$store.dispatch('setUser', response.data)
					this.$router.push('/')
			} catch (error) {
				console.log(error)
				
			}
			
		}
	}
}
</script>

<style lang="scss" scoped>
	
	.login{
		margin-top:20%;
		box-shadow: 0px 0px 14px #bbb;
		border: 1px solid #ccc;
		border-radius: 5px;
		background: white;
		h4{
			text-align:center;
			color:#5a5353;
			padding-top:5px;
		}
	}
</style>
