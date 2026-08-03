import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import UpdateSuccess from '../../../components/updateSuccess/UpdateSuccess'

interface EditCampaignSuccessState {
  imageUrl: string
  name: string
}

function EditCampaignSuccess() {
  const location = useLocation()
  const navigate = useNavigate()
  const { campaignId } = useParams<{ campaignId: string }>()
  const state = location.state as EditCampaignSuccessState | null

  if (!state?.imageUrl || !state.name || !campaignId) {
    return <Navigate to="/mis-publicaciones" replace />
  }

  return (
    <UpdateSuccess
      imageUrl={state.imageUrl}
      name={state.name}
      onBack={() => navigate('/mis-publicaciones', { replace: true })}
      onViewDetails={() => navigate('/campanias')}
    />
  )
}

export default EditCampaignSuccess
