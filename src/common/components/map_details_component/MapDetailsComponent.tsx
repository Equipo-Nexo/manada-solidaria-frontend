import { OpenMap } from '@/common/icons'
import * as S from './MapDetailsComponent.styles'
import { useNavigate } from 'react-router-dom'

interface MapProps {
    location: string,
    address: string,
    locationPath: string
}

function MapDetailsComponent({
    location,
    address,
    locationPath
}: MapProps) {

    const navigate = useNavigate();

    return (
        <S.LocationCard>
            <S.MapPreview aria-hidden="true"><S.MapMarker /></S.MapPreview>
            <S.LocationContent>
                <S.LocationTitle>{location}</S.LocationTitle>
                <S.LocationAddress>{address}</S.LocationAddress>
                <S.MapLink
                    type="button"
                    onClick={() => navigate(locationPath)}
                >
                    Ver en el mapa <OpenMap aria-hidden="true" />
                </S.MapLink>
            </S.LocationContent>
        </S.LocationCard>
    )
}

export default MapDetailsComponent;