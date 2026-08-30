interface HandleShareProp {
    path: string
    text: string
}

export const shareUrl = async ({ path, text }: HandleShareProp) => {
    const url = `${window.location.origin}${path}`
    const shareData = {
        title: 'Manada Solidaria',
        text: text,
        url: url,
    }

    if (navigator.share) {
        try {
        await navigator.share(shareData)
        } catch (error) {
        console.error('Error al compartir:', error)
        }
    } else {
        // Fallback para navegadores que no soportan Web Share API
        console.log('here')
        await navigator.clipboard.writeText(url)
        alert('Enlace copiado al portapapeles')
    }
}