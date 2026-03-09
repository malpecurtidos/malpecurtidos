const preloadedImages = new Set<string>();

export function preloadImages(urls: Array<string | null | undefined>) {
  urls.forEach((url) => {
    if (!url || preloadedImages.has(url)) return;

    const img = new Image();
    img.decoding = "async";
    img.src = url;

    preloadedImages.add(url);
  });
}
