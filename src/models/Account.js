export class Account {
  // /**
  //  * @typedef AccountData
  //  * @property {string} id
  //  * @property {string} email
  //  * @property {string} name
  //  * @property {string} picture
  //  * 
  //  * @param {AccountData} data
  //  */
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name || 'No Name Given'
    this.picture = data.picture || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
    this.bio = data.bio
    this.class = data.class
    this.coverImg = data.coverImg || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.email = data.email
    this.github = data.github
    this.graduated = data.graduated
    this.linkedin = data.linkedin
    this.resume = data.resume
  }
}
