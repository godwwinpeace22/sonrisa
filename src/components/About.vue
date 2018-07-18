<template>
	<div>
		<nav-bar></nav-bar>
		<b-container>
			<b-row>
				<b-col>
					<h3>About me</h3>
					<b-jumbotron bg-variant="info" text-variant="white" border-variant="dark">
						<template slot="header">
							Bootstrap Vue
						</template>
						<template slot="lead">
							This is a simple hero unit, a simple jumbotron-style component for
							calling extra attention to featured content or information.
						</template>
						<hr class="my-4">
						<p>
							It uses utility classes for typography and spacing to space content
							out within the larger container.
						</p>
					</b-jumbotron>
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
