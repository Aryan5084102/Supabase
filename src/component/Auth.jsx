import React, { useState } from 'react';

const Auth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    // In a real app, you would validate credentials with an API here
    if (email && password) {
      setIsLoggedIn(true);
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {isLoggedIn ? (
        /* Sign Out / Dashboard View */
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-gray-100">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
          <p className="text-gray-500 mb-6">You are signed in as <span className="font-semibold text-gray-700">{email}</span></p>
          <button
            onClick={handleSignOut}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition duration-200 transform hover:scale-[1.02]"
          >
            Sign Out
          </button>
        </div>
      ) : (
        /* Sign In Form View */
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">Sign In</h1>
            <p className="text-gray-500 mt-2">Enter your details to access your account</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200 shadow-lg shadow-blue-200 transform hover:scale-[1.01]"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account? <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Sign up</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Auth;