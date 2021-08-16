// Create aria-labelledby relationship with Section.svelte's first heading tag.
// The heading tag is dynamically generated based on number of levels nested within
// instances of Section.svelte, so we don't know which heading level it will be here
export function enhanceSection(node) {
  let sectionHeaderId = node.querySelector('h1, h2, h3, h4, h5, h6').id
  node.setAttribute('aria-labelledby', sectionHeaderId ? sectionHeaderId : null)
}