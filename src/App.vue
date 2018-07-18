<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
//import Navbar from '@/components/Navbar'
//import Footer from '@/components/Footer'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    //'nav-bar':Navbar,
   // foot:Footer
  }
}
</script>

<style lang="scss">
body, html{
  margin:0px;
}
html {
  height: 100%;
}
body{
  min-height: 100%;
  position: relative;
  margin: 0;
  padding-bottom: 6rem;
  background:#e6e6e6;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin:0px;
}

a {
  color: #42b983;
  text-decoration: none;
}
</style>
