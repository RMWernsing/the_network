import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Post } from "@/models/Post.js"
import { AppState } from "@/AppState.js"

class PostsService{
  async getPosts() {
    const response = await api.get('api/posts')
    logger.log('here are all your posts', response.data.posts)
    const posts = response.data.posts.map(pojo => new Post(pojo))
    AppState.posts = posts
  }
}

export const postsService = new PostsService()