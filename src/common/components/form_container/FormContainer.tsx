import { Arrow, Publish } from '@/common/icons'
import * as S from './FormContainer.styles'
import { useNavigate } from 'react-router-dom'
import type { ReactNode, SubmitEventHandler } from 'react'

interface FormContainerProps {
    pageTitle: string
    buttonText: string
    isLoadingForm: boolean
    loadingButtonText: string
    handleSubmit: SubmitEventHandler<HTMLFormElement>
    children: ReactNode
}

export default function FormContainer ({
    pageTitle,
    buttonText,
    isLoadingForm,
    loadingButtonText,
    handleSubmit,
    children,
}: FormContainerProps) {

    const navigate = useNavigate()

    return (
        <S.Container>
            <S.Header>
               <S.BackButton type="button" onClick={() => navigate(-1)} aria-label="Volver">
                 <Arrow aria-hidden="true" />
               </S.BackButton>
               <S.PageTitle>{pageTitle}</S.PageTitle>

            </S.Header>
            <S.FormContainer
                onSubmit={handleSubmit}
                aria-busy={isLoadingForm}
                noValidate
            >
                {children}
                <S.SubmitButton type="submit" disabled={isLoadingForm}>
                    {isLoadingForm ? loadingButtonText : buttonText}
                    <Publish aria-hidden="true" />
                </S.SubmitButton>                
            </S.FormContainer>
        </S.Container>        
    )
} 
