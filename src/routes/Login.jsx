import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setIsError(false);
    
    try {
      const data = await loginUser(email, password);

      if (data.status === "mfa_required") {
        // Send the user to the OTP screen and pass along their user_id
        navigate('/otp', { state: { userId: data.user_id } });
      }

    } catch (error) {
      setIsError(true);
      if (error.response && error.response.status === 401) {
        setMessage("Invalid email or password.");
      } else {
        setMessage("Cannot connect to the server. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Group 5 Login</h2>

      {/* Using dynamic classes so your CSS file can style errors vs successes */}
      {message && (
        <div className={isError ? "message error" : "message success"}>
          {message}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            disabled={isLoading}
          />
        </div>

        <div className="input-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            disabled={isLoading}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Authenticating..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Login;