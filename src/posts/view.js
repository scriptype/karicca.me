export function ContainerView(posts) {
  return `
    <h2 class="heading-1 posts-title">
      <a id="works-title" name="works-title">
        ${posts.length ? 'Latest Works' : LoadingIndicatorView()}
      </a>
    </h2>
    <div class="posts" id="posts">
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
              class="heading-1 post-item__overlay post-item__title"
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
            <a
              class="heading-1 post-item__overlay post-item__title"
              href="${post.permalink}"
            >
              ${post.title}
            </a>
          </header>
        </article>
      `
  }
}

export function LoadingIndicatorView() {
  return `
    <div class="after-posts-block loading-container">
      <span class="loading-indicator">Loading</span>
    </div>
  `
}

export function ReachedEndView() {
  return `
    <div class="after-posts-block reached-end-container">
      <a href="#" class="reached-end">Back to top</a>
    </div>
  `
}
