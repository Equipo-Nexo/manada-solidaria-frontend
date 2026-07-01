import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

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

const LoginPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  color: ${({ theme }) => theme.colors.text};
`

const Title = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 800;
  line-height: 1.2;
`

const PrimaryButton = styled.button`
  min-height: 44px;
  padding: 10px 22px;
  border: 0;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  transition: background 160ms ease, transform 160ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`

export default Login
