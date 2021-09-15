import { service } from '@/utils/request'
import { prepath } from "./index";

const prizeUrl = prepath + '/prize/'

export class prize {
    constructor(id, name, url){
        this.id = parseInt(id)
        this.name = name
        this.url = url
    }
}
export function newPrizeById(id) {
    return new prize(id, null, null)
}

export function prize_list() {
    var url = prizeUrl + 'getAll'
    return service({
        url: url,
        method: 'get',
        headers: {},
    }).then(res => {
        return res.data
    })
}

export function prize_get(prize) {
    var url = prizeUrl + 'get'
    return service({
        url: url,
        method: 'post',
        headers: {},
        data: prize
    }).then(res => {
        return res.data
    })
}

export function prize_add(prize) {
    var url = prizeUrl + 'add'
    return service({
        url: url,
        method: 'post',
        headers: {},
        data: prize
    }).then(res => {
        return res.data
    })
}

export function prize_update(prize) {
    var url = prizeUrl + 'update'
    return service({
        url: url,
        method: 'post',
        headers: {},
        data: prize
    }).then(res => {
        return res.data
    })
}

export function prize_delete(id) {
    var url = prizeUrl + 'delete'
    return service({
        url: url,
        method: 'post',
        headers: {},
        data: new prize(id)
    }).then(res => {
        return res.data
    })
}

export default prize
