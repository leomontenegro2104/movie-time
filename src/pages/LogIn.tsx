import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/tmovie.png';
import Input from '../components/atoms/Input/Input';
import Button from '../components/atoms/Button/Button';

const LogIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem('token', 'fake-token');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 px-4">
      <div className="mb-8 flex flex-col items-center">
        <img src={logo} alt="tMovies logo" className="w-16 mb-4" />
        <h1 className="text-3xl text-white font-bold">Log In</h1>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="mb-6">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full">
          Log In
        </Button>
      </form>
      <p className="mt-4 text-white">
        Don't have an account?{' '}
        <Link to="/signup" className="text-red-500 underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LogIn;
