import React, { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({ name: '', reason: '' })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(process.env.REACT_APP_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      setMessage(data.message || 'Submitted!')
    } catch (err) {
      setMessage('Error submitting form')
    }
  }

  return (
    <div className="App">
      <h1>QuickCare Patient Check</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="reason"
          placeholder="Reason for Visit"
          onChange={handleChange}
          required
        />
        <button type="submit">Check In</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default App
