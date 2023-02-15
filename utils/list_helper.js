const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0){
        return 0
    }
    let sum = 0
    blogs.forEach(element => {
        sum += element.likes
    })
    return sum
}

module.exports = {
    dummy,
    totalLikes
}