import FullscreenIcon from "@mui/icons-material/Fullscreen";
import PrintIcon from "@mui/icons-material/Print";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import "quill-emoji";
import "quill-emoji/dist/quill-emoji.css";
import React, { useRef, useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { FileUploader } from "react-drag-drop-files";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SignatureCanvas from "react-signature-canvas";
import { globalstyle } from "../../styles/GlobalCss";
import CustomAutocomplete from "../common/ReusableAutoComplete";
import ReusableTextfield from "../common/ReusableTextfield";
import SlideUpModal from "../common/ModalComponent";
import ReusableModal from "../common/ModalComponent";
export const customer_type = ["ba", "venkatesh"];

const modules = {
  toolbar: {
    container: "#toolbar",
  },
  "emoji-toolbar": true,
  "emoji-shortname": true,
  history: { delay: 1000, maxStack: 50, userOnly: true },
};
const CustomToolbar = ({ quillRef, editorRef, setPreviewOpen }) => (
  <div id="toolbar">
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-underline"></button>
    <button className="ql-strike"></button>
    <button className="ql-emoji"> </button>
    <select className="ql-font"></select>
    <select className="ql-size"></select>
    <select className="ql-color"></select>
    <select className="ql-background"></select>

    <select className="ql-header">
      <option value="1"></option>
      <option value="2"></option>
      <option value="3"></option>
      <option value="4"></option>
      <option value="5"></option>
      <option value="6"></option>
      <option selected></option>
    </select>
    <button className="ql-script" value="sub"></button>
    <button className="ql-script" value="super"></button>
    <button className="ql-blockquote"></button>
    <button className="ql-code-block"></button>
    <button className="ql-list" value="ordered"></button>
    <button className="ql-list" value="bullet"></button>
    <button className="ql-indent" value="-1"></button>
    <button className="ql-indent" value="+1"></button>
    <select className="ql-align"></select>
    <button className="ql-link"></button>
    <button className="ql-image"></button>
    <button className="ql-video"></button>
    <button
      id="ql-undo"
      onClick={() => quillRef.current?.getEditor().history.undo()}
    >
      <UndoIcon fontSize="small" />
    </button>

    <button
      id="ql-redo"
      onClick={() => quillRef.current?.getEditor().history.redo()}
    >
      <RedoIcon fontSize="small" />
    </button>

    <button
      id="ql-maximize"
      onClick={() => editorRef.current?.classList.toggle("fullscreen")}
    >
      <FullscreenIcon fontSize="small" />
    </button>

    <button
      id="ql-print"
      onClick={() => {
        const quill = quillRef.current?.getEditor();
        if (!quill) return;

        const editorContent = quill.root.innerHTML;
        const printWindow = window.open("", "", "width=800,height=600");
        printWindow.document.write(
          `<html><head><title>Print</title></head><body>${editorContent}</body></html>`
        );
        printWindow.document.close();
        printWindow.print();
      }}
    >
      <PrintIcon fontSize="small" />
    </button>

    <button id="ql-preview" onClick={() => setPreviewOpen(true)}>
      <VisibilityIcon fontSize="small" />
    </button>

    <button className="ql-clean"></button>
  </div>
);

const imageTypes = ["JPG", "PNG", "GIF"];
const documentTypes = ["PDF", "DOCX"];
const audioTypes = ["MP3", "WAV"];
const videoTypes = ["mp4", "avi", "mov", "wmv", "flv", "mkv", "webm"];

const AllFormDataTypes = () => {
  const [currencyDataType, setCurrencyDataType] = useState();
  const [content, setContent] = useState("");
  const [country, setCountry] = useState("");
  const [selecteDate, setSelectedDate] = useState(null);
  const [numberDataType, setNumberDataType] = useState();
  const [textDataType, setTextDataType] = useState("");
  const [selecteDateTime, setSelectedDateTime] = useState(null);
  const [emailDataType, setEmailDataType] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [phoneDataType, setPhoneDataType] = useState("");
  const [durationDataType, setDurationDataType] = useState();
  const [urlDataType, setUrlDataType] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [openMonthPicker, setMonthPicker] = useState(false);
  const [openDatePicker, setDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [OpenTimeAndDatePicker, setOpenTimeAndDatePicker] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("Bootstrap form");
  const [image, setImage] = useState(null);
  const [document, setDocument] = useState(null);
  const [audio, setAudio] = useState(null);
  const [video, setVideo] = useState(null);
  const [multiImages, setMultiImages] = useState([]);
  const [multiDocs, setMultiDocs] = useState([]);
  const sigCanvas = useRef(null);
  const [imageURL, setImageURL] = useState(null);
  const [open, setOpen] = useState(true);
  const handleChange =
    (setter, isMultiple = false) =>
    (files) => {
 

      if (!files) return;

      // If it's already a FileList, convert to an array, otherwise wrap the single file in an array
      let filesArray = files instanceof FileList ? Array.from(files) : [files];

     

      // Ensure only valid File objects
      filesArray = filesArray.filter((f) => f instanceof File);

     

      // Set state correctly
      setter((prevFiles) =>
        isMultiple ? [...prevFiles, ...filesArray] : filesArray
      );
    };

  const createDownloadLink = (file) => {
    return file ? URL.createObjectURL(file) : "#";
  };
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  // function for currency type change
  const handleCurrencyTypeChange = (event) => {
    let currency = event.target.value;
    setCurrencyDataType(currency);
  };
  // function to save currency on blur
  const handleBlur = () => {
    if (currencyDataType) {
      setCurrencyDataType(parseFloat(currencyDataType).toFixed(2));
    }
  };
  // function to save countries
  const onChangeCountry = (val) => {
    setCountry(val);
  };
  // Function to save signature as an image
  const saveSignature = () => {
    if (sigCanvas.current) {
      setImageURL(sigCanvas.current.toDataURL("image/png"));
    }
  };

  // Function to clear the signature
  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setImageURL(null);
    }
  };
  return (
    <>
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
                mt: 2,
              }}
            >
              <Typography>fill {formTitle} form</Typography>

              <Stack sx={{ mt: 1 }}>
                <Typography
                  sx={{
                    "& > span": { color: "red", fontSize: "10px" },
                    fontSize: "10px",
                    fontWeight: "500",
                  }}
                >
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
                      "& > button": {
                        border: "1px solid #d3d3d3",
                        background:
                          "#e6e6e6 url(images/ui-bg_glass_75_e6e6e6_1x400.png) 50% 50% repeat-x",
                        fontWeight: "normal",
                        color: "#555555",
                        textTransform: "capitalize",
                      },
                    }}
                  >
                    <Button variant="contained" sx={{}}>
                      page1
                    </Button>
                    <Button variant="contained">pag2</Button>
                    <Button variant="contained">page3</Button>
                  </Stack>

                  <>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 3,
                        flexDirection: "column",
                        "&>*": {
                          gap: 0.4,
                        },
                        "& > * > :first-of-type": {
                          fontWeight: 500,
                          fontSize: { sm: "14px", xs: "10px" },
                        },
                        "& .MuiTypography-root span": {
                          color: "red",
                        },
                      }}
                    >
                      <Stack sx={{}}>
                        <Typography>
                          currency
                          <Typography component={"span"}>*</Typography> :
                        </Typography>
                        <ReusableTextfield
                          type="number"
                          value={currencyDataType}
                          onBlur={handleBlur} // Format when exiting input
                          onChange={handleCurrencyTypeChange}
                        />
                      </Stack>
                      <Stack>
                        <Typography>
                          Rich text format{" "}
                          <Typography component={"span"}>*</Typography> :
                        </Typography>
                        <Stack
                          ref={editorRef}
                          className="editor-container"
                          sx={{
                            boxShadow: 2,
                          }}
                        >
                          <Stack>
                            {/* Custom Toolbar */}
                            <CustomToolbar
                              quillRef={quillRef}
                              editorRef={editorRef}
                              setPreviewOpen={setPreviewOpen}
                            />

                            {/* Quill Editor */}
                            <ReactQuill
                              ref={quillRef}
                              value={content}
                              onChange={setContent}
                              modules={modules}
                              theme="snow"
                              style={{ height: "250px" }}
                            />
                          </Stack>
                        </Stack>
                      </Stack>
                      <Stack
                        sx={{
                          px: 1,
                          py: 1,
                        }}
                      >
                        <Typography>
                          Date <Typography component={"span"}>*</Typography> :
                        </Typography>
                        <>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Please Select date"
                              open={openDatePicker}
                              value={selecteDate}
                              onChange={(newValue) => setSelectedDate(newValue)}
                              onOpen={() => setDatePicker(true)}
                              onClose={() => setDatePicker(false)}
                              slotProps={{
                                textField: {
                                  fullWidth: true,
                                  onClick: () => setDatePicker(true),
                                },
                              }}
                              sx={globalstyle.datepicker}
                            />
                          </LocalizationProvider>
                        </>
                      </Stack>
                      <Stack>
                        <Typography>
                          number <Typography component={"span"}>*</Typography> :
                        </Typography>
                        <ReusableTextfield
                          type="number"
                          value={numberDataType}
                        />
                      </Stack>
                      <Stack>
                        <Typography>text :</Typography>
                        <ReusableTextfield type="text" value={textDataType} />
                      </Stack>
                      <Stack>
                        <Typography>
                          Date and time{" "}
                          <Typography component={"span"}>*</Typography> :
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <>
                            <DateTimePicker
                              label="Basic date time picker"
                              value={selecteDateTime}
                              onChange={(newValue) =>
                                setSelectedDateTime(newValue)
                              }
                              open={OpenTimeAndDatePicker}
                              onOpen={() => setOpenTimeAndDatePicker(true)}
                              onClose={() => setOpenTimeAndDatePicker(false)}
                              slotProps={{
                                textField: {
                                  fullWidth: true,
                                  onClick: () => setOpenTimeAndDatePicker(true),
                                },
                              }}
                              sx={globalstyle.datepicker}
                            />
                          </>
                        </LocalizationProvider>
                      </Stack>
                      <Stack>
                        <Typography>
                          email <Typography component={"span"}>*</Typography> :
                        </Typography>
                        <ReusableTextfield type="email" value={emailDataType} />
                      </Stack>
                      <Stack>
                        <Typography>
                          Time <Typography component={"span"}>*</Typography> :
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <>
                            <TimePicker
                              label="Please select time"
                              value={selectedTime}
                              onChange={(newValue) => setSelectedTime(newValue)}
                              open={openTimePicker}
                              onOpen={() => setOpenTimePicker(true)}
                              onClose={() => setOpenTimePicker(false)}
                              slotProps={{
                                textField: {
                                  fullWidth: true,
                                  onClick: () => setOpenTimePicker(true),
                                },
                              }}
                              sx={globalstyle.datepicker}
                            />
                          </>
                        </LocalizationProvider>
                      </Stack>
                      <Stack>
                        <Typography>
                          phone <Typography component={"span"}>*</Typography> :
                        </Typography>
                        <ReusableTextfield
                          type="number"
                          value={phoneDataType}
                        />
                      </Stack>
                      <Stack>
                        <Typography>
                          duration <Typography component={"span"}>*</Typography>{" "}
                          :
                        </Typography>
                        <ReusableTextfield
                          type="number"
                          value={durationDataType}
                        />
                      </Stack>
                      <Stack>
                        <Typography>
                          url <Typography component={"span"}>*</Typography> :
                        </Typography>
                        <ReusableTextfield value={urlDataType} />
                      </Stack>
                      <Stack>
                        <Typography>
                          month <Typography component={"span"}>*</Typography> :
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["Datepicker"]}>
                            <DatePicker
                              label="please select month"
                              views={["month"]}
                              value={selectedMonth}
                              open={openMonthPicker}
                              onChange={(newValue) =>
                                setSelectedMonth(newValue)
                              }
                              onOpen={() => setMonthPicker(true)}
                              onClose={() => setMonthPicker(false)}
                              slotProps={{
                                textField: {
                                  fullWidth: true,
                                  onClick: () => setMonthPicker(true),
                                },
                              }}
                              sx={globalstyle.datepicker}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Stack>
                      <Stack>
                        <Typography>audio</Typography>
                        <FileUploader
                          handleChange={handleChange(setAudio, false)}
                          name="audio"
                          types={audioTypes}
                          label="Drag & drop or click here to upload audio"
                          uploadedLabel="uploaded successfully..!"
                          classes="custom-uploader"
                        />
                        {audio && (
                          <a
                            href={createDownloadLink(audio[0])}
                            download={audio[0].name}
                            style={{ fontSize: "12px" }}
                          >
                            {audio[0].name}
                          </a>
                        )}
                      </Stack>
                      <Stack>
                        <Typography>images</Typography>
                        <FileUploader
                          handleChange={handleChange(setImage, false)}
                          name="image"
                          types={imageTypes}
                          label="Drag & drop or click here to upload image"
                          uploadedLabel="uploaded successfully..!"
                          classes="custom-uploader"
                        />
                        {image && (
                          <a
                            href={createDownloadLink(image[0])}
                            download={image[0].name}
                          >
                            {image[0].name}
                          </a>
                        )}
                      </Stack>
                      <Stack>
                        <Typography>documents</Typography>
                        <FileUploader
                          handleChange={handleChange(setDocument, false)}
                          name="document"
                          types={documentTypes}
                          label="Drag & drop or click here to upload document"
                          uploadedLabel="uploaded successfully..!"
                          classes="custom-uploader"
                        />
                        {document && (
                          <a
                            href={createDownloadLink(document[0])}
                            download={document[0].name}
                          >
                            {document[0].name}
                          </a>
                        )}
                      </Stack>
                      <Stack>
                        <Typography>multi images</Typography>
                        <FileUploader
                          multiple
                          handleChange={handleChange(setMultiImages, true)}
                          name="multiImages"
                          types={imageTypes}
                          label="Drag & drop or click here to upload images"
                          uploadedLabel="uploaded successfully..!"
                          classes="custom-uploader"
                          maxSize={5}
                        />
                        <List>
                          {multiImages.map((file, index) => (
                            <ListItem key={index}>
                              <ListItemText>
                                <a
                                  href={URL.createObjectURL(file)}
                                  download={file.name || `image-${index}`}
                                >
                                  {file.name || `Image ${index + 1}`}
                                </a>
                              </ListItemText>
                            </ListItem>
                          ))}
                        </List>
                      </Stack>
                      <Stack>
                        <Typography>multi documents</Typography>
                        <Stack>
                          <FileUploader
                            multiple
                            handleChange={handleChange(setMultiDocs, true)}
                            name="multiDocs"
                            types={documentTypes}
                            label="Drag & drop or click here to upload documents"
                            uploadedLabel="uploaded successfully..!"
                            classes="custom-uploader"
                          />{" "}
                        </Stack>
                        <List>
                          {multiDocs.map((file, index) => (
                            <ListItem key={index}>
                              <ListItemText>
                                <a
                                  href={createDownloadLink(file)}
                                  download={file.name}
                                >
                                  {file.name}
                                </a>
                              </ListItemText>
                            </ListItem>
                          ))}
                        </List>
                      </Stack>
                      <Stack>
                        <Typography>video</Typography>
                        <FileUploader
                          multiple
                          handleChange={handleChange(setVideo, false)}
                          name="video"
                          types={videoTypes}
                          label="Drag & drop or click here to upload videos"
                          uploadedLabel="uploaded successfully..!"
                          classes="custom-uploader"
                        />
                        {video && (
                          <a
                            href={createDownloadLink(video[0])}
                            download={video[0].name}
                          >
                            {video[0].name}
                          </a>
                        )}
                      </Stack>
                      <Stack>
                        <Typography>signatures</Typography>
                        <Stack
                          sx={{
                            border: "1px dashed #B6B6B6",
                            borderRadius: "5px",
                            width: "100%",
                            height: "150px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <SignatureCanvas
                            ref={sigCanvas}
                            penColor="blue"
                            canvasProps={{
                              className: "sigCanvas",
                              style: {
                                borderBottom: "1px solid #B6B6B6",
                                borderRadius: "5px",
                                width: "95%",
                                height: "100px",
                              },
                            }}
                          />
                          <br />
                        </Stack>
                        <Stack sx={{ flexDirection: "row", gap: 1, mt: 1 }}>
                          <Button
                            onClick={saveSignature}
                            sx={{
                              background: "#E6E7E9",
                              border: "1px solid",
                              color: "#000",
                              padding: 0,
                              m: 0,
                              fontSize: "10px",
                              width: "70px",
                              height: "30px",
                            }}
                          >
                            Save
                          </Button>
                          <Button
                            onClick={clearSignature}
                            sx={{
                              background: "#E6E7E9",
                              border: "1px solid",
                              color: "#000",
                              padding: 0,
                              m: 0,
                              fontSize: "10px",
                              width: "70px",
                              height: "30px",
                            }}
                          >
                            Clear
                          </Button>
                        </Stack>
                        {imageURL && (
                          <Stack>
                            <Typography
                              sx={{ fontSize: { sm: "12", xs: "10px" } }}
                            >
                              Saved Signature:
                            </Typography>
                            <Typography
                              component={"img"}
                              src={imageURL}
                              alt="signature"
                            />
                          </Stack>
                        )}
                      </Stack>
                      <Stack>
                        <Typography>country</Typography>
                        {/* <CountryDropdown value={country} onChange={onChangeCountry} /> */}
                        <>
                          <FormControl fullWidth>
                            <CountryDropdown
                              value={country}
                              id="mui-country-field"
                              onChange={(val) => setCountry(val)}
                              customRender={(props) => (
                                <CustomAutocomplete
                                  {...props}
                                  label="Country"
                                  value={country}
                                  onChange={setCountry}
                                />
                              )}
                              customProps={{
                                labelId: "label-mui-country-field",
                              }}
                            />
                          </FormControl>
                        </>
                      </Stack>
                      <Stack>
                        <Typography>custome entity</Typography>
                        <Autocomplete
                          sx={globalstyle.autoCompleteSelect}
                          options={customer_type}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select custom entity"
                            />
                          )}
                        />
                      </Stack>{" "}
                      <Stack>
                        <Typography>customer</Typography>
                      </Stack>{" "}
                      <Stack>
                        <Typography>customer type</Typography>
                        <Autocomplete
                          sx={globalstyle.autoCompleteSelect}
                          options={customer_type}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select customer type"
                            />
                          )}
                        />
                      </Stack>{" "}
                      <Stack>
                        <Typography>Employee</Typography>
                        <Autocomplete
                          sx={globalstyle.autoCompleteSelect}
                          options={customer_type}
                          renderInput={(params) => (
                            <TextField {...params} label="Select employee" />
                          )}
                        />
                      </Stack>{" "}
                      <Stack>
                        <Typography>form</Typography>
                        <Autocomplete
                          sx={globalstyle.autoCompleteSelect}
                          options={customer_type}
                          renderInput={(params) => (
                            <TextField {...params} label="Select form" />
                          )}
                        />
                      </Stack>
                      <Stack>
                        <Typography>multi pick custom entity</Typography>
                        <TextField
                          multiline
                          rows={4}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                border: "1px solid #E3E3E3",
                                borderTop: "2px solid #E3E3E3",
                              },
                              "&:hover fieldset": {
                                border: "1px solid #E3E3E3",
                              },
                              "&.Mui-focused fieldset": {
                                border: "1px solid #E3E3E3",
                                boxShadow:
                                  "0px 0px 10px 1px rgba(210, 221, 224, 0.63)",
                              },
                            },
                            "& .MuiInputBase-input": {
                              padding: "10px",
                              fontSize: "12px",
                              textTransform: "capitalize",
                            },
                            "& .MuiInputAdornment-root": {
                              color: "green",
                            },
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: {
                              xs: "10px",
                              color: "blue",
                              cursor: "pointer",
                            },
                          }}
                          onClick={() => setOpen(true)}
                        >
                          click here to select custome entity
                        </Typography>
                      </Stack>{" "}
                      <ReusableModal
                        open={open}
                        onClose={() => setOpen(false)}
                        title="My Modal"
                      >
                        <TextField fullWidth />
                        <Stack
                          sx={{
                            flexDirection: {sm:'row',xs:'column'},
                            justifyContent: "space-between",
                          
                            my:1,
                            gap:1, '& > button':{
                              fontSize:{sm:'12px', xs:'8px'},
                              width:'30px'
                            }
                          }}
                        >
                          <Button variant="contained">ok</Button>
                          <Stack sx={{flexDirection:'row',gap:1,
                               "& > button:first-of-type, & > button:last-of-type": {
                                fontSize: { sm: "12px", xs: "8px" },
                                backgroundColor: "#ff7271",
                                borderColor: "#cb5655",
                              },
                              "& > button:nth-of-type(2)": {
                                
                             
                                fontSize: { sm: "12px", xs: "8px" },
                              },
                          }}>
                            <Button variant="contained">select all</Button>
                            <Button variant="outlined">clear</Button>
                            <Button variant="contained">cancel</Button>
                          </Stack>

                        </Stack>
                      </ReusableModal>{" "}
                      <Stack>
                        <Typography>multi pick customer</Typography>

                        <TextField
                          multiline
                          rows={4}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                border: "1px solid #E3E3E3",
                                borderTop: "2px solid #E3E3E3",
                              },
                              "&:hover fieldset": {
                                border: "1px solid #E3E3E3",
                              },
                              "&.Mui-focused fieldset": {
                                border: "1px solid #E3E3E3",
                                boxShadow:
                                  "0px 0px 10px 1px rgba(210, 221, 224, 0.63)",
                              },
                            },
                            "& .MuiInputBase-input": {
                              padding: "10px",
                              fontSize: "12px",
                              textTransform: "capitalize",
                            },
                            "& .MuiInputAdornment-root": {
                              color: "green",
                            },
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: {
                              xs: "10px",
                              color: "blue",
                              cursor: "pointer",
                            },
                          }}
                        >
                          click here to select multi pick customer
                        </Typography>
                      </Stack>{" "}
                      <Stack>
                        <Typography>territory</Typography>
                        <Autocomplete
                          sx={globalstyle.autoCompleteSelect}
                          options={customer_type}
                          renderInput={(params) => (
                            <TextField {...params} label="Select territory" />
                          )}
                        />
                      </Stack>{" "}
                      <Stack>
                        <Typography>YesOrNo</Typography>
                        <Autocomplete
                          sx={globalstyle.autoCompleteSelect}
                          options={customer_type}
                          renderInput={(params) => (
                            <TextField {...params} label="Select" />
                          )}
                        />
                      </Stack>{" "}
                      {/* Preview Modal */}
                      <Modal
                        open={previewOpen}
                        onClose={() => setPreviewOpen(false)}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 600,
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                          }}
                        >
                          <Typography variant="h6" component="h2">
                            Preview
                          </Typography>
                          <Box
                            sx={{
                              mt: 2,
                              p: 2,
                              border: "1px solid #ccc",
                              minHeight: "200px",
                              maxHeight: "400px",
                              overflow: "auto",
                            }}
                            dangerouslySetInnerHTML={{ __html: content }}
                          />
                          <IconButton
                            sx={{ position: "absolute", top: 10, right: 10 }}
                            onClick={() => setPreviewOpen(false)}
                          >
                            close
                          </IconButton>
                        </Box>
                      </Modal>
                    </Box>
                    <br></br> <br></br> <br></br> <br></br>
                  </>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <Stack
        sx={{
          position: "fixed",
          bottom: 0,
          background: "blue",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          py: 1,
          width: "100%",
          gap: 1,
          zIndex: 999,
          "& > Button": {
            color: "#FFF",
            border: "1px solid #fff",
          },
        }}
      >
        <Button sx={{fontSize:{xs:'10px', sm:'14px'}}} variant="outlined">
          save
        </Button>
        <Button sx={{ mr: 2 ,fontSize:{xs:'10px', sm:'14px'}
      }}>save and new</Button>
      </Stack>
    </>
  );
};

export default AllFormDataTypes;



