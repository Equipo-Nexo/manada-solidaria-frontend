import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import UpdateSuccess from '@components/updateSuccess/UpdateSuccess'

interface EditSuccessState {
  imageUrl: string
  name: string
}

function EditAnimalPostSuccess() {
  const location = useLocation()
  const navigate = useNavigate()
  const { postId } = useParams<{ postId: string }>()
  const state = location.state as EditSuccessState | null

  if (!state?.imageUrl || !state.name || !postId) {
    return <Navigate to="/mis-publicaciones" replace />
  }

  return (
    <UpdateSuccess
      imageUrl={state.imageUrl}
      name={state.name}
      onBack={() => navigate('/mis-publicaciones', { replace: true })}
      onViewDetails={() => navigate('/animales')}
    />
  )
}

export default EditAnimalPostSuccess
