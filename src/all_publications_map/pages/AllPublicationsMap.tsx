import { useGetAnimalPostsQuery } from '@animals/app/api/animalPostsApi'
import { Map } from '@components/index.ts'
import * as S from './AllPublicationsMap.styles'
import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'

function AllPublicationsMap() {

  const { data } = useGetAnimalPostsQuery({})

  const [searchParams] = useSearchParams()

  const point = useMemo(() => {
    const latitude = searchParams.get('latitude')
    const longitude = searchParams.get('longitude')

    if (!latitude || !longitude) {
      return undefined
    }

    return {
      lat: Number(latitude),
      lng: Number(longitude),
    }
  }, [searchParams])
  
  const points = data && data.content.map((animalPost) => {
    if (animalPost.location.latitude && animalPost.location.longitude) {
      return {
          lat: animalPost.location.latitude, 
          lng: animalPost.location.longitude 
      }
    }
  }).filter((points) => points != undefined)

  return (
    <S.Page>
      <S.Header>
        <h1>Mapa</h1>
      </S.Header>
      <S.MapFrame>
        <Map markPoints={points} enableMarkerOnClick={false} center={point}  />
      </S.MapFrame>
    </S.Page>
  )
}

export default AllPublicationsMap
