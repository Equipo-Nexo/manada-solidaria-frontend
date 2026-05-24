import { useNavigate } from "react-router-dom";

function Login() {
    
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/home");
    }
    
    return (
        <div>
            <h1>Login</h1>
            <button 
                className="btn btn-primary"
                onClick={handleLogin}
            >
                Iniciar sesion
            </button>
        </div>
    )
}
export default Login;