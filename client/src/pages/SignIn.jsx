import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice.js";

export default function SignIn() {

  // Initialize state for form data
  const [formData, setFormData] = useState({});

  const { loading, error } = useSelector((state) => state.user);

  // Initialize navigate
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Update form data state on input change
  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.id]: e.target.value,
    });
  };

  // Send form data to endpoint
  const handleSubmit = async (e) => {
    // Prevent page refresh on submit
    e.preventDefault();

    try {
      // Set is loading to true
      dispatch(signInStart());
      // Send signin POST request to API endpoint
      const res = await fetch("/api/auth/signin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // Get response JSON data
      const data = await res.json();
      // Check if request is unsuccessful
      if (data.success === false) {
        // Set loading to false and send error message
        dispatch(signInFailure(data.message));
        // Return out of try block
        return;
      }
      // Set loading to false, error to null, and send data
      dispatch(signInSuccess(data));
      // Navigate to the home page
      navigate("/");
    } catch (error) {
      // Set loading to false and send error message
      dispatch(signInFailure(error));
    }
  };

  return (
    <section className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="email" 
          placeholder="email" 
          className="border p-3 rounded-lg" 
          id="email" 
          onChange={handleChange}
        />
        <input 
          type="password" 
          placeholder="password" 
          className="border p-3 rounded-lg" 
          id="password" 
          onChange={handleChange}
        />
        <button 
          disabled={loading} 
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}><span className="text-blue-700">Sign up!</span></Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </section>
  );
}