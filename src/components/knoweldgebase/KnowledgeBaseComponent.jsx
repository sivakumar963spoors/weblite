import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const KnowledgeBaseComponent = () => {
  const { id } = useParams();
  const typographyStyle = {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
    fontSize: "14px",
    textTransform: "capitalize",
  };

  return (
    <div>
      <Box
        sx={{
          mt: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack sx={{ width: { sm: "90%", xs: "95%" } }}>
          {id == 0 && (
            <Stack>
              <Typography sx={typographyStyle}>total count</Typography>
            </Stack>
          )}
          {id == 1 && (
            <Stack sx={{}}>
              <Typography sx={typographyStyle}>total viewed</Typography>
              <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 1 }}>
                <Stack
                  sx={{
                    mt: 2,
                    width: "300px",
                    border: "1px solid #EEEE",
                    py: 1,
                    px: 2,
                    borderRadius: "7px",
                  }}
                >
                  <Stack>
                    <Typography>other</Typography>
                    <Box
                      sx={{
                        textAlign: "center",

                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          p: 1,
                          width: "30px",
                          bgcolor: "#EEEE",
                          borderRadius: "50%",
                        }}
                      >
                        12
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
               
                
              </Stack>
            </Stack>
          )}
          {id == 2 && (
            <Stack>
              <Typography sx={typographyStyle}>total unviewed</Typography>
            </Stack>
          )}
        </Stack>
      </Box>
    </div>
  );
};

export default KnowledgeBaseComponent;
