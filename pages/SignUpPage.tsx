// pages/SignUpPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Updated imports for v6
import { SpiketuneLogo } from '../components/SpiketuneLogo';
import GoogleLogo from '../components/icons/GoogleLogo';
import FacebookLogo from '../components/icons/FacebookLogo';
import AppleLogo from '../components/icons/AppleLogo';
import { useApp } from '../context/AppContext';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signupUser, addNotification } = useApp();
  const navigate = useNavigate(); // Changed from useHistory

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please create a password.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await signupUser(email, password);
      if (result.success) {
        navigate('/'); // Changed to navigate
      } else {
        setError(result.message || 'Signup failed. Please try again.');
      }
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
      addNotification({ message: err.message || 'Signup error.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 select-none">
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-center sm:justify-start">
         <Link to="/" aria-label="Home">
          <SpiketuneLogo className="h-10 w-auto" />
        </Link>
      </header>

      <main className="w-full max-w-md space-y-8 mt-16 sm:mt-20">
        <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-8">Sign up free to start listening.</h1>
        </div>

        {error && (
          <div className="p-3 bg-red-600/30 border border-red-500 text-red-300 rounded-md text-sm mb-4" role="alert">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">
              What's your email address?
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md placeholder-neutral-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="name@domain.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-1">
              Create a password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md placeholder-neutral-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Create a password (min. 8 characters)"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-300 mb-1">
              Confirm your password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md placeholder-neutral-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Confirm your password"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-4 rounded-full transition-colors duration-150 text-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-neutral-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black text-neutral-400">or</span>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-center px-4 py-3 bg-neutral-700 hover:bg-neutral-600 rounded-full text-sm font-medium text-white transition-colors">
            <GoogleLogo className="w-5 h-5 mr-3" />
            Sign up with Google
          </button>
          <button className="w-full flex items-center justify-center px-4 py-3 bg-neutral-700 hover:bg-neutral-600 rounded-full text-sm font-medium text-white transition-colors">
            <FacebookLogo className="w-5 h-5 mr-3" />
            Sign up with Facebook
          </button>
          <button className="w-full flex items-center justify-center px-4 py-3 bg-neutral-700 hover:bg-neutral-600 rounded-full text-sm font-medium text-white transition-colors">
            <AppleLogo className="w-5 h-5 mr-3" />
            Sign up with Apple
          </button>
        </div>

        <hr className="border-neutral-700 my-8" />

        <p className="text-center text-sm text-neutral-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-green-400 hover:text-green-300">
            Log in here.
          </Link>
        </p>
      </main>
       <footer className="py-6 text-center text-xs text-neutral-500">
         © {new Date().getFullYear()} SPIKETUNE AB
      </footer>
    </div>
  );
};

export default SignUpPage;