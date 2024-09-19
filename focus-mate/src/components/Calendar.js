import React, { useState } from 'react'
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Avatar,
} from '@mui/material'
import { timeLabels } from '../utils/timeLabels.js'
import '../styles/Calendar.css'

const Calendar = ({ data, selectedPerson, onSelect, onRemove }) => {
  const [hoveredPerson, setHoveredPerson] = useState(null)
  const { matches = [] } = data

  const today = new Date()
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const getDayNumber = index => {
    const day = today.getDate() + index
    return day > 31 ? day - 31 : day // Simple check for month-end
  }

  const handleSelect = person => {
    if (selectedPerson === person) {
      onRemove()
    } else {
      onSelect(person)
    }
  }

  return (
    <Box className="calendar-container">
      <Table className="wide-table">
        <TableHead>
          <TableRow>
            <TableCell />
            {daysOfWeek.map((day, index) => (
              <TableCell key={index} align="center" className="day-cell">
                <Typography variant="subtitle2" sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                  {day}
                </Typography>
                <Typography variant="h6" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  {getDayNumber(index)}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {timeLabels.map((timeLabel, rowIndex) => (
            <TableRow key={rowIndex} className="dotted-row">
              <TableCell className="time-label-cell">{timeLabel}</TableCell>
              {daysOfWeek.map((_, columnIndex) => {
                const person =
                  matches.find(match => match.id === rowIndex * 7 + columnIndex + 1) || {} // Default to an empty object if not found

                return (
                  <TableCell
                    key={columnIndex}
                    className="calendar-cell"
                    onMouseEnter={() => setHoveredPerson(person)}
                    onMouseLeave={() => setHoveredPerson(null)}
                  >
                    {person.name ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar
                          alt={person.name}
                          src={person.photo}
                          sx={{ width: 50, height: 50, mb: 1 }}
                        />
                        <Typography variant="body2" noWrap>
                          {person.name.split(' ')[0]} {person.name.split(' ')[1][0]}.
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Button
                            variant={selectedPerson === person ? 'outlined' : 'contained'}
                            color={selectedPerson === person ? 'error' : 'primary'}
                            onClick={() => handleSelect(person)}
                          >
                            {selectedPerson === person ? 'Remove' : 'Select'}
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      <Box sx={{ height: 70 }} /> // Placeholder for empty cells
                    )}
                    {hoveredPerson === person && person.name && (
                      <Box className="person-details">
                        <Avatar
                          alt={person.name}
                          src={person.photo}
                          sx={{ width: 80, height: 80, mb: 1 }}
                        />
                        <Typography variant="h6">{person.name}</Typography>
                        <Typography variant="body1">Age: {person.age}</Typography>
                        {/* <Typography variant="body1">Contact: {person.contact}</Typography>
                        <Typography variant="body1">Education: {person.education}</Typography>
                        <Typography variant="body1">Email: {person.email}</Typography> */}
                        <Typography variant="body1">Gender: {person.gender}</Typography>
                        <Typography variant="body1">Interests: {person.interests}</Typography>
                        {/* <Typography variant="body1">Location: {person.location}</Typography>
                        <Typography variant="body1">Profession: {person.profession}</Typography> */}
                      </Box>
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default Calendar
