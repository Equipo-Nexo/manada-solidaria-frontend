interface HandleShareProp {
  path: string
  text: string
  imageUrl: string
}

export const shareUrl = async ({
  path,
  text,
  imageUrl,
}: HandleShareProp) => {
  const url = `${window.location.origin}${path}`

  try {
    let files: File[] = []
    try {
    
        if (imageUrl) {
          const response = await fetch(`${imageUrl}?share=${Date.now()}`)
          const blob = await response.blob()
    
          const file = new File(
            [blob],
            'publicacion.jpg',
            { type: blob.type },
          )
    
          files = [file]
        }
    } catch (error) {
      console.error('Error al obtener la imagen para compartir:', error)
    }

    const shareData: ShareData = {
      title: 'Manada Solidaria',
      text,
      url,
      ...(files.length > 0 ? { files } : {}),
    }

    if (
      navigator.share &&
      (files.length === 0 || navigator.canShare?.({ files }))
    ) {
      await navigator.share(shareData)
    } else {
      await navigator.clipboard.writeText(url)
      alert('Enlace copiado al portapapeles')
    }
  } catch (error) {
    console.error('Error al compartir:', error)
  }
}