import { Box,Typography,Stack } from '@mui/material'
import React from 'react'

const ViewActivity = () => {
  return (
    <div>
      <Box sx={{ mt: 9, background: "#F0F3FA" }}>
        <Stack
          sx={{
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Stack
            sx={{
              width: "95%",
              backgroundColor: "#FFF",
              borderRadius: "5px",
              flexDirection: "row",
              justifyContent: "space-between",
              py: 1,
              px: 1,
              marginTop: -1,
              zIndex: 100000,
              border: "1px solid #C9C9C9",
              "& > *": { fontSize: "11px" },
              position: "fixed",
            }}
          >
            <Typography>Button grouping</Typography>
            <Typography>0 Activity</Typography>
          </Stack>
          <Stack
            sx={{
              width: "90%",
              background: "#FFF",
              mt: 5,
              py: 1,
              borderRadius: "5px",
              border: "1px solid #C9C9C9",
            }}
          >
            <Typography sx={{ textAlign: "center" }}>No data found</Typography>
          </Stack>
        </Stack>
      </Box>
    </div>
  )
}

export default ViewActivity
