import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import useDownloader from "react-use-downloader";
const ViewArticle = () => {
  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
    useDownloader();
    const fileUrlAudio= "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; 
  const fileUrl =
    "https://upload.wikimedia.org/wikipedia/commons/4/4d/%D0%93%D0%BE%D0%B2%D0%B5%D1%80%D0%BB%D0%B0_%D1%96_%D0%9F%D0%B5%D1%82%D1%80%D0%BE%D1%81_%D0%B2_%D0%BF%D1%80%D0%BE%D0%BC%D1%96%D0%BD%D1%8F%D1%85_%D0%B2%D1%80%D0%B0%D0%BD%D1%96%D1%88%D0%BD%D1%8C%D0%BE%D0%B3%D0%BE_%D1%81%D0%BE%D0%BD%D1%86%D1%8F.jpg";
    const handleOnError = (e) => {
      e.target.src =
        "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png";
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 10,
        flexDirection:'row',
        flexWrap:'wrap',
        gap:1
      }}
    >
      <Stack
        sx={{
          gap: 1,
          border: "1px solid transparent",
          borderColor: "#DDD",
          background: "#fff",
          width: { sm: "85%", xs: "90%" },
          py: 1,
          px: 1,
          boxShadow: "0 1px 10px rgba(0,0,0,.05)",
          "& > * ": {
            flexDirection: "row !important",
            display: "flex",
            alignItems:'flex-start !important',justifyContent:'flex-start !important'
          },

          "& > * > :first-of-type": {
            color: "#999",
            fontWeight: 500,

            width: "150px",
            fontSize: { sm: "14px", xs: "10px" },
          },
          "& > * > :nth-of-type(2)": {
            flexShrink: 0,
            color: "#000",
            fontWeight: 500,
            fontSize: { sm: "14px", xs: "10px" },
          },
        }}
      >
        <Stack>
          <Typography>s.No</Typography>
          <Typography>:&nbsp;1</Typography>{" "}
        </Stack>
        <Stack>
          <Typography>Path</Typography>
          <Typography>:&nbsp;kjhiiu</Typography>{" "}
        </Stack>{" "}
        <Stack>
          <Typography>Title</Typography>
          <Typography> :&nbsp;1</Typography>{" "}
        </Stack>{" "}
        <Stack sx={{flexDirection:{xs:'column !important', sm:'row !important'}}}>
          <Typography>Preview &nbsp;</Typography>
          
          <Typography> <Box component={'img'} src={fileUrl} sx={{width:'150px', height:'150px'}}  onError={handleOnError}/></Typography>{" "}
        </Stack>{" "}
        <Stack>
          <Typography>Download</Typography>:&nbsp;
          <Typography   onClick={() => download(fileUrl)} >
            <ArrowDownwardIcon />
          </Typography>{" "}
        </Stack>
        <Stack>
          <Typography>uploaded by</Typography>
          <Typography>:&nbsp;</Typography>{" "}
        </Stack>
        <Stack>
          <Typography>uploaded time</Typography>
          <Typography>:&nbsp;</Typography>{" "}
        </Stack>
      </Stack>
      <Stack
        sx={{
          gap: 1,
          border: "1px solid transparent",
          borderColor: "#DDD",
          background: "#fff",
          width: { sm: "85%", xs: "90%" },
          py: 1,
          px: 1,
          boxShadow: "0 1px 10px rgba(0,0,0,.05)",
          "& > * ": {
            flexDirection: "row !important",
            display: "flex",
            alignItems:'flex-start !important',justifyContent:'flex-start !important'
          },

          "& > * > :first-of-type": {
            color: "#999",
            fontWeight: 500,

            width: "150px",
            fontSize: { sm: "14px", xs: "10px" },
          },
          "& > * > :nth-of-type(2)": {
            flexShrink: 0,
            color: "#000",
            fontWeight: 500,
            fontSize: { sm: "14px", xs: "10px" },
          },
        }}
      >
        <Stack>
          <Typography>s.No</Typography>
          <Typography>:&nbsp;1</Typography>{" "}
        </Stack>
        <Stack>
          <Typography>Path</Typography>
          <Typography>:&nbsp;kjhiiu</Typography>{" "}
        </Stack>{" "}
        <Stack>
          <Typography>Title</Typography>
          <Typography> :&nbsp;1</Typography>{" "}
        </Stack>{" "}
        <Stack sx={{flexDirection:{xs:'column !important', sm:'row !important'}}}>

          <Typography>Preview</Typography>
         
          <Typography >
            <Typography component={'span'}>:</Typography>
          <audio src={fileUrlAudio} controls autoPlay  style={{
    width: "270px",
    height: "35px"
  }} />
          </Typography>

        </Stack>{" "}
        <Stack>
          <Typography>Download</Typography>:&nbsp;
          <Typography   onClick={() => download(fileUrlAudio)} >
              <ArrowDownwardIcon sx={{fontSize:{sx:'25px', xs:'15px'}}}/>
          </Typography>{" "}
        </Stack>
        <Stack>
          <Typography>uploaded by</Typography>
          <Typography>:&nbsp;</Typography>{" "}
        </Stack>
        <Stack>
          <Typography>uploaded time</Typography>
          <Typography>:&nbsp;</Typography>{" "}
        </Stack>
      </Stack>
      <Stack
        sx={{
          gap: 1,
          border: "1px solid transparent",
          borderColor: "#DDD",
          background: "#fff",
          width: { sm: "85%", xs: "90%" },
          py: 1,
          px: 1,
          boxShadow: "0 1px 10px rgba(0,0,0,.05)",
          "& > * ": {
            flexDirection: "row !important",
            display: "flex",
            alignItems:'flex-start !important',justifyContent:'flex-start !important'
          },

          "& > * > :first-of-type": {
            color: "#999",
            fontWeight: 500,

            width: "150px",
            fontSize: { sm: "14px", xs: "10px" },
          },
          "& > * > :nth-of-type(2)": {
            flexShrink: 0,
            color: "#000",
            fontWeight: 500,
            fontSize: { sm: "14px", xs: "10px" },
          },
        }}
      >
        <Stack>
          <Typography>s.No</Typography>
          <Typography>:&nbsp;1</Typography>{" "}
        </Stack>
        <Stack>
          <Typography>Path</Typography>
          <Typography>:&nbsp;kjhiiu</Typography>{" "}
        </Stack>{" "}
        <Stack>
          <Typography>Title</Typography>
          <Typography> :&nbsp;1</Typography>{" "}
        </Stack>{" "}
       <Stack sx={{flexDirection:{xs:'column !important', sm:'row !important'}}}>
          <Typography>Preview</Typography>
          :&nbsp;
          <Typography> <Box component={'img'} src={fileUrl} sx={{width:'150px', height:'150px'}}  onError={handleOnError}/></Typography>{" "}
        </Stack>{" "}
        <Stack>
          <Typography>Download</Typography>:&nbsp;
          <Typography   onClick={() => download(fileUrl)} >
              <ArrowDownwardIcon sx={{fontSize:{sx:'25px', xs:'15px'}}}/>
          </Typography>{" "}
        </Stack>
        <Stack>
          <Typography>uploaded by</Typography>
          <Typography>:&nbsp;</Typography>{" "}
        </Stack>
        <Stack>
          <Typography>uploaded time</Typography>
          <Typography>:&nbsp;</Typography>{" "}
        </Stack>
      </Stack>
      <Stack
        sx={{
          gap: 1,
          border: "1px solid transparent",
          borderColor: "#DDD",
          background: "#fff",
          width: { sm: "85%", xs: "90%" },
          py: 1,
          px: 1,
          boxShadow: "0 1px 10px rgba(0,0,0,.05)",
          "& > * ": {
            flexDirection: "row !important",
            display: "flex",
            alignItems:'flex-start !important',justifyContent:'flex-start !important'
          },

          "& > * > :first-of-type": {
            color: "#999",
            fontWeight: 500,

            width: "150px",
            fontSize: { sm: "14px", xs: "10px" },
          },
          "& > * > :nth-of-type(2)": {
            flexShrink: 0,
            color: "#000",
            fontWeight: 500,
            fontSize: { sm: "14px", xs: "10px" },
          },
        }}
      >
        <Stack>
          <Typography>s.No</Typography>
          <Typography>:&nbsp;1</Typography>{" "}
        </Stack>
        <Stack>
          <Typography>Path</Typography>
          <Typography>:&nbsp;kjhiiu</Typography>{" "}
        </Stack>{" "}
        <Stack>
          <Typography>Title</Typography>
          <Typography> :&nbsp;1</Typography>{" "}
        </Stack>{" "}
        <Stack sx={{flexDirection:{xs:'column !important', sm:'row !important'}}}>
          <Typography>Preview</Typography>
          :&nbsp;
          <Typography> <Box component={'img'} src={fileUrl} sx={{width:'150px', height:'150px'}}  onError={handleOnError}/></Typography>{" "}
        </Stack>{" "}
        <Stack>
          <Typography>Download</Typography>:&nbsp;
          <Typography   onClick={() => download(fileUrl)} >
            <ArrowDownwardIcon sx={{fontSize:{sx:'25px', xs:'15px'}}}/>
          </Typography>{" "}
        </Stack>
        <Stack>
          <Typography>uploaded by</Typography>
          <Typography>:&nbsp;</Typography>{" "}
        </Stack>
        <Stack>
          <Typography>uploaded time</Typography>
          <Typography>:&nbsp;</Typography>{" "}
        </Stack>
      </Stack>
      
    </Box>
  );
};

export default ViewArticle;
