export class Post{
  constructor(data){
    this.id = data.id
    this.body = data.body
    this.creatorId = data.creatorId
    this.likesIds = data.likesIds
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.creator = data.creator
    this.likes = data.likes
    this.imgUrl = data.imgUrl
  }
}
