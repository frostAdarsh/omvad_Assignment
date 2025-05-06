import React, { useState } from "react";
import { DatabaseZap } from "lucide-react";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signup } from "../lib/api";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Account created successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Signup failed");
    },
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    mutate(signupData);
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

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Create an Account</h2>
              <p className="text-sm text-gray-500">
                Find data from any URL in seconds
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
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
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
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-400/40 hover:bg-green-400 text-white font-semibold py-2 rounded-lg transition cursor-pointer"
            >
              {isPending ? "Creating Account..." : "Create Account"}
            </button>
            <div className="text-center mt-4">
              <p className="text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-green-400 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center ">
          <div className="max-w-sm p-8">
            <img src="/pic1.svg" alt="Illustration" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
