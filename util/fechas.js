const format = require('date-fns/format')
const parse = require('date-fns/parse')


exports.getFecha= (dia)=>{
    const today = new Date(dia)
    const formatToDay = (format(today, "yyyy-MM-dd"))
    return formatToDay
   
   
}

exports.hoy=()=>{
    const today = new Date()
    const formatToDay = (format(today, "yyyy-MM-dd"))
    return formatToDay
}
