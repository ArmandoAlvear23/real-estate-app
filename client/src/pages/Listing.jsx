import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";

export default function Listing() {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const params = useParams();
    SwiperCore.use([Navigation, Autoplay, Pagination]);

    useEffect(() => {
        
        try {
          setLoading(true);
          const fetchListing = async () => {
            const res = await fetch(`/api/listing/${params.listingId}`);
            const data = await res.json();
            if (data.success === false) {
              setError(true);
              setLoading(false);
                return;
            }
            setListing(data);
            setError(false);
            setLoading(false);
          }
          fetchListing();
        } catch (error) {
            setLoading(false);
            setError(true);
        }
    }, [params.listingId]);

  return (
    <main>
        {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
        {error && <p className="text-center my-7 text-2xl">Something went wrong!</p>}
        {listing && !loading && !error && (
            <>
                <Swiper 
                    navigation 
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    loop
                >
                    {listing.imageUrls.map((url) => (
                        <SwiperSlide key={url}>
                            <div 
                                className="h-[550px]" 
                                style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}></div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        )}
    </main>
  )
}
