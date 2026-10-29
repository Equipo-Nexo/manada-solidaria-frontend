import { Search } from '@/common/icons';
import { ErrorMessage, Map } from '@components/index.ts'
import * as S from './AutocompleteGeolocation.styles'
import { useGetGeolocationReverseQuery, useGetGeolocationsQuery } from '@/common/app/services/apis/geolocationApi';
import { useEffect, useRef, useState } from 'react';
import type { GeolocationResponse, Location } from '@/common/app/services/responses/Location';
import type { MapPoint } from '../map/Map';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGeolocation } from '@/common/hooks/geolocation/useGeolocation';
import { getLocationErrorMessage } from '@/common/utils/LocationUtils';
import type { FieldErrors } from 'react-hook-form';

const EMPTY_DIRECTION = "";

interface AutocompleteGeolocationProps {
    placeHolder?: string
    initialLocation?: Location;
    onChange?: (value: GeolocationResponse | null) => void;
    errors?: FieldErrors<Location>;
}

function AutocompleteGeolocation({
    placeHolder,
    initialLocation,
    onChange,
    errors
}: AutocompleteGeolocationProps) {

    const { coordinates, requestCoordinates } = useGeolocation()
    const [direction, setDirection] = useState(
        initialLocation?.street ?? initialLocation?.city ?? EMPTY_DIRECTION
    )
    const [debouncedDirection, setDebouncedDirection] = useState(EMPTY_DIRECTION)
    const [selectedLocation, setSelectedLocation] = useState<GeolocationResponse | null>(null)
    const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null)
    const [isInputFocused, setInputIsFocused] = useState(false)
    const onChangeRef = useRef(onChange)
    const initialDirection = initialLocation
        ? `${initialLocation.street} ${initialLocation.houseNumber}, ${initialLocation.city}`
        : EMPTY_DIRECTION

    useEffect(() => {
        onChangeRef.current = onChange
    }, [onChange])

    useEffect(() => {
     void requestCoordinates()
    }, [requestCoordinates])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedDirection(direction)
        }, 500)

        return () => clearTimeout(timeout)
    }, [direction])
    
    const { data: locations = [], isFetching } = useGetGeolocationsQuery(
        { text: debouncedDirection, latitude: coordinates?.latitude, longitude: coordinates?.longitude  },
        {
            skip:
            debouncedDirection.length < 3 ||
            selectedLocation !== null ||
            selectedPoint !== null,
        }
    )

    const { currentData: reverseLocation } = useGetGeolocationReverseQuery(
        selectedPoint
            ? {
                latitude: selectedPoint.lat,
                longitude: selectedPoint.lng,
            }
            : skipToken
    )

    const effectiveLocation = selectedPoint ? reverseLocation ?? null : selectedLocation
    const displayedDirection = effectiveLocation?.formatted ?? (direction || initialDirection)

    useEffect(() => {
        if (effectiveLocation) onChangeRef.current?.(effectiveLocation)
    }, [effectiveLocation])

    const handleSelectLocation = (location: GeolocationResponse) => {
        setSelectedPoint(null)
        setSelectedLocation(location)
        setDirection(location.formatted)
    }

    const handleSelectPoint = (point: MapPoint) => {
        setSelectedLocation(null)
        setSelectedPoint(point)
    }

    return (
        <S.MainContainer>
            <S.InputContainer>
                <S.IconInputWrapper>
                    <Search aria-hidden="true" />
                    <S.AutocompleteContainer>
                            <S.Input
                                value={displayedDirection}
                                onChange={(event) => {
                                    setDirection(event.target.value)
                                    setSelectedLocation(null)
                                    setSelectedPoint(null)
                                    onChange?.(null)
                                }}
                                onFocus={() => setInputIsFocused(true)}
                                onBlur={() => {
                                    setTimeout(() => setInputIsFocused(false), 150)
                                }}
                                placeholder={placeHolder}
                            />


                        {isFetching && (
                            <S.AutocompleteDropdown>
                                <S.AutocompleteMessage>
                                    Buscando direcciones...
                                </S.AutocompleteMessage>
                            </S.AutocompleteDropdown>
                        )}

                        {isInputFocused && !isFetching && locations.length > 0 && !selectedLocation && (
                            <S.AutocompleteDropdown>
                                {locations.map((location) => (
                                    <S.AutocompleteItem
                                        key={location.formatted}
                                        type="button"
                                        onMouseDown={(event) => event.preventDefault()}
                                        onClick={() => handleSelectLocation(location)}
                                    >
                                        {location.formatted}
                                    </S.AutocompleteItem>
                                ))}
                            </S.AutocompleteDropdown>
                        )}
                    </S.AutocompleteContainer>
                </S.IconInputWrapper>
                <ErrorMessage id={'location'} message={getLocationErrorMessage(errors)} />
            </S.InputContainer>
            <S.MapContainer>
                <S.MapWrapper >
                    <Map 
                        onPointSelect={handleSelectPoint}
                        markPoint={selectedPoint ?? (effectiveLocation
                            ? { lng: effectiveLocation.lon, lat: effectiveLocation.lat }
                            : initialLocation?.latitude != null && initialLocation.longitude != null
                                ? { lat: initialLocation.latitude, lng: initialLocation.longitude }
                                : null)}
                    />
                </S.MapWrapper>
                <S.Suggestion>
                    Buscá una dirección o tocá el mapa para marcar la zona aproximada. Evitá
                    compartir tu dirección exacta.
                </S.Suggestion>
            </S.MapContainer>
        </S.MainContainer>
    )
}

export default AutocompleteGeolocation;
