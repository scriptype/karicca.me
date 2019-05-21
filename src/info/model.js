export class InfoModel {
  constructor(info) {
    return {
      title: info.title,
      description: info.description,
      tumblrBlogUrl: info.url
    }
  }
}
