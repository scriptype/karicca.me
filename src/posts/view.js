export function ContainerView(posts) {
  return posts.map(PostThumbnailView).join('\n\n')
}

export function PostThumbnailView(post) {
  switch (post.type) {
    case 'photo':
      const linkTag = post.tags.find(tag => tag.match('id:'))
      const linkedPostId = linkTag ? linkTag.replace('id:', '') : post.id
      const linkAttr = `data-linked-post="${linkedPostId}"`
      return `
        <figure class="post-item post-item--photo">
          <img class="post-item__media" src="${post.highResThumbnailUrl}" alt="${post.title}" />
          <figcaption>
            <a
              class="post-item__overlay post-item__title"
              href="${post.permalink}"
              ${linkAttr}
            >
              ${post.title}
            </a>
          </figcaption>
        </figure>
      `

    case 'text':
      return `
        <article class="post-item post-item--text">
          <header>
            <a class="post-item__overlay post-item__title" href="${post.permalink}">${post.title}</a>
          </header>
        </article>
      `
  }
}

export function LoadingIndicatorView() {
  return `
    <div class="loading-container">
      <span class="loading-indicator">Loading</span>
    </div>
  `
}
