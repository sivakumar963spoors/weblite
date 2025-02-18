import { Box, Button, Modal, Slide } from '@mui/material';
import React, { useState } from 'react';
import { Chart } from 'react-google-charts';
import '../../App.css';

  
export const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7], // CSS-style declaration
  ];
  
  export const options = {
    title: "My Daily Activities",
    titleTextStyle: {
      fontSize: 20,
      bold: true,
      color: "#333", // Custom title color
    },
    pieHole: 0.7, // Makes it a donut chart
    is3D: false,
    legend: {
        position: "top",
        alignment: "center", // Centers the legend
        width: "50%", // Sets the width of the legend
        textStyle: {
          color: "#555", // Legend text color
          fontSize: 11,
        },
        // Apply a custom CSS class to the legend
        cssClass: 'legend-with-border',
    },
    pieSliceTextStyle: {
      color: "#fff", // Text color inside slices
      fontSize: 10,  bold: true,
    },
    
    tooltip: {
      textStyle: {
        color: "#000", // Tooltip text color
        fontSize: 14,
       
      },
      
    },
    chartArea: {
      width: "80%", // Makes the pie chart bigger
      height: "70%",
      border:'1px solid'
    },
  }
const PieChart = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChartClick = (chartEvent) => {
    setOpen(true)
       
       };
  return (
    <div>
       <div>
            <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
            chartEvents={[
                {
                  eventName: 'select',
                  callback: ({ chartWrapper }) => {
                    handleChartClick(chartWrapper.getChart());
                  },
                },
              ]}
          />
           
            <Modal  open={open} onClose={handleClose} closeAfterTransition>
        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
            
          <Box
            sx={{
              position: "absolute",
              top: 10,
              left: "25%",
              transform: "translate(-50%, 10%)",
              width:600,
              bgcolor: "white",
              boxShadow: 24,
              p: 3,
              borderRadius: 2,
              outline: "none",
            }}
          >
            <h2>Modal from Top</h2>
            <p>This modal slides down from the top.</p>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Slide>
      </Modal>
          </div>
    </div>
  )
}

export default PieChart
