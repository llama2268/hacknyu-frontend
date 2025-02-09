"use client";
import { title, subtitle } from "@/components/primitives";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // After validating credentials, navigate to the interface page
      router.push("/interface");
    };

    return (  
    <div className="min-h-screen flex items-center justify-center px-6 md:px-12 bg-gradient-to-r">
      <div className="w-full max-w-xl bg-white py-12 px-10 rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105">
        <h2 className={title({ class: "text-center text-4xl font-extrabold text-gray-800" })}>
          Welcome Back
        </h2>
        <p className={subtitle({ class: "mt-2 text-center text-lg text-gray-600" })}>
          Sign in to your account
        </p>

        <form onSubmit = {handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full px-5 py-4 text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 w-full px-5 py-4 text-lg text-white border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors placeholder-gray-400"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700 text-sm">Remember me</span>
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full py-4 text-lg font-semibold rounded-md bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">or continue with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <svg className="w-6 h-6" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.8 0 6.8 1.6 8.9 2.9l6.5-6.5C33.7 3.4 29.2 1 24 1 14.6 1 6.4 5.7 2.3 13.2l7.5 5.8C11.8 13.3 17.4 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.1 24.5c0-1.5-.1-2.6-.4-3.8H24v7.1h12.5c-.5 3-2.1 6-4.8 8l7.5 5.8C43.5 36 46.1 30.8 46.1 24.5z" />
              <path fill="#FBBC05" d="M10.8 28.6c-.7-2.1-1.1-4.3-1.1-6.6s.4-4.5 1.1-6.6L3.3 9.6C1.2 13.2 0 17.3 0 21.9s1.2 8.7 3.3 12.3l7.5-5.8z" />
              <path fill="#34A853" d="M24 47c6.2 0 11.4-2 15.2-5.4l-7.5-5.8c-2.1 1.4-4.8 2.3-7.7 2.3-5.8 0-10.7-3.9-12.5-9.2L3.3 38.2C7.3 43.8 14.3 47 24 47z" />
            </svg>
          </button>

          {/* Facebook Login Button */}
          <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M22.675 0H1.326C.593 0 0 .593 0 1.326v21.349C0 23.408.593 24 1.326 24H12.82V14.708H9.692v-3.533h3.129V8.259c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.793.143v3.241l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.31h3.586l-.467 3.533h-3.119V24h6.116c.733 0 1.326-.593 1.326-1.326V1.326C24 .593 23.408 0 22.675 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
