const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "Testiblogi 5",
    "author": "Test Author 5",
    "url": "www.testiurl3.urli",
    "likes": 3
  },
  {
    "title": "Testiblogi 5",
    "author": "Test Author 5",
    "url": "www.testiurl3.urli",
    "likes": 3
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'Rem Oved', url: 'www.remove.fi', likes: 0 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}