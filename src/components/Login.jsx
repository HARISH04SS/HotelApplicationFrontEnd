import { useDispatch, useSelector } from 'react-redux';
import { selectEmail, selectPassword, setEmail, setPassword } from '../features/Residents/loginSlice';
import { useNavigate } from 'react-router-dom';
import authServices from '../services/authServices';

const Login = () => {
    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        const userData = { email, password };

        authServices.login(userData)
            .then(response => {
                localStorage.setItem('token', response.data.token); // Store the JWT
                navigate('/dashboard');
            })
            .catch(error => {
                console.error('Login failed:', error);
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card">
                        <div className="card-header">
                            <h2>Login</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => dispatch(setEmail(e.target.value))}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => dispatch(setPassword(e.target.value))}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
