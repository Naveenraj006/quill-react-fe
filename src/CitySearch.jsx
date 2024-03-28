import React, { useState, useEffect } from 'react';
import { GoogleApiWrapper, Geocoder } from 'react-geocode';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add'; // Import the AddIcon component

const apiKey = 'AIzaSyAg63iH-7svmN7JWs6a-DlLhnx1653PVD4'; // Replace with your actual API key



    function CitySearch({ onSearch }){
        const [selectedPlace, setSelectedPlace] = useState(null);
        const handlePlaceSelect = (place) => {
            setSelectedPlace(null);
        
            onSearch(place); 
          };

  return (
    <div style={{display:'flex', padding:20}}>
     <GooglePlacesAutocomplete
            apiKey={apiKey}
            selectProps={{
              placeholder: "Search Cities",
              styles: {
                input: (provided) => ({ ...provided, width: 250 }),
              },
              onChange: handlePlaceSelect,
            }}
            types={["(cities)"]}
          />
    

    </div>
  );
};

export default CitySearch;