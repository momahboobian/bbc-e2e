import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Calendar from "./components/Calendar";
import NavBar from "./components/NavBar";
import axios from "axios";

import "./App.css";

const App = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [data, setData] = useState({ main_person: null, matches: [] });
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/persons");
      const persons = response.data;

      const mainPersonIndex = Math.floor(Math.random() * persons.length);
      const mainPerson = persons[mainPersonIndex];

      persons.splice(mainPersonIndex, 1);

      const matches = persons.filter((person) =>
        mainPerson.matches.some((match) => match.id === person.id)
      );

      setData({ main_person: mainPerson, matches: matches });
    } catch (error) {
      console.log("An error occurred while fetching data:", error);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSelect = (person) => {
    setSelectedPerson(person);
  };

  const handleRemove = () => {
    setSelectedPerson(null);
  };

  return (
    <div className="app">
      <Header data={data.matches} />
      <NavBar toggleSidebar={toggleSidebar} />
      <Grid container className="main">
        {showSidebar && (
          <Grid item xs={3}>
            <Sidebar
              toggleSidebar={toggleSidebar}
              selectedPerson={selectedPerson}
            />
          </Grid>
        )}
        <Grid item xs={showSidebar ? 9 : 12}>
          <Calendar
            data={data}
            selectedPerson={selectedPerson}
            onSelect={handleSelect}
            onRemove={handleRemove}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
