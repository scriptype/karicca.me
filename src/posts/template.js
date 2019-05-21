export function ContainerTemplate(posts) {
  return posts.map(PostTemplate).join('\n\n')
}

export function PostTemplate(post) {
  switch (post.type) {
    case 'photo':
      return `
        <figure class="post-item post-item--photo">
          <img class="post-item__media" src="${post.highResThumbnailUrl}" alt="${post.title}" />
          <figcaption>
            <a class="post-item__overlay post-item__title" href="${post.permalink}">${post.title}</a>
          </figcaption>
        </figure>
      `
  }
}

export function LoadingIndicatorTemplate() {
  return `
    <div class="loading-container">
      <span class="loading-indicator">Loading</span>
    </div>
  `
}
