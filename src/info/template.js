export function InfoTemplate(info) {
  return `
    <pre>${JSON.stringify(info, null, 2)}</pre>
  `
}
