export function cloudinaryUrl(publicId: string, w?: number) {
  const t = ['f_auto','q_auto:best', w ? `w_${w}` : null,'dpr_auto'].filter(Boolean).join(',')
  return `https://res.cloudinary.com/dv3mvukmq/image/upload/${t}/${publicId}`
}
export function cloudinaryVideo(publicId: string) {
  return `https://res.cloudinary.com/dv3mvukmq/video/upload/q_auto,f_auto/${publicId}`
}
