import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BarList = () => {
    const [bars, setBars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBars = async () => {
            try {
                const response = await axios.get('http://localhost:3000/bars');
                setBars(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBars();
    }, []);

    const addBar = (newBar) => {
        setBars((prevBars) => [...prevBars, newBar]);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
        <div class="oneBar">
            {reviews.map(bar => (
                <>
                    <div className="lineBarName">{bar.name}</div>
                    <div className="lineBarAddress">{bar.address}</div>
                    <button className="lineBarDetails">Détails</button>
                </>
            ))}
        </div>
        </>
    );
};

export default BarList;