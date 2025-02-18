// import { Box, Button, Paper, Typography } from '@mui/material';
// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import './DayPlan.css';

// function DayPlan() {
//   const [date, setDate] = useState(new Date());

//   const onChange = (newDate) => {
//     setDate(newDate);
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
//       <Typography variant="h6" component="div" sx={{ mb: 2 }}>
//         Day Plan Details
//       </Typography>

//       <Paper elevation={3} sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'center' }}>
//         <Calendar onChange={onChange} value={date} />
//       </Paper>

//       <Box
//         component={Paper}
//         elevation={2}
//         sx={{ width: '100%', maxWidth: 400, p: 2, textAlign: 'center', mb: 2 }}
//       >
//         <Typography variant="subtitle1">Day Plan Details</Typography>
//         <Typography variant="body1" sx={{ my: 1 }}>
//           {date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
//         </Typography>
//         <Box display="flex" justifyContent="space-around" sx={{ mt: 2 }}>
//           <Box>
//             <Typography variant="body2">👤 Customers</Typography>
//             <Typography variant="h6">0</Typography>
//           </Box>
//           <Box>
//             <Typography variant="body2">✔️ Checkin</Typography>
//             <Typography variant="h6">0</Typography>
//           </Box>
//           <Box>
//             <Typography variant="body2">❌ Checkout</Typography>
//             <Typography variant="h6">0</Typography>
//           </Box>
//         </Box>
//       </Box>

//       <Button variant="contained" color="primary" sx={{ width: '100%', maxWidth: 400 }}>
//         Create
//       </Button>
//     </Box>
//   );
// }

// export default DayPlan;
import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import dayPlansData from "./dayplansdata";

const DayPlans = () => {
  const data = dayPlansData[0];

  return (
    <Paper elevation={3} sx={{ padding: 1}}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center"></Box>
      </Box>

      <Box display="flex" justifyContent="space-between" sx={{ marginTop: 2 , fontSize:'13px' }}>
        <Box
          textAlign="center"
          flex={1}
          sx={{
            border: "1px solid #ccc",
            // borderRadius: 1,
            padding: 2,
            marginRight: 1,
            fontSize: '13px',
          }}
        >
          <Typography sx={{fontSize: '13px',}} variant="h2">{data.plannedToday}</Typography>
          <Typography variant="body2">Planned today</Typography>
        </Box>
        <Box
          textAlign="center"
          flex={1}
          sx={{
            border: "1px solid #ccc",
            borderRadius: 1,
            padding: 2,
            marginRight: 1,
            fontSize: '13px',git
          }}
        >
          <Typography sx={{fontSize: '13px',}} variant="h2">{data.visited}</Typography>
          <Typography variant="body2">Visited</Typography>
        </Box>
        <Box
          textAlign="center"
          flex={1}
          sx={{
            border: "1px solid #ccc",
            borderRadius: 1,
            padding: 2,
            fontSize: '13px',
          }}
        >
          <Typography   sx={{fontSize: '13px',}}variant="h2">{data.unplannedVisits}</Typography>
          <Typography variant="body2">Unplanned visits</Typography>
        </Box>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="body1">Team planned employees:</Typography>
          <Typography variant="body1">
            <strong>{data.teamPlannedEmployees}</strong>
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body1">Team unplanned employees:</Typography>
          <Typography variant="body1">
            <strong>{data.teamUnplannedEmployees}</strong>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default DayPlans;
