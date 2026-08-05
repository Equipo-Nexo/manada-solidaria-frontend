import { useGetAnimalPostsQuery } from '@services/apis/animalPostsApi'
import Map from '@components/map/Map'
import * as S from './AllPublicationsMap.styles'

function AllPublicationsMap() {

  const { data } = useGetAnimalPostsQuery({})
  const points = data && data.content.map((animalPost) => ({ 
    lat: animalPost.location.latitude, 
    lng: animalPost.location.longitude 
  }))

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
