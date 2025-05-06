import React, { useState } from "react";
import { DatabaseZap } from "lucide-react";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { login } from "../lib/api";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Login successful!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Login failed");
    },
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    mutate(loginData);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="border border-gray-200 bg-white flex flex-col lg:flex-row w-full max-w-5xl mx-auto rounded-2xl shadow-md overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
          <div className="mb-6 flex items-center justify-center gap-2">
            <DatabaseZap className="size-8 text-green-400/40" />
            <span className="text-2xl font-bold">URL Scraperr</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Sign In</h2>
              <p className="text-sm text-gray-500">
                Access your bookmarks instantly
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="you@example.com"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-400/40 hover:bg-green-400 text-white font-semibold py-2 rounded-lg transition cursor-pointer"
            >
              {isPending ? "Logging in..." : "Login"}
            </button>

            <div className="text-center mt-4">
              <p className="text-sm">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-green-400 hover:underline">
                  Create one
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center">
          <div className="max-w-sm p-8">
            <img src="/pic1.svg" alt="Illustration" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
