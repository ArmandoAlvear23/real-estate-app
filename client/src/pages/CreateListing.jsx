import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";

export default function CreateListing() {
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: "",
        description: "",
        address: "",
        type: "rent",
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 5,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    });
    console.log(formData);

    const handleImageUpload = () => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            if (imageUploadError !== false) setImageUploadError(false);
            setUploading(true);
            const promises = [];
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({ 
                    ...formData, 
                    imageUrls: formData.imageUrls.concat(urls) 
                });
                setUploading(false);
                handleInputFileReset();
                if (submitError === "You must upload at least 1 image") {
                    setSubmitError(false);
                }
            }).catch((err) => {
                setImageUploadError("Image upload failed (2mb max per image)");
                setUploading(false);
            });
        } else {
            setImageUploadError("You can only upload up to 6 images per listing");
        }
    }
    
    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = 
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    }

    const inputFile = useRef(null);

    const handleInputFileReset = () => {
        if(inputFile.current) {
            inputFile.current.value = "";
        }
    }

    const handleDeleteImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    }

    const handleChange = (e) => {
        if (e.target.id === "sale" || e.target.id === "rent") {
            setFormData({
                ...formData,
                type: e.target.id,
            })
        } else if (e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer") {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked,
            });
        } else if (e.target.type === "number") {
            setFormData({
                ...formData,
                [e.target.id]: parseInt(e.target.value),
            });
        } else {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (+formData.regularPrice < +formData.discountPrice) return setSubmitError("Discount price must be lower than regular price");
        if (formData.imageUrls.length < 1) return setSubmitError("You must upload at least 1 image");
        try {
            setLoading(true);
            setSubmitError(false);
            const res = await fetch("/api/listing/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setSubmitError(data.message);
            }
            navigate(`/listing/${data._id}`);
        } catch (error) {
            setSubmitError(error.message);
            setLoading(false);
        }
    }

  return (
    <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">
            Create a Listing
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-4 flex-1">
                <input 
                    type="text"
                    placeholder="Name"
                    className="border p-3 rounded-lg"
                    id="name"
                    maxLength="62"
                    minLength="5"
                    required 
                    onChange={handleChange}
                    value={formData.name} 
                />
                <textarea 
                    type="text"
                    placeholder="Description"
                    className="border p-3 rounded-lg"
                    id="description"
                    required 
                    onChange={handleChange}
                    value={formData.description} 
                >
                </textarea>
                <input 
                    type="text"
                    placeholder="Address"
                    className="border p-3 rounded-lg"
                    id="address"
                    required 
                    onChange={handleChange}
                    value={formData.address} 
                />
                <div className="flex gap-6 flex-wrap">
                    <div className="flex gap-2">
                        <input 
                            type="checkbox" 
                            id="sale" 
                            className="w-5" 
                            onChange={handleChange} 
                            checked={formData.type === "sale"} 
                        />
                        <span>Sell</span>
                    </div>
                    <div className="flex gap-2">
                        <input 
                            type="checkbox" 
                            id="rent" 
                            className="w-5" 
                            onChange={handleChange} 
                            checked={formData.type === "rent"} 
                        />
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input 
                            type="checkbox" 
                            id="parking" 
                            className="w-5" 
                            onChange={handleChange} 
                            checked={formData.parking}     
                        />
                        <span>Parking spot</span>
                    </div>
                    <div className="flex gap-2">
                        <input 
                            type="checkbox" 
                            id="furnished" 
                            className="w-5" 
                            onChange={handleChange} 
                            checked={formData.furnished}  
                        />
                        <span>Furnished</span>
                    </div>
                    <div className="flex gap-2">
                        <input 
                            type="checkbox" 
                            id="offer" 
                            className="w-5" 
                            onChange={handleChange} 
                            checked={formData.offer}  
                        />
                        <span>Offer</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                        <input 
                            type="number" 
                            id="bedrooms" 
                            className="p-3 border border-gray-300 rounded-lg"
                            min="1" 
                            max="10" 
                            required 
                            onChange={handleChange}
                            value={formData.bedrooms} 
                        />
                        <p>Bedrooms</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input 
                            type="number" 
                            id="bathrooms" 
                            className="p-3 border border-gray-300 rounded-lg"
                            min="1" 
                            max="10" 
                            required 
                            onChange={handleChange}
                            value={formData.bathrooms} 
                        />
                        <p>Bathrooms</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input 
                            type="number" 
                            id="regularPrice" 
                            className="p-3 border border-gray-300 rounded-lg"
                            min="5"
                            max="100000000"
                            required
                            onChange={handleChange}
                            value={formData.regularPrice}  
                        />
                        <div className="flex flex-col item-center">
                            <p>Regular price</p>
                            {formData.type === "rent" && (<span>($ / month)</span>)}
                        </div>
                    </div>
                    {formData.offer && (
                        <div className="flex items-center gap-2">
                        <input 
                            type="number" 
                            id="discountPrice" 
                            className="p-3 border border-gray-300 rounded-lg"
                            min="0"
                            max="100000000"
                            required 
                            onChange={handleChange}
                            value={formData.discountPrice} 
                        />
                        <div className="flex flex-col item-center">
                            <p>Discounted price</p>
                            {formData.type === "rent" && (<span>($ / month)</span>)}
                        </div>
                    </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-4 flex-1">
                <p className="font-semibold">Images: <span className="font-normal text-gray-600 ml-2">The first image will be the cover (max 6)</span></p>
                <div className="flex gap-4">
                    <input 
                        type="file" 
                        id="images" 
                        ref={inputFile}
                        className="p-3 border border-gray-300 rounded w-full" 
                        onChange={(e) => setFiles(e.target.files)}
                        accept="image/*" 
                        multiple 
                    />
                    <button 
                        type="button"
                        onClick={handleImageUpload} 
                        className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
                        disabled={uploading}
                    >
                        {uploading ? "uploading..." : "upload"}
                    </button>
                </div>
                <p className="text-red-700 text-small">{imageUploadError && imageUploadError}</p>
                {
                    formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                        <div key={url} className="flex justify-between p-3 border items-center rounded-lg">
                            <img 
                                src={url} 
                                alt="listing image" 
                                className="w-20 h-20 object-contain" 
                            />
                            <button 
                                type="button" 
                                onClick={() => handleDeleteImage(index)}
                                className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                            >
                                delete
                            </button>
                        </div>
                    ))
                }
                <button 
                    className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                    disabled={loading || uploading}
                >
                    {loading ? "creating..." : "create listing"}
                </button>
                {submitError && <p className="text-red-700 text-sm">{submitError}</p>}
            </div>
        </form>
    </main>
  );
}
