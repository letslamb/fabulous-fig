// capitalize each letter in a multi-word string
export function capitalizeEachLetter(phrase) {
  const words = phrase.split(" ")
  return words.map((word) => {
    return word[0].toUpperCase() + word.substring(1)
  }).join(" ")
}

export function linkResolver(doc) {
	if (doc.type === 'menu_layout') {
    return '/menu/' + doc.uid + '/'
  }

	return '/';
}

// navLinks = linkSlice.items.map(item => {
//   if (item.nav_link.type === "homepage") {
//     return { href: '/', text: 'Home'}
//   } else if (item.nav_link.type === "menu_layout") {
//     return { href: `/menu/${item.nav_link.uid}`, text: `${capitalizeEachLetter(item.nav_link.uid)} Menu`}
//   }
// })