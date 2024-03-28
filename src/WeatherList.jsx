import './App.css';
import { Card, CardContent, Typography, ListItem, ListItemText,ListItemIcon ,IconButton, } from '@mui/material';
import  WeatherIcon  from './assets/images/WeatherIcon.svg'; 
import  Cloudy  from './assets/images/cloudy.png';
import  Rainy  from './assets/images/rainy.png';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,row } from '@mui/material';

import CloseIcon from "@mui/icons-material/Close";

const cities = [
  { city: "Madurai", description: "This is the description for item 1." },
  { city: "Chennai", description: "Description for item 2." },
  { city: "Bangalore", description: "A longer description for item 3." },
];

const weatherData2 = [
  // Replace with your actual weather data
  { day: "Today", temp: 20, icon: "sunny" },
  { day: "Tomorrow", temp: 25, icon: "cloudy" },
  { day: "Tomorrow", temp: 25, icon: "cloudy" },
  { day: "Tomorrow", temp: 25, icon: "cloudy" },
  { day: "Tomorrow", temp: 25, icon: "cloudy" },
];

function WeatherListItem({ day, temp, icon }) {
  return (
    <ListItem>
      <ListItemIcon>
        <img src={WeatherIcon} alt="Sunny" />
      </ListItemIcon>
      <ListItemText primary={day} secondary={`${temp}°C`} />
    </ListItem>
  );
}
function getDay(daysToAdd){
  const today = new Date(); // Get today's date
  const futureDate = new Date(today.getTime() + (daysToAdd * 24 * 60 * 60 * 1000)); // Add days in milliseconds

  const options = { weekday: 'long' }; // Specify options for formatting
  const day = futureDate.toLocaleDateString('en-US', options); // Format date as day of the week

  return day;
}
function WeatherList({weatherData,deleteCity}) {



  return (
    <div>
      <TableContainer>
        <Table sx={{ minWidth: 450 }}>
          {" "}
          {/* Set a minimum width for the table */}
          {Object.keys(weatherData).map((city) => (
            <TableBody
              component={Paper}
              key={city}
              style={{ display: "block", margin: "20px" }}
            >
              <TableRow>
                <TableCell colSpan={7}>
                  <Typography style={{ padding: 20 }} variant="h4">
                    {city}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => deleteCity(city)} aria-label="close">
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow key={city}>
                {weatherData[city]["daily"].map((data,day_key) => (
                  <TableCell key={day_key}>
                    <ListItem>
                      <ListItemIcon>
                        <img width={50} src={WeatherIcon} alt="Sunny" />
                      </ListItemIcon>
                      <ListItemText
                        primary={day_key==0?"Today":day_key==1?"Tommorow":getDay(day_key)}
                        secondary={`${weatherData[city]["daily"][day_key]["feels_like"]["day"]}°F`}
                      />
                    </ListItem>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </TableContainer>
    </div>
  );
}

export default WeatherList;
