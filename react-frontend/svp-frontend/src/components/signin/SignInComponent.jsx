import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { signIn } from '../../services/SignIn';

const SignInComponent = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Email:', userEmail);
        console.log('Submitted Password:', userPassword);
        const signInData = { userEmail, userPassword };

        signIn(signInData).then((response) => {
            console.log(response.data);
            navigate('/dashboard');
            window.location.reload(); 
        }).catch(error => {
            console.error(error);
            setErrorMessage("Invalid credentials. Please try again.");
        });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
            <div className="card shadow p-4" style={{ minWidth: '400px' }}>
                <h3 className="text-center mb-4">Sign In</h3>

                {errorMessage && (
                    <div className="alert alert-danger">{errorMessage}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="userEmail" className="form-label">Email address</label>
                        <input
                            type="email"  // Corrected type
                            className="form-control"
                            id="userEmail"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="userPassword" className="form-label">Password</label>
                        <input
                            type="password"  // Corrected type
                            className="form-control"
                            id="userPassword"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInComponent;