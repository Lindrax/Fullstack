const dummy = () => {
  return 1
}

const totalLikes =(blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce(
      (total, n) => total + n.likes,0,)
}

module.exports = {
  dummy,
  totalLikes
}