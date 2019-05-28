export function LoadingPostView() {
  return `
    <pre class="post-content post-content--loading">
      Loading...
    </pre>
  `
}

export function PostView(post) {
  return `
    <div class="post-content">
      <button id="close-post-button" class="post-content__back-button" type="button">
        Back to home ↩
      </button>

      <h1 class="post-content__title">${post.title}</h1>

      ${ renderPostContent(post) }
    </div>
  `
}

function renderPostContent(post) {
  switch (post.type) {
    case 'photo':
      return `
        <img src="${post.highResThumbnailUrl}" alt="${post.title}" />
      `

    case 'text':
      return `
        ${post.body}
      `
  }
}
