import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import sign from "../../assets/images/sign.png";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  interface ResponseData {
    message?: string;
    [key: string]: any;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data: ResponseData = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      console.log("Login Successful:", data);
      alert("Login Successful!");
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data));
      setError(data.message || "");

      navigate("/profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-14 px-4">
      <div className="flex flex-col md:flex-row items-center md:gap-28 gap-10">
        <img 
          src={sign} 
          alt="sign" 
          className="w-2/3 max-w-xs md:w-auto" 
        />
        <div className="w-full max-w-sm">
          <h2 className="text-3xl md:text-4xl font-semibold mb-2 text-center md:text-left">
            Log in to Exclusive
          </h2>
          <p className="text-gray-600 mb-10 mt-3 text-center md:text-left">
            Enter your details below
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border-b border-gray-300 focus:border-black outline-none py-2 text-sm md:text-base"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border-b border-gray-300 focus:border-black outline-none py-2 text-sm md:text-base"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                className="bg-red-600 w-full md:w-[143px] text-white font-semibold py-3 hover:bg-red-700 transition"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
              <p className="text-red-500 text-sm cursor-pointer hover:underline text-center md:text-left">
                Forgot password?
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default SignUp;
