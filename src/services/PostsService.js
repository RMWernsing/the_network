import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Post } from "@/models/Post.js"
import { AppState } from "@/AppState.js"

class PostsService{
  
  async likePost(id) {
    const response = await api.post(`api/posts/${id}/like`)
    const updatedPost = response.data
    const postIndex = AppState.posts.findIndex(post => post.id == id)
    AppState.posts[postIndex] = new Post(updatedPost)
  }

  async getPosts() {
    const response = await api.get('api/posts')
    const posts = response.data.posts.map(pojo => new Post(pojo))
    AppState.posts = posts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
  }
  
  async changePage(pageNumber) {
    const response = await api.get(`api/posts?page=${pageNumber}`)
    const posts = response.data.posts.map(pojo => new Post(pojo))
    AppState.posts = posts
    AppState.currentPage = pageNumber
  }
  
  async getPostsByCreatorId(profileId) {
    AppState.posts = []
    const response = await api.get(`api/posts?creatorId=${profileId}`)
    logger.log('here are your posts', response.data)
    const posts = response.data.posts.map(pojo=> new Post(pojo))
    AppState.posts = posts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
  }
  
  async changeProfilePageNewer(pageNumber, id) {
    AppState.posts = []
    const response = await api.get(`api/posts?creatorId=${id}&page=${pageNumber}`)
    const posts = response.data.posts.map(pojo=> new Post(pojo))
    AppState.posts = posts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
    
  }
  
  async changeProfilePageOlder(pageNumber, id) {
    AppState.posts = []
    const response = await api.get(`api/posts?creatorId=${id}&page=${pageNumber}`)
    const posts = response.data.posts.map(pojo=> new Post(pojo))
    AppState.posts = posts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
    
  }

  async createPost(postData) {
    const response = await api.post('api/posts', postData)
    logger.log('here is your post', response.data)
    const post = new Post(response.data)
    AppState.posts.push(post)
    this.getPosts()
  }

  async deletePost(postId) {
    const response = await api.delete(`api/posts/${postId}`)
    logger.log('deleteing this post ', response.data)
    const posts = AppState.posts
    const postIndex = posts.findIndex(post => post.id == postId)
    posts.splice(postIndex, 1)
  }
}

export const postsService = new PostsService()