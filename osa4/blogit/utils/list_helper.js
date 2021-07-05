const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  if (blogs.length === 0) {
    return 0;
  } else {
    const reducer = (sum, item) => {
      return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
  }
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) {
    return {}
  } else {
    const getFavorite = (accumulator, currentValue) => {
      return accumulator.likes > currentValue.likes ? accumulator : currentValue
    }
    const favorite = blogs.reduce(getFavorite)
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}