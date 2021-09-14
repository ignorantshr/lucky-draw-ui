import { service } from '@/utils/request'

const prepath = '/lucky-draw'
const prizeUrl = prepath + '/prize/'

export class prize {
    constructor(id, name, url){
        this.id = id
        this.name = name
        this.url = url
    }
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
