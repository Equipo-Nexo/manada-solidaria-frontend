import { useNavigate } from 'react-router-dom'
import { LoginPanel, PrimaryButton, Title } from './Login.styles'

function Login() {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/home')
  }

  return (
    <LoginPanel>
      <Title>Login</Title>
      <PrimaryButton type="button" onClick={handleLogin}>
        {'Iniciar sesi\u00f3n'}
      </PrimaryButton>
    </LoginPanel>
  )
}

export default Login
