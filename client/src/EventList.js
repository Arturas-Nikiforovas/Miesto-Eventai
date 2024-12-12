import React, { useState, useEffect } from 'react';

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Funkcija renginiui pašalinti
  const deleteEvent = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/events/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEvents(events.filter((event) => event.id !== id));
        alert('Renginys pašalintas');
      } else {
        alert('Nepavyko pašalinti renginio');
      }
    } catch (err) {
      alert('Klaida pašalinant renginį');
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:4000/events');
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          setError('Nepavyko įkelti renginių');
        }
      } catch (err) {
        setError('Klaida užklausoje');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p>Įkeliama...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Renginiai</h2>
      <ul>
        {events.length === 0 ? (
          <p>Renginiai nerasti</p>
        ) : (
          events.map((event) => (
            <li key={event.id}>
              <h3>{event.title}</h3>
              <p>{event.category}</p>
              <p>{event.date}</p>
              <p>{event.location}</p>
              {event.image && <img src={event.image} alt={event.title} width="200" />}
              <button onClick={() => deleteEvent(event.id)}>Ištrinti renginį</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default EventList;
