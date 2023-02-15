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

const favoriteBlog = (blogs) => {
    likes = blogs.map(blog => Number(blog.likes))
    maxLikes = Math.max(...likes)
    favBlog = blogs.filter(blog => Number(blog.likes) === maxLikes)[0]
    return favBlog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}