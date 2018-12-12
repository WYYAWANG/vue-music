// export function addClass(el, className) {
//     console.log('has?---->'+hasClass(el,className))
//     if (hasClass(el, className)) {
//         return
//     } else {
//         let newClass = el.className.split(' ')
//         newClass.push(className)
//         el.className = newClass.join(' ')
//     }
// }

// export function hasClass(el, className) {
//     let reg = new RegExp('^|\\s' + className + '(\\s|$)')
//     return reg.test(el.className)
// }

export function addClass(el, className) {
    if (hasClass(el, className)) return
    // console.log(hasClass(el, className))
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}

export function hasClass(el, className) {
    const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}