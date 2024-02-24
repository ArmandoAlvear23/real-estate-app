import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {

  // Initialize state for form data
  const [formData, setFormData] = useState({});

  // Initialize state for errors
  const [error, setError] = useState(null);

  // Initialize state for is loading 
  const [isLoading, setIsLoading] = useState(false);

  // Initialize navigate
  const navigate = useNavigate();

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
      setIsLoading(true);
      // Send signup POST request to API endpoint
      const res = await fetch("/api/auth/signup", {
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
        // Set is loading state to false
        setIsLoading(false);
        // Set error state to response data error message
        setError(data.message);
        // Return out of try block
        return;
      }
      // Set is loading state to false
      setIsLoading(false);
      // Set error state to null
      setError(null);
      // Navigate to sign in page
      navigate("/sign-in");
    } catch (error) {
      // Set is loading state to false
      setIsLoading(false);
      // Set error state to error message
      setError(error.message);
    }
  };

  return (
    <section className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="username" 
          className="border p-3 rounded-lg" 
          id="username" 
          onChange={handleChange}
        />
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
          disabled={isLoading} 
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}><span className="text-blue-700">Sign in</span></Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </section>
  );
}