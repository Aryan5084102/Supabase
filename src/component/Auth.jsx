import React, { useState } from 'react';
import { supabase } from '../supabase-client';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () =>{
    setIsSignIn(!isSignIn);
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();

    if(isSignIn){
       const {error} = await supabase.auth.signUp({email, password})
      if(error){
        console.error("Error signing up:", error.message);
      }
    }else{
      const {error} = await supabase.auth.signInWithPassword({email, password})
      if(error){
        console.error("Error signing in:", error.message);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">{isSignIn ? "Sign up" : "Sign in"}</h1>
            <p className="text-gray-500 mt-2">Enter your details to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              {isSignIn ? "Sign up" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account? <span onClick={handleSignIn} className="text-blue-600 font-semibold cursor-pointer hover:underline">{isSignIn ? "Sign in" : "Sign up"}</span>
          </p>
        </div>
    </div>
  );
};

export default Auth;