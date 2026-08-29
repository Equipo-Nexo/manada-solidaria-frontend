import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useController, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Advice, ErrorMessage, PhoneInputComponent } from '@/common/components'
import { ArrowLeft, Send, User } from '@/common/icons'
import { useToast } from '@/common/hooks/toast/useToast'
import type { EditPersonalDataRequest } from '@/users/app/api/requests/EditPersonalDataRequest'
import { useUpdateUserProfileMutation, useGetUserProfileQuery } from '@/users/app/api/usersApi'
import * as S from './PersonalData.styles'
import {
    personalDataSchema,
    type PersonalDataFormValues,
} from './personalDataSchema'
import useAuth from '@/common/hooks/auth/useAuth'



function PersonalData() {
    const navigate = useNavigate()
    const { userId } = useAuth();
    const { data: userData } = useGetUserProfileQuery(userId);

    const initialPersonalData: PersonalDataFormValues = {
        username: userData?.username ?? '',
        name: userData?.profile.name ?? '',
        lastname: userData?.profile.lastname ?? '',
        phoneNumber: userData?.profile.phoneNumber ?? { areaCode: '', number: '' },
        email: userData?.profile.email ?? '',
    }

    const toast = useToast()
    const [editUserPersonalData, { isLoading }] = useUpdateUserProfileMutation()

    const {
        formState: { errors, isDirty, isValid },
        control,
        handleSubmit,
        register,
        reset,
    } = useForm<PersonalDataFormValues>({
        defaultValues: initialPersonalData,
        mode: 'onChange',
        resolver: yupResolver(personalDataSchema),
    })


    const { field: areaCodeField, fieldState: areaCodeState } = useController({
        control,
        name: 'phoneNumber.areaCode',
    })
    const { field: phoneNumberField, fieldState: phoneNumberState } = useController({
        control,
        name: 'phoneNumber.number',
    })

    useEffect(() => {
        if (userData && !isDirty) {
            reset({
                username: userData.username,
                name: userData.profile.name ?? '',
                lastname: userData.profile.lastname ?? '',
                phoneNumber: userData.profile.phoneNumber ?? { areaCode: '', number: '' },
                email: userData.profile.email ?? '',
            })
        }
    }, [isDirty, reset, userData])

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
            phoneNumber: values.phoneNumber.areaCode && values.phoneNumber.number
                ? values.phoneNumber
                : null,
            profileImageURL: userData?.profile.profileImageURL ?? '',
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
                <S.DataPanel>
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
                </S.DataPanel>

                <S.DataPanel>
                    <S.Label>Número de teléfono</S.Label>
                    <PhoneInputComponent
                        areaCodeValue={areaCodeField.value}
                        phoneNumberValue={phoneNumberField.value}
                        areaCodePlaceholder=""
                        phoneNumberPlaceholder=""
                        onAreaCodeChange={areaCodeField.onChange}
                        onPhoneNumberChange={phoneNumberField.onChange}
                        onAreaCodeBlur={areaCodeField.onBlur}
                        onPhoneNumberBlur={phoneNumberField.onBlur}
                        areaCodeRef={areaCodeField.ref}
                        phoneNumberRef={phoneNumberField.ref}
                        error={areaCodeState.error?.message ?? phoneNumberState.error?.message}
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
                </S.DataPanel>
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
