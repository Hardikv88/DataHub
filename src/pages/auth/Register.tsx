import React, { useState } from 'react';
import { Checkbox, Typography } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Colors } from '../../theme/colors';
import './auth.css';

const { Title, Text } = Typography;

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <div className="auth-inner">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <Title level={2} style={{ color: Colors.heading, marginBottom: 8, fontWeight: 800 }}>Create an Account</Title>
            <Text style={{ color: Colors.text, fontSize: 16 }}>Create an account to continue</Text>
          </div>

          <form onSubmit={handleRegister}>
            <Input 
              label="Full Name" 
              name="fullName"
              placeholder="Esteban Schiller" 
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
            />

            <Input 
              label="Email address" 
              name="email"
              placeholder="esteban_schiller@gmail.com" 
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            
            <Input 
              label="Password"
              name="password" 
              placeholder="••••••••" 
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
            />

            <Input 
              label="Confirm Password" 
              name="confirmPassword"
              placeholder="••••••••" 
              type="password"
              required
              validationError={error}
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{ marginBottom: 24 }}
            />

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
              <Checkbox required style={{ color: Colors.text }}>
                I accept terms and conditions
              </Checkbox>
            </div>

            <Button fullWidth htmlType="submit" loading={loading} style={{ marginBottom: 24 }}>
              Sign Up
            </Button>

            <div style={{ textAlign: 'center' }}>
              <Text style={{ color: Colors.text }}>Already have an account? </Text>
              <Link to="/login" style={{ color: Colors.primary, fontWeight: 600 }}>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
