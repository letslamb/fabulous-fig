// capitalize each letter in a multi-word string
export function capitalizeEachLetter(phrase) {
  const words = phrase.split(" ")
  return words.map((word) => {
    return word[0].toUpperCase() + word.substring(1)
  }).join(" ")
}