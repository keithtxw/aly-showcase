/** Every picture in src/assets, as the (compressed WebP) URL the scenes use. */
const IMAGE_URLS = Object.values(
  import.meta.glob<string>('../assets/*.png', { query: { webp: '' }, import: 'default', eager: true }),
)

/**
 * Quietly downloads all the pictures, one at a time, shortly after the page has loaded. By the time a scene
 * appears its picture is already in the browser cache, so there's no waiting on a blank scene.
 */
export function preloadImages() {
  const queue = [...IMAGE_URLS]
  const loadNext = () => {
    const url = queue.shift()
    if (!url) return
    const img = new Image()
    img.onload = img.onerror = loadNext
    img.src = url
  }
  setTimeout(loadNext, 500)
}
