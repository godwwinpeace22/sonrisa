import Vue from 'vue'
import Vuex from 'vuex'
import creatPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
    strict:true,
    plugins:[creatPersistedState()],
    state:{
        user:null,
        loggedin:false,
        images:[]
    },
    mutations:{
        setUser(state,user){
            state.user = user
            state.loggedin = true
        },
        logout(state,data){
            state.user = null
            state.loggedin = false
        },
        setImages(state,images){
            state.images = images
        },
        loadMoreImages(state,images){
            state.images = state.images.concat(images)
        }
    },
    actions:{
        setUser({commit}, user){
            commit('setUser',user)
        },
        logout({commit}, data){
            commit('logout', data)
        },
        setImages({commit}, images){
            commit('setImages', images)
        },
        loadMoreImages({commit}, images){
            commit('loadMoreImages', images)
        }
    }
})