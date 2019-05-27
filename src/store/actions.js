
import * as types from './types'
import { setToken } from 'assets/js/auth'

const actions = {
    createLoginInfo ({commit}, params){
        setToken(params.id)
        commit({
            type: types.LOGININFO,
            info: params
        })
    },
    createNavList ({commit}, params){
        commit({
            type: types.NAVLIST,
            info: params
        })
    }
}

export default actions