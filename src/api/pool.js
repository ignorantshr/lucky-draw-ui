import { service } from '@/utils/request'
import { prepath } from "./index";

const poolUrl = prepath + '/prizePool/'

export default pool
export class pool {
    constructor(id, name, type){
        this.id = parseInt(id)
        this.name = name
        this.type = type
        this.prizes = []
    }
}
export function newPoolById(id) {
    return new pool(id, null, null)
}
export function newPoolPrize(id, prizes) {
    var re = new pool(id, null, null)
    re.prizes = prizes
    return re
}

export function pool_list() {
    var url = poolUrl + 'getAll'
    return service({
        url: url,
        method: 'get',
        headers: {},
    }).then(res => {
        return res.data
    })
}

export function pool_info(id) {
    var url = poolUrl + 'info'
    return service({
        url: url,
        method: 'post',
        headers: {},
        data: new pool(id)
    }).then(res => {
        return res.data
    })
}

export function pool_get(pool) {
    var url = poolUrl + 'get'
    return service({
        url: url,
        method: 'post',
        headers: {},
        data: pool
    }).then(res => {
        return res.data
    })
}

export function pool_add(pool) {
    var url = poolUrl + 'add'
    return service({
        url: url,
        method: 'post',
        headers: {},
        data: pool
    }).then(res => {
        return res.data
    })
}

export function pool_update(pool) {
    var url = poolUrl + 'update'
    return service({
        url: url,
        method: 'post',
        headers: {},
        data: pool
    }).then(res => {
        return res.data
    })
}

export function pool_delete(id) {
    var url = poolUrl + 'delete'
    return service({
        url: url,
        method: 'post',
        headers: {},
        data: new pool(id)
    }).then(res => {
        return res.data
    })
}

export function pool_addPrize(pool){
    let url = poolUrl + "addPrize"
    return service({
        url: url,
        method: 'post',
        data: pool
    }).then(res => {
        return res.data
    })
}

export function pool_updatePrize(pool){
    let url = poolUrl + "updatePrize"
    return service({
        url: url,
        method: 'post',
        data: pool
    }).then(res => {
        return res.data
    })
}

export function pool_delPrize(pool){
    let url = poolUrl + "delPrize"
    return service({
        url: url,
        method: 'post',
        data: pool
    }).then(res => {
        return res.data
    })
}
