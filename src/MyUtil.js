export const formatDate = (date) => {
    let year = new Date(date).getFullYear()
    let month = new Date(date).getUTCMonth() + 1
    let dt = new Date(date).getUTCDate()
    if (dt < 10) {
        dt = '0' + dt
    }
    if (month < 10) {
        month = '0' + month
    }
    return month + '-' + dt + '-' + year.toString().slice(-2)
}