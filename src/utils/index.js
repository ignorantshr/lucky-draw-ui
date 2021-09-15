export function checkError(data) {
    if (data["code"] != 200){
        window.alert(data["msg"])
        return false
    }
    return true
}