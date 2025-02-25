import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import AllFormDataTypes from "../components/formdata/AllFormDataTypes";

const GetFormsData = () => {
  const [formTitle, setFormTitle] = useState("Bootstrap form");
  return (
    <div>
      <Stack>
        <Box sx={{ mt: 9, background: "#F0F3FA" }}>
          <Stack sx={{ alignItems: "center" }}>
            <Stack
              sx={{
                width: "95%",
                background: "#fff",
                borderRadius: "5px",
                px: 1,
                py: 1,
                zIndex: 9999,
              }}
            >
              <Typography>fill {formTitle} form</Typography>

              <Stack>
                <Typography sx={{ "& > span": { color: "red" } }}>
                  <Typography component="span">**</Typography> indicates title
                  field.
                  <Typography component="span">*</Typography> indicates
                  mandatory field.
                  <Typography component="span">^</Typography> indicates
                  conditional mandatory field.
                </Typography>

                <Stack>
                  <Stack
                    sx={{
                      flexDirection: "row",
                      gap: 1,
                      border: " 1px solid #aaaaaa",
                      background:
                        " #cccccc url(images/ui-bg_highlight-soft_75_cccccc_1x100.png) 50% 50% repeat-x",
                      color: "#222222",
                      fontWeight: "bold",
                      py: 1,
                      borderRadius: "4px",
                      px: 1,
                      '& > button':{
                        border: "1px solid #d3d3d3",
                        background:
                          "#e6e6e6 url(images/ui-bg_glass_75_e6e6e6_1x400.png) 50% 50% repeat-x",
                        fontWeight: "normal",
                        color: "#555555",
                        textTransform:'capitalize'
                      }
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                       
                      }}
                    >
                      page1
                    </Button>
                    <Button variant="contained">pag2</Button>
                    <Button variant="contained">page3</Button>
                  </Stack>

                  <Stack sx={{height:'40px', background:'#254F65', borderRadius:'5px', mt:0.5}}>
                   
                  </Stack>
                  <Stack>

                 <AllFormDataTypes/>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </div>
  );
};

export default GetFormsData;
