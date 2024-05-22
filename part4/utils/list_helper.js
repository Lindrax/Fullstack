const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes =(blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce(
      (total, n) => total + n.likes,0,)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const favorite = blogs.reduce(
    (accumulator, currentValue) => {
      return accumulator.likes > currentValue.likes
        ? accumulator
        : currentValue
    }
  )
  const { title, author, likes } = favorite
  return { title, author, likes }
}

const mostBlogs = (blogs) => {
  const authors = _.groupBy(blogs, 'author')
  const most = _.mapValues(authors, function(num) { return num.length })
  const lol =_.maxBy(_.keys(most), (author) => most[author])
  return{ author: lol,
    blogs: most[lol]
  }
}

const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs, 'author')
  const likes = _.mapValues(authors, (authorblogs) => _.sumBy(authorblogs, 'likes'))
  const max = _.maxBy(_.keys(likes), (author) => likes[author])
  return { author: max,
    likes: likes[max]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}