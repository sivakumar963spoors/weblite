import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const KnowledgeBaseComponent = () => {
 const [searchParams] = useSearchParams();
  const viewType = searchParams.get("viewType");
  const navigation =useNavigate();
 
  const typographyStyle = {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
    fontSize: "14px",
    textTransform: "capitalize",
  };
  const handleNavTo =(id)=>{

    navigation(`/manage/article/${id}`)
  }

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
          {viewType == 0 && (
            <Stack>
              <Typography sx={typographyStyle}>total count</Typography>
              <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 1 }}>
                <Stack
                  sx={{
                    mt: 2,
                    width: "300px",
                    border: "1px solid #EEEE",
                    py: 1,
                    px: 2,
                    borderRadius: "7px",
                    bgcolor:'#FFF'
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
                          cursor:'pointer'
                        }}
                        onClick ={()=>handleNavTo(viewType)}
                      >
                        5
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
               
                
              </Stack>
            </Stack>
          )}
          {viewType && viewType == 1 && (
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
                    borderRadius: "7px",  bgcolor:'#FFF'
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
                          cursor:'pointer'
                        }}
                        onClick ={()=>handleNavTo(viewType)}
                      >
                        12
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
               
                
              </Stack>
            </Stack>
          )}
          {viewType && viewType == 2 && (
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
