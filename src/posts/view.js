export function ContainerView(posts) {
  return `
    <h2 class="posts-title">
      <a id="works" name="works">Latest Works</a>
    </h2>
    <div class="posts">
      ${posts.map(PostThumbnailView).join('\n\n')}
    </div>
  `
}

export function PostThumbnailView(post) {
  switch (post.type) {
    case 'photo':
      const linkedId = post.linkedPostId || post.id
      const linkAttr = `data-linked-post="${linkedId}"`
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
