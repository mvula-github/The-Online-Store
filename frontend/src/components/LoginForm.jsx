/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        "https://your-backend-domain.com/api/login", // <-- Change to your backend URL
        { username, password }
      );
      const token = res.data.token;
      localStorage.setItem("jwt", token);
      onLogin(token);
      toast.success("Login successful!");
    } catch (err) {
      setError("Invalid username or password");
      toast.error("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl px-10 py-12 w-full max-w-md flex flex-col items-center animate-fade-in"
        aria-label="Login form"
      >
        <LockClosedIcon className="h-12 w-12 text-blue-500 mb-4" />
        <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">
          Sign in to your account
        </h2>
        <p className="mb-6 text-gray-500 dark:text-gray-400">
          Welcome back! Please enter your credentials.
        </p>
        <div className="w-full mb-4">
          <label
            className="block text-gray-700 dark:text-gray-200 text-sm font-semibold mb-1"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            className="shadow appearance-none border border-gray-300 dark:border-gray-700 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
            autoComplete="username"
          />
        </div>
        <div className="w-full mb-6">
          <label
            className="block text-gray-700 dark:text-gray-200 text-sm font-semibold mb-1"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            className="shadow appearance-none border border-gray-300 dark:border-gray-700 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        {error && (
          <div className="text-red-500 mb-4 w-full text-center">{error}</div>
        )}
        <button
          className="w-full flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          ) : null}
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
