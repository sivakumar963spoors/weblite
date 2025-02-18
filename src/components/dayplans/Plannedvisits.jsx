import * as React from 'react';
import { useState } from 'react';
import { 
  TextField,
  Typography, 
  Box,
  Button,
  Paper,
  Container,
  Stack,
} from '@mui/material';
import {  
  Search,
} from '@mui/icons-material';

const PlannedVisits = () => {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const filteredHotels = hotels.filter((hotel) => 
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setHotels(filteredHotels);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom>Hotels</Typography>
      <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            fullWidth
            label="Search by Hotels"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button 
            variant="contained"
            onClick={handleSearch}
            startIcon={<Search />}
          >
            Search
          </Button>
        </Stack>
      </Paper>
      <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
        <Paper elevation={2} sx={{ padding: 2, flex: 1 }}>
          <Typography variant="h6" gutterBottom>Planned Today</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '80px',
            }}
          >
            <Typography variant="h4" gutterBottom>0</Typography>
          </Box>
        </Paper>
        <Paper elevation={2} sx={{ padding: 2, flex: 1 }}>
          <Typography variant="h6" gutterBottom>Visited</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '80px',
            }}
          >
            <Typography variant="h4" gutterBottom>0</Typography>
          </Box>
        </Paper>
        <Paper elevation={2} sx={{ padding: 2, flex: 1 }}>
          <Typography variant="h6" gutterBottom>Unplanned Visits</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '80px',
            }}
          >
            <Typography variant="h4" gutterBottom>0</Typography>
          </Box>
        </Paper>
        <Paper elevation={2} sx={{ padding: 2, flex: 1 }}>
          <Typography variant="h6" gutterBottom>Your Team Planned Employees</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '80px',
            }}
          >
            <Typography variant="h4" gutterBottom>0</Typography>
          </Box>
        </Paper>
      </Stack>
      <Typography variant="h5" gutterBottom sx={{ marginTop: 2 }}>
        Planned visits
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ marginTop: 2 }}>
        Unplanned visits
      </Typography>
    </Container>
  );
};

export default PlannedVisits;
