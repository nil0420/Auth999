import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../necessary/sr2kC0.jpg"; // Ensure the path to the image is correct

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    setError("");
    alert(`Welcome !`);
    localStorage.setItem("loggedInUserEmail", user.email); // Save the logged-in user's email
    navigate("/home");
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
            Welcome !
          </h1>
          <p className="text-sm md:text-lg text-center text-gray-400">
            Connect with your favorite shows and movies instantly.
          </p>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 p-6 sm:p-8 bg-gray-800 bg-opacity-90">
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-6 text-center">
            Sign In
          </h2>
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}
          <form onSubmit={handleSubmit}>
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
              Sign In
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-400">
            New to Netflix?{" "}
            <a href="/" className="text-red-600 hover:underline">
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
