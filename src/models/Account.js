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
    this.name = data.name
    this.picture = data.picture
    this.bio = data.bio
    this.class = data.class
    this.coverImg = data.coverImg
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.email = data.email
    this.github = data.github
    this.graduated = data.graduated
    this.linkedin = data.linkedin
    this.resume = data.resume
  }
}
