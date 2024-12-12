import React, { useState } from 'react';

function EventCreate() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = { title, category, date, location, image };

    const response = await fetch('http://localhost:4000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    if (response.ok) {
      alert('Renginys sukurtas!');
    } else {
      alert('Klaida kuriant renginį');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Renginio pavadinimas"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Kategorija"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Vieta"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Nuotraukos URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <button type="submit">Sukurti renginį</button>
    </form>
  );
}

export default EventCreate;



