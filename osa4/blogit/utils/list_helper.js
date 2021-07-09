var _ = require('lodash');

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

const mostBlogs = (blogs) => {
  const blogCount = _.countBy(blogs, 'author');
  const reformedBlogCount = Object.entries(blogCount).map(item => {
    return {
      author: item[0],
      blogs: item[1]
    }
  });

  console.log(reformedBlogCount);

  const result = reformedBlogCount.reduce((a, b) => {
    return a.blogs > b.blogs ? a : b;
  })

  console.log(result);

  return result;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}