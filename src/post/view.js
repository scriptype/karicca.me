export function LoadingPostView() {
  return `
    <pre class="post-content post-content--loading">
      <span class="loading-indicator">Loading</span>
    </pre>
  `
}

export function PostView(post) {
  return `
    <div class="post-content">
      <button id="close-post-button" class="post-content__back-button" type="button">
        <span class="close-icon">Close</span>
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
        <a href="${post.highResThumbnailUrl}" target="_blank">
          <img src="${post.highResThumbnailUrl}" alt="${post.title}" />
        </a>
      `

    case 'text':
      return `
        ${post.body}
      `
  }
}
