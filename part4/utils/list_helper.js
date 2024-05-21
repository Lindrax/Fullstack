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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}