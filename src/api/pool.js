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

export class prizeQuery {
    constructor(poolId, prizeName, prizeId){
        this.poolId = parseInt(poolId)
        this.prizeName = prizeName
        this.prizeId = parseInt(prizeId)
    }
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

export function pool_queryPrize(query){
    let url = poolUrl + "getPrizes"
    return service({
        url: url,
        method: 'post',
        data: query
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

export function pool_addNewPrize(pool){
    let url = poolUrl + "addNewPrize"
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

export function pool_getUnpoolPrize(id){
    let url = poolUrl + "getUnpoolPrizes"
    return service({
        url: url,
        method: 'post',
        data: new pool(id)
    }).then(res => {
        return res.data
    })
}

export function pool_draw(id){
    let url = poolUrl + "draw"
    return service({
        url: url + "?id=" + id,
        method: 'get',
    }).then(res => {
        return res.data
    })
}
