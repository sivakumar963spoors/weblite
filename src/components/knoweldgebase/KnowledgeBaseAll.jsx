import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { title: "Others", count1: 10, count2: 20, showButton: true , id:5001},
  { title: "react build", count1: 10, count2: 20, showButton: true , id :5001},
  { title: "lts", count1: 10, count2: 20, showButton: false, id:5002 },
  { title: "Bootstrap", count1: 10, count2: 20, showButton: false,id:5003 },
  { title: "Testing", count1: 10, count2: 20, showButton: false,id:5004},
  { title: "Article", count1: 10, count2: 20, showButton: false ,id:5005},
];

const KnowledgeBaseAll = () => {
  const nav =useNavigate();

  const handleArticle =(id, forView)=>{
nav(`/manage/article/${id}?forview=${forView}`)
  }
  return (
    <Box sx={{ mt: 10 }}>
      <Stack sx={{ width: "100%", alignItems: "center" }}>
        <Stack sx={{ width: { sm: "95%", xs: "100%" } }}>
          <Stack
            sx={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 1,
              "& > *": {
                width: { sm: "30%", xs: "95%" },
                border: "1px solid #DDD",
                background: "#fff",
                boxShadow: "0 1px 10px rgba(0,0,0,.05)",
                borderRadius: "5px",
                py: 1,
                px: 1,
                fontSize: { sm: "14px", xs: "10px" },
              },

              "& > * button": {
                borderColor: "red",
                color: "red",
                width: "100px",
                mt: 1,
                textAlign: "center !important",
                alignItems: "center !important",
                fontSize: { sm: "14px !important", xs: "10px !important" },
              },
            }}
          >
            {categories.map((item, index) => (
              <Stack key={index}>
                <Typography>{item.title}</Typography>
                <Stack
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    my: 1,
                  }}
                >
                  <Typography
                    sx={{
                      bgcolor: "#ddd",
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                      textAlign: "center",
                      pt: 2,
                      cursor:'pointer'
                    }}
                    onClick={()=> handleArticle(item.id , true)}
                   
                  >
                    {item.count1}
                  </Typography>
                  <Typography
                    sx={{
                      bgcolor: "#ddd",
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                      textAlign: "center",
                      pt: 2,
                      cursor:'pointer'
                    }}
                    onClick={()=> handleArticle(item.id, false)}
                  >
                    {item.count2}
                  </Typography>
                </Stack>
                {item.showButton && <Button variant="outlined">New</Button>}
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default KnowledgeBaseAll;
