import { useGetAnimalPostsQuery } from '@animals/app/api/animalPostsApi'
import { Map } from '@components/index.ts'
import * as S from './AllPublicationsMap.styles'

function AllPublicationsMap() {

  const { data } = useGetAnimalPostsQuery({})
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
        <Map markPoints={points} enableMarkerOnClick={false} />
      </S.MapFrame>
    </S.Page>
  )
}

export default AllPublicationsMap
