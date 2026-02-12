import { useState, FormEvent } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleLoginSubmit } from "../../utils/Handlerfunctions/formSubmitHandlers";
import { useNavigate } from "react-router-dom";
// import login from "../../../public/login_pageimg.png";

interface LoginErrors {
  contact?: string;
  password?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate(); 

  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    handleLoginSubmit({
      e,
      contact,
      password,
      setErrors,
      setLoading,
      navigate,
    });
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col lg:flex-row p-0">
          {/* FORM SECTION */}

          <div className="w-full lg:w-1/2 p-10">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Welcome Back</h2>
              <p className="text-sm text-gray-500">
                Login to continue to your dashboard
              </p>
            </div>

            <form onSubmit={onSubmit} noValidate>
              {/* CONTACT NUMBER */}
              <div className="mb-4">
                <label className="block font-semibold mb-1">
                  Contact Number
                </label>
                <input
                  type="text"
                  value={contact}
                  maxLength={10}
                  placeholder="Enter 10 digit contact number"
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 10) {
                      setContact(value);
                      setErrors((prev) => ({
                        ...prev,
                        contact: undefined,
                      }));
                    }
                  }}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#293C8F]
                    ${errors.contact ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.contact && (
                  <div className="text-red-500 mt-1 text-sm">
                    {errors.contact}
                  </div>
                )}
              </div>

              {/* PASSWORD */}
              <div className="mb-6 relative">
                <label className="block font-semibold mb-1">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      password: undefined,
                    }));
                  }}
                  className={`w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#293C8F]
                    ${errors.password ? "border-red-500" : "border-gray-300"}`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-9 right-3 text-gray-500 hover:text-[#293C8F]"
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </button>

                {errors.password && (
                  <div className="text-red-500 mt-1 text-sm">
                    {errors.password}
                  </div>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 text-white font-semibold rounded-md transition duration-200
                  ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#0c1d68] hover:bg-[#07175e]"
                  }`}
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>
          </div>

          {/* IMAGE SECTION */}
          <div className="hidden lg:flex w-1/2 items-center justify-center bg-[#000b3d]">
            <img
              src="./images/login_pageimg.png"
              alt="Login Illustration"
              className="p-6 w-full h-auto"
            />
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Login;
