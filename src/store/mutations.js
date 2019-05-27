
import * as types from './types'

const mutations = {
    [types.LOGININFO](state, payload){
        state.loginInfo = payload.info
    },
    [types.NAVLIST](state, payload){
        state.navList = payload.info
    }
}

export default mutations