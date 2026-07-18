/**
 * Generate Google Maps embed URL for displaying location on a map
 * @param address - The address to display on the map
 * @param apiKey - Optional API key (defaults to NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
 * @returns URL string for iframe src
 */
export function getGoogleMapsEmbedUrl(
  address: string,
  apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
): string {
  if (!address || !apiKey) {
    return '';
  }

  return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(address)}`;
}

/**
 * Get Google Maps static image URL for displaying location thumbnail
 * @param address - The address to display
 * @param width - Image width (default 400)
 * @param height - Image height (default 300)
 * @param zoom - Map zoom level (default 15)
 * @param apiKey - Optional API key (defaults to NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
 * @returns URL string for img src
 */
export function getGoogleMapsStaticUrl(
  address: string,
  width: number = 400,
  height: number = 300,
  zoom: number = 15,
  apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
): string {
  if (!address || !apiKey) {
    return '';
  }

  return `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(address)}&zoom=${zoom}&size=${width}x${height}&key=${apiKey}&markers=color:red%7C${encodeURIComponent(address)}`;
}
