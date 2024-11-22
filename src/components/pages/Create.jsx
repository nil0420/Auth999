import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img from "../necessary/wp4016022.jpg"; // Make sure the image path is correct

const Create = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }
    setError('');

    // Save user data to localStorage
    const newUser = { username, email, password };
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isExistingUser = users.some((user) => user.email === email);

    if (isExistingUser) {
      setError('Email is already registered');
      return;
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    console.log('Account created:', newUser);
    alert('Account created successfully! You can now log in.');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      <div className="bg-black bg-opacity-75 shadow-xl rounded-lg flex flex-col md:flex-row w-full max-w-4xl">
        {/* Left Side */}
        <div className="md:w-1/2 text-white p-8 flex flex-col justify-center items-center border-r border-gray-700">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-red-600">
            Create an Account
          </h1>
          <p className="text-sm md:text-lg text-center text-gray-400">
            Join us and explore the benefits of being a part of our community.
          </p>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 p-6 sm:p-8 bg-gray-800 bg-opacity-90">
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-6 text-center">
            Register
          </h2>
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-600 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-600 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-600 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Create Account
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-red-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Create;
