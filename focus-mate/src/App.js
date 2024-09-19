import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Grid } from '@mui/material'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Calendar from './components/Calendar'
import NavBar from './components/NavBar'

import './App.css'

const App = () => {
  const [mainPerson, setMainPerson] = useState({ main_person: null, matches: [] })
  const [showSidebar, setShowSidebar] = useState(true)
  const [selectedPersons, setSelectedPersons] = useState([]) // Changed to handle multiple selections

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetching a random main person and their matches
      const randomPersonId = Math.floor(Math.random() * 100) + 1
      const response = await axios.get(`/matches/${randomPersonId}`)
      console.log(response.data)
      const { main_person, matches } = response.data

      setMainPerson({ main_person, matches })
    } catch (error) {
      console.log('An error occurred while fetching data:', error)
    }
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const handleSelect = person => {
    // Toggle selection
    if (selectedPersons.some(selected => selected.id === person.id)) {
      setSelectedPersons(selectedPersons.filter(selected => selected.id !== person.id))
    } else {
      setSelectedPersons([...selectedPersons, person])
    }
  }

  return (
    <div className="app">
      <Header person={mainPerson.main_person} />
      <NavBar toggleSidebar={toggleSidebar} />
      <Grid container className="main">
        {showSidebar && (
          <Grid item xs={3}>
            <Sidebar
              toggleSidebar={toggleSidebar}
              mainPerson={mainPerson.main_person}
              selectedPersons={selectedPersons}
            />
          </Grid>
        )}
        <Grid item xs={showSidebar ? 9 : 12}>
          <Calendar data={mainPerson} selectedPersons={selectedPersons} onSelect={handleSelect} />
        </Grid>
      </Grid>
    </div>
  )
}

export default App
