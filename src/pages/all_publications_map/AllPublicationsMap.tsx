import Map from '../../components/map/Map'
import * as S from './AllPublicationsMap.styles'

const DEFAULT_POINT = [{ lng: -63.2435, lat: -32.4106 }]

function AllPublicationsMap() {


  return (
    <S.Page>
      <S.Header>
        <h1>Mapa</h1>
      </S.Header>
      <S.MapFrame>
        <Map markPoints={DEFAULT_POINT}/>
      </S.MapFrame>
    </S.Page>
  )
}

export default AllPublicationsMap
