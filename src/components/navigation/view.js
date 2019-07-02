export function NavigationView(items) {
  return `
    <nav class="navigation-container" id="navigation-container">
      <button
        type="button"
        class="navigation__btn navigation__open-btn"
        id="open-navigation-btn"
      >
        <svg class="navigation__svg" version="1.1" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="currentColor" id="Hamburger"><path d="M0,2 L25,2 L25,6 L0,6 L0,2 Z M0,10 L25,10 L25,14 L0,14 L0,10 Z M0,18 L25,18 L25,22 L0,22 L0,18 Z"/></g></svg>
      </button>
      <button
        type="button"
        class="navigation__btn navigation__close-btn"
        id="close-navigation-btn"
      >
        <span class="close-icon"></span>
      </button>
      <ul class="navigation">
        ${items.map(({ text, href, id }) => `
          <li class="navigation__item">
            ${href ? (
              `<a href="${href}" target="_parent">${text}</a>`
            ) : (
              `<a href="#" id="${id}">${text}</a>`
            )}
          </li>
        `).join('')}
      </ul>
    </nav>

  `
}
