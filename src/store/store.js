import Vue from 'vue'
import Vuex from 'vuex'
import creatPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
    strict:true,
    plugins:[creatPersistedState()],
    state:{
        user:null,
        loggedin:false
    },
    mutations:{
        setUser(state,user){
            state.user = user
            state.loggedin = true
        },
        logout(state,data){
            state.user = null
            state.loggedin = false
        }
    },
    actions:{
        setUser({commit}, user){
            commit('setUser',user)
        },
        logout({commit}, data){
            commit('logout', data)
        }
    }
})