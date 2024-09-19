import React, { useState } from 'react'
import { Box, Button, Checkbox, Link, Typography } from '@mui/material'
import '../styles/Sidebar.css'

const Sidebar = ({ toggleSidebar, mainPerson, selectedPersons }) => {
  const [isAllMembersChecked, setIsAllMembersChecked] = useState(false)

  const handleAllMembersCheckboxChange = () => {
    setIsAllMembersChecked(!isAllMembersChecked)
  }

  return (
    <Box className="sidebar">
      {/* Session Booking Section */}
      <Box className="sidebar-box session-box">
        <Button variant="contained" className="session-btn sidebar-box-button">
          + Book a Session
        </Button>
        <Link href="#" className="favorites sidebar-box-link" underline="none">
          See Favorites Availability
        </Link>
      </Box>

      {/* Upcoming Meetings Section */}
      <Box className="sidebar-box upcoming-box">
        <Typography className="upcoming-heading">
          <span className="text-left">Upcoming</span>
          <Link href="#" className="upcoming-link sidebar-box-link" underline="none">
            View All
          </Link>
        </Typography>

        {/* Main Person's Upcoming Meetings */}
        {mainPerson && mainPerson.upcoming_meetings && mainPerson.upcoming_meetings.length > 0 ? (
          <>
            <Typography variant="body1" className="upcoming-text">
              Your Upcoming Meetings:
            </Typography>
            {mainPerson.upcoming_meetings.map((meeting, index) => (
              <Box key={index}>
                <Typography variant="body2">
                  {meeting[0]} -{' '}
                  <Link href={meeting[1]} target="_blank" underline="none">
                    Join Meeting
                  </Link>
                </Typography>
              </Box>
            ))}
          </>
        ) : (
          <Typography variant="body1" className="upcoming-text">
            No upcoming meetings
          </Typography>
        )}

        {/* Selected Persons' Meetings */}
        {selectedPersons && selectedPersons.length > 0 && (
          <>
            <Typography variant="body1" className="upcoming-text">
              Selected Persons:
            </Typography>
            {selectedPersons.map(person => (
              <Box key={person.id}>
                <Typography variant="body2">{person.name}</Typography>
                {person.meetings && person.meetings.length > 0 ? (
                  person.meetings.map((meeting, index) => (
                    <Typography key={index} variant="body2">
                      {meeting[0]} -{' '}
                      <Link href={meeting[1]} target="_blank" underline="none">
                        Join Meeting
                      </Link>
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2">No meetings available</Typography>
                )}
              </Box>
            ))}
          </>
        )}

        <Link href="#" className="upcoming-link sidebar-box-link" underline="none">
          Review Session Guidelines
        </Link>
      </Box>

      {/* Past Meetings Section */}
      <Box className="sidebar-box past-box">
        <Typography className="past-heading text-left">Past Meetings</Typography>
        {mainPerson && mainPerson.past_meetings && mainPerson.past_meetings.length > 0 ? (
          mainPerson.past_meetings.map((meeting, index) => (
            <Box key={index}>
              <Typography variant="body2">
                {meeting[0]} -{' '}
                <Link href={meeting[1]} target="_blank" underline="none">
                  Meeting Link
                </Link>
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body1" className="past-text">
            No past meetings
          </Typography>
        )}
      </Box>

      {/* My Groups Section */}
      <Box className="sidebar-box group-box">
        <Typography className="group-heading text-left">My Groups</Typography>
        {/* Render groups here */}
      </Box>

      {/* All Members Checkbox */}
      <Box className="sidebar-box members-box" onClick={handleAllMembersCheckboxChange}>
        <Checkbox checked={isAllMembersChecked} />
        <Typography variant="body1" className="members-text text-left">
          All Focusmate Members
        </Typography>
      </Box>

      {/* Privacy and Help Link */}
      <Link href="#" className="help" underline="none">
        Privacy - Help
      </Link>
    </Box>
  )
}

export default Sidebar
