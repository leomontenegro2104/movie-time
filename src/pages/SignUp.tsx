import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/tmovie.png';
import Input from '../components/atoms/Input/Input';
import Button from '../components/atoms/Button/Button';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 px-4">
      <div className="mb-8 flex flex-col items-center">
        <img src={logo} alt="tMovies logo" className="w-16 mb-4" />
        <h1 className="text-3xl text-white font-bold">Sign Up</h1>
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
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
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
          Sign Up
        </Button>
      </form>
      <p className="mt-4 text-white">
        Already have an account?{' '}
        <Link to="/login" className="text-red-500 underline">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
