import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/tmovie.png';
import Input from '../components/atoms/Input/Input';
import Button from '../components/atoms/Button/Button';

const LogIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <Button className="w-full">
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
