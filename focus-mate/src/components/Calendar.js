import React from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { timeLabels } from "../utils/timeLabels.js";
import "../styles/Calendar.css";

const Calendar = ({ data, selectedPerson, onSelect, onRemove }) => {
  const { matches } = data;
  const today = new Date();
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <Box className="calendar-container">
      <Table className="wide-table">
        <TableHead>
          <TableRow>
            <TableCell>&nbsp;</TableCell>
            {daysOfWeek.map((day, index) => (
              <TableCell key={index}>
                <Typography variant="subtitle1" sx={{ fontSize: "0.7rem" }}>
                  {day}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>
                  {today.getDate() + index}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {timeLabels.map((timeLabel, rowIndex) => (
            <TableRow className="table-row" key={rowIndex}>
              <TableCell className="time-label-cell">{timeLabel}</TableCell>
              {daysOfWeek.map((_, columnIndex) => {
                const person = matches.find(
                  (match) => match.id === rowIndex * 7 + columnIndex + 1
                );
                return (
                  <TableCell key={columnIndex}>
                    {person ? (
                      <div className="cell-content">
                        <img
                          src={person.photo}
                          alt={person.name}
                          style={{
                            width: "25px",
                            height: "25px",
                            borderRadius: "50%",
                          }}
                        />
                        <Typography variant="body2" align="center">
                          {person.name.split(" ")[0]}{" "}
                          {person.name.split(" ")[1][0]}.
                        </Typography>
                        <div className="cell-buttons">
                          {selectedPerson === person ? (
                            <>
                              <Button
                                variant="contained"
                                color="primary"
                                disabled
                              >
                                Booked
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                className="remove-button"
                                onClick={onRemove}
                              >
                                Remove
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="contained"
                                color="primary"
                                className="select-button"
                                onClick={() => onSelect(person)}
                              >
                                Select
                              </Button>
                              <Button
                                variant="contained"
                                className="more-button"
                                sx={{
                                  backgroundColor: "white",
                                  color: "black",
                                }}
                              >
                                More
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Calendar;
