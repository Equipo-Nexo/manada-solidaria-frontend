import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Advice, ErrorMessage, PhoneInputComponent } from '@/common/components'
import { ArrowLeft, Send, User } from '@/common/icons'
import { useToast } from '@/common/hooks/toast/useToast'
import { personalDataMock } from '@/users/app/api/mocks/personalDataMock'
import type { EditPersonalDataRequest } from '@/users/app/api/requests/EditPersonalDataRequest'
import { useEditUserPersonalDataMutation, useGetUserProfileQuery } from '@/users/app/api/usersApi'
import * as S from './PersonalData.styles'
import {
    personalDataSchema,
    type PersonalDataFormValues,
} from './personalDataSchema'

const initialPersonalData: PersonalDataFormValues = {
    username: personalDataMock.username,
    name: personalDataMock.name ?? '',
    lastname: personalDataMock.lastname ?? '',
    phone: personalDataMock.phoneNumber,
    email: personalDataMock.email,
}

const initialPhoneNumber = personalDataMock.phoneNumber.slice(-7)

const initialAreaCode = personalDataMock.phoneNumber.slice(0, -7)

function PersonalData() {
    const navigate = useNavigate()
    const toast = useToast()
    const [editUserPersonalData, { isLoading }] = useEditUserPersonalDataMutation()
    const [areaCode, setAreaCode] = useState(initialAreaCode)
    const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber)
    const {
        formState: { errors, isDirty, isValid },
        handleSubmit,
        register,
        reset,
        setValue,
    } = useForm<PersonalDataFormValues>({
        defaultValues: initialPersonalData,
        mode: 'onChange',
        resolver: yupResolver(personalDataSchema),
    })

    const { data: userData } = useGetUserProfileQuery();

    const updatePhone = (nextAreaCode: string, nextPhoneNumber: string) => {
        setValue('phone', `${nextAreaCode}${nextPhoneNumber}`, {
            shouldDirty: true,
            shouldValidate: true,
        })
    }

    const handleAreaCodeChange = (value: string) => {
        setAreaCode(value)
        updatePhone(value, phoneNumber)
    }

    const handlePhoneNumberChange = (value: string) => {
        setPhoneNumber(value)
        updatePhone(areaCode, value)
    }

    const UserNameComponent = (username: string) => {
        return (
            <S.UsernameContainer>
                <S.UsernameIcon aria-hidden="true">
                    <User />
                </S.UsernameIcon>
                <S.UsernameContent>
                    <S.UsernameLabel>Nombre de usuario</S.UsernameLabel>
                    <S.Username>{username}</S.Username>
                </S.UsernameContent>
            </S.UsernameContainer>
        )
    }


    const handleEditPersonalData = async (values: PersonalDataFormValues) => {
        const request: EditPersonalDataRequest = {
            name: values.name?.trim() || undefined,
            lastname: values.lastname?.trim() || undefined,
            email: values.email.trim(),
            phoneNumber: values.phone?.trim() ?? '',
            profileImageURL: personalDataMock.profileImageURL,
        }
        try {
            await editUserPersonalData(request).unwrap()
            reset(values)
            toast.success(
                'Datos actualizados',
                'Tu información personal se guardó correctamente.',
            )
        } catch {
            toast.error(
                'No pudimos actualizar tus datos',
                'Revisá la información e intentá nuevamente.',
            )
        }
    }

    return (
        <S.MainContainer onSubmit={handleSubmit(handleEditPersonalData)} noValidate>
            <S.Header>
                <S.BackButton
                    type="button"
                    onClick={() => navigate(-1)}
                    aria-label="Volver"
                >
                    <ArrowLeft aria-hidden="true" />
                </S.BackButton>
                <S.TitlesContainer>
                    <S.PageTitle>Datos Personales</S.PageTitle>
                </S.TitlesContainer>
            </S.Header>
            {isDirty && (
                <S.AdviceWrapper>
                    <Advice
                        title="Cambios sin guardar"
                        advice="No olvides guardar tus cambios para conservarlos."
                    />
                </S.AdviceWrapper>
            )}

            <S.PersonalDataContainer>
                {UserNameComponent(userData?.username || "usuario")}
                <S.Label htmlFor="name">Nombre</S.Label>
                <S.Input
                    id="name"
                    aria-describedby={errors.name ? 'personal-name-error' : undefined}
                    aria-invalid={Boolean(errors.name)}
                    {...register('name')}
                />
                <ErrorMessage id="personal-name-error" message={errors.name?.message} />

                <S.Label htmlFor="lastname">Apellido</S.Label>
                <S.Input
                    id="lastname"
                    aria-describedby={errors.lastname ? 'personal-lastname-error' : undefined}
                    aria-invalid={Boolean(errors.lastname)}
                    {...register('lastname')}
                />
                <ErrorMessage id="personal-lastname-error" message={errors.lastname?.message} />

                <S.Label>Número de teléfono</S.Label>
                <PhoneInputComponent
                    areaCodeValue={areaCode}
                    phoneNumberValue={phoneNumber}
                    areaCodePlaceholder=""
                    phoneNumberPlaceholder=""
                    onAreaCodeChange={handleAreaCodeChange}
                    onPhoneNumberChange={handlePhoneNumberChange}
                    error={errors.phone?.message}
                />

                <S.Label htmlFor="email">
                    Email<S.Required> *</S.Required>
                </S.Label>
                <S.Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-describedby={errors.email ? 'personal-email-error' : undefined}
                    aria-invalid={Boolean(errors.email)}
                    {...register('email')}
                />
                <ErrorMessage id="personal-email-error" message={errors.email?.message} />

                <S.Label>Cambio de contraseña</S.Label>
                <S.ChangePasswordButton
                    type="button"
                    onClick={() => navigate('/mi-perfil/cambiar-contraseña')}
                >
                    Modificar contraseña
                </S.ChangePasswordButton>
            </S.PersonalDataContainer>
            <S.SubmitButton
                type="submit"
                disabled={!isDirty || !isValid || isLoading}
            >
                {isLoading ? 'Guardando...' : 'Guardar cambios'}
                <Send aria-hidden="true" />
            </S.SubmitButton>
        </S.MainContainer>
    )
}

export default PersonalData
