export function NavigationView(items) {
  return `
    <ul class="navigation">
      ${items.map(({ text, href }) => `
        <li><a href="${href}" target="_parent">${text}</a></li>
      `).join('')}
    </ul>
  `
}
