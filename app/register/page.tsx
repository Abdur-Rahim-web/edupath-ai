'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [agree, setAgree] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError('');
    setSuccess('');
  };

  const validate = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return 'All fields are required.';
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email.';
    }

    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters.';
    }

    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match.';
    }

    if (!agree) {
      return 'Please accept the Terms & Conditions.';
    }

    return null;
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Registration failed.'
        );
      }

      setSuccess(
        'Registration successful! Redirecting...'
      );

      setTimeout(() => {
        router.push('/login?registered=true');
      }, 1500);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    window.location.href = '/api/auth/google';
  };

  const getPasswordStrength = () => {
    if (formData.password.length < 6)
      return {
        text: 'Weak',
        color: 'bg-red-500',
      };

    if (formData.password.length < 10)
      return {
        text: 'Medium',
        color: 'bg-yellow-500',
      };

    return {
      text: 'Strong',
      color: 'bg-green-500',
    };
  };

  const strength = getPasswordStrength();
  return (
  <div className="min-h-[80vh] bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 rounded-3xl m-4 sm:m-8 border border-slate-200/60 shadow-sm">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
        Create your account
      </h2>

      <p className="mt-2 text-center text-sm text-slate-600">
        Join EduPath AI and start learning today.
      </p>
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/40 sm:rounded-2xl sm:px-10 border border-slate-100">

        {/* Google Register */}

        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 rounded-xl shadow-sm text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-all hover:shadow-md"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>

          Continue with Google
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-500 font-semibold tracking-wider">
              Or register with email
            </span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm border border-green-200">
              {success}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="text-xs mt-2 text-indigo-600 hover:underline"
            >
              {showPassword
                ? "Hide Password"
                : "Show Password"}
            </button>

            <div className="mt-3">
              <div className="w-full bg-slate-200 rounded-full h-2">

                <div
                  className={`h-2 rounded-full ${strength.color}`}
                  style={{
                    width:
                      strength.text === "Weak"
                        ? "33%"
                        : strength.text === "Medium"
                        ? "66%"
                        : "100%",
                  }}
                />
              </div>

              <p className="text-xs mt-1 text-slate-500">
                Password Strength:
                <span className="font-semibold">
                  {" "}
                  {strength.text}
                </span>
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Confirm Password
            </label>

            <input
              name="confirmPassword"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="text-xs mt-2 text-indigo-600 hover:underline"
            >
              {showConfirmPassword
                ? "Hide Password"
                : "Show Password"}
            </button>
          </div>

          <div className="flex items-start gap-2">

            <input
              type="checkbox"
              checked={agree}
              onChange={(e) =>
                setAgree(e.target.checked)
              }
              className="mt-1"
            />

            <p className="text-sm text-slate-600">
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-indigo-600 hover:underline"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-indigo-600 hover:underline"
              >
                Privacy Policy
              </Link>
            </p>

          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition"
          >
            {isLoading
              ? "Creating account..."
              : "Create Account"}
          </button>

        </form>

        <div className="mt-6 border-t pt-5 text-center">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-indigo-600 font-semibold hover:text-indigo-500"
            >
              Sign in here
            </Link>
          </p>
        </div>

      </div>
    </div>
  </div>
  );
}