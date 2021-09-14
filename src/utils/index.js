export function checkError(data) {
    if (data["code"] != 200){
        console.error(data)
        return false
    }
    return true
}