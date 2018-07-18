<template>
	<div>
		<nav-bar></nav-bar>
		<b-container>
			<b-row>
				<b-col>
					<h3>About me</h3>
				</b-col>
			</b-row>
		</b-container>
		<foot></foot>
	</div>
</template>
<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
export default {
	data(){
		return{

		}
	},
	components:{
		'nav-bar':Navbar,
		foot:Footer
	}
}
</script>
