import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from '../firebase';
import { useDispatch } from "react-redux";
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            // Get Google auth provider
            const provider = new GoogleAuthProvider();
            // Get auth using app
            const auth = getAuth(app);
            // Invoke Google sign-in popup
            const result = await signInWithPopup(auth, provider);
            // Send request to app backend Google endpoint 
            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL }),
            });
            // Get response from Google endpoint
            const data = await res.json();
            // Dispatch sign-in success and send response data
            dispatch(signInSuccess(data));
            // Navigate to home page
            navigate("/");
        } catch (error) {
            // Console log error
            console.log("could not sign in with google", error);
        }
    }
    
  return (
    <button onClick={handleGoogleClick} type="button" className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95">Continue with Google</button>
  )
}
