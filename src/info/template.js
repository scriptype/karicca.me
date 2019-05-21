export function InfoTemplate(info) {
  return `
    <h1 class="info__title">
      <a href="/">${info.title}</a>
    </h1>
    <p class="info__description">${info.description}</p>
  `
}
