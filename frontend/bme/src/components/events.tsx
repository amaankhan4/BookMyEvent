import React, { useState, useEffect } from 'react';

const Events: React.FC = () => {
    const [data, setData] = useState<any[]>([]);  // Assuming the data is an array of objects

    const datafetch = async () => {
        const request = new Request('http://localhost:3000/events', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        try {
            const response = await fetch(request);
            if (!response.ok) {
                throw new Error(`HTTP error! Status ${response.status}`);
            }
            const responseData = await response.json();
            console.log(responseData);
            setData(responseData);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        datafetch();
    }, []);

    return (
        <div>
            <h1>Events</h1>
                <ul>{data.map((event) => (
                    <li key={event.eventid_}>
                        <h2>{event.title}</h2>
                        <p>{event.description}</p>
                        <p>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Events;
