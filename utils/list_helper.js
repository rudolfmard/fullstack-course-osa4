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
    if (blogs.length === 0){
        return null
    }
    likes = blogs.map(blog => Number(blog.likes))
    maxLikes = Math.max(...likes)
    favBlog = blogs.filter(blog => Number(blog.likes) === maxLikes)[0]
    return favBlog
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0){
        return null
    }
    // get array of unique authors:
    let authors = [...new Set(blogs.map(blog  => blog.author))]
    // get number of blogs per author
    blogsPerAuthor = []
    for(i = 0; i<authors.length; i++){
        blogsPerAuthor.push(blogs.filter(b => b.author === authors[i]).length)
    }
    // get the author corresponding to most written blogs:
    let max_blogs = blogsPerAuthor[0]
    let max_author = authors[0] 
    for(i = 1; i < authors.length; i++){
        if (blogsPerAuthor[i] > max_blogs){
            max_blogs = blogsPerAuthor[i]
            max_author = authors[i]
        }
    }

    return (
        {
            author: max_author,
            blogs: max_blogs
        }
    )
}

const mostLikes = (blogs) => {
    if (blogs.length === 0){
        return null
    }
    // get array of unique authors:
    let authors = [...new Set(blogs.map(blog  => blog.author))]
    // get number of likes per author
    likesPerAuthor = []
    for(i = 0; i<authors.length; i++){
        blogsByAuthor = blogs.filter(b => b.author === authors[i])
        likes = blogsByAuthor.map(b => Number(b.likes))
        likesPerAuthor.push(likes.reduce((sum, l) => sum+l, 0))
    }
    // get the author corresponding to most likes:
    let max_likes = likesPerAuthor[0]
    let max_author = authors[0] 
    for(i = 1; i < authors.length; i++){
        if (likesPerAuthor[i] > max_likes){
            max_likes = likesPerAuthor[i]
            max_author = authors[i]
        }
    }

    return (
        {
            author: max_author,
            likes: max_likes
        }
    )
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}