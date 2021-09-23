import { Message } from 'element-ui';

export function checkError(data) {
    if (data["code"] != 200){
        failMsg(data["msg"])
        return false
    }
    return true
}

export function successMsg(msg) {
    if (msg != null){
        Message.success(msg)
    }else {
        Message.success('成功')
    }
}

export function failMsg(msg) {
    if (msg != null){
        Message.error(msg)
    }else {
        Message.error('失败')
    }
}
