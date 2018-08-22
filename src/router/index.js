import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Riddles from '@/components/Riddles'
import More from '@/components/More'
import Puns from '@/components/Puns'
Vue.use(Router)
export default new Router({
    mode:'hash',
    routes:[
        {
            path:'/',
            name:'home',
            component:Home
        },
        {
            path:'/about',
            name:'about',
            component:About
        },
        {
            path:'/pun',
            name:'puns',
            component:Puns
        },
        {
            path:'/riddles',
            name:'riddles',
            component:Riddles
        },
        {
            path:'/riddles/:title',
            name:'more',
            component:More
        }
        
    ]
})