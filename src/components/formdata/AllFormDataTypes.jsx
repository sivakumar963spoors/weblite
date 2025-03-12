import FullscreenIcon from "@mui/icons-material/Fullscreen";
import PrintIcon from "@mui/icons-material/Print";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
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
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReusableTextfield from "../common/ReusableTextfield";
import { globalstyle } from "../../styles/GlobalCss";
const modules = {
  toolbar: {
    container: "#toolbar",
  },
  "emoji-toolbar": true,
  "emoji-shortname": true,
  history: { delay: 1000, maxStack: 50, userOnly: true },
};
const CustomToolbar = () => (
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

    {/* Undo & Redo Buttons */}
    <button id="ql-undo">
      <UndoIcon fontSize="small" />
    </button>
    <button id="ql-redo">
      <RedoIcon fontSize="small" />
    </button>

    <button id="ql-maximize">
      <FullscreenIcon fontSize="small" />
    </button>

    <button id="ql-print">
      <PrintIcon fontSize="small" />
    </button>
    <button id="ql-preview">
      <VisibilityIcon fontSize="small" />
    </button>
    <button className="ql-clean"></button>
  </div>
);

const AllFormDataTypes = () => {
  const [currencyDataType, setCurrencyDataType] = useState();
  const [content, setContent] = useState("");
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
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();

      // Attach undo & redo to buttons
      document.getElementById("ql-undo").addEventListener("click", () => {
        quill.history.undo();
      });

      document.getElementById("ql-redo").addEventListener("click", () => {
        quill.history.redo();
      });

      // Attach maximize button
      document.getElementById("ql-maximize").addEventListener("click", () => {
        if (editorRef.current) {
          editorRef.current.classList.toggle("fullscreen");
        }
      });

      // Attach print button
      document.getElementById("ql-print").addEventListener("click", () => {
        const editorContent = quill.root.innerHTML;
        const printWindow = window.open("", "", "width=800,height=600");
        printWindow.document.write(
          "<html><head><title>Print</title></head><body>"
        );
        printWindow.document.write(editorContent);
        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.print();
      });

      // Attach preview button
      document.getElementById("ql-preview").addEventListener("click", () => {
        setPreviewOpen(true);
      });
    }
  }, []);
  const handleCurrencyTypeChange = (event) => {
    let currency = event.target.value;
    setCurrencyDataType(currency);
  };

  const handleBlur = () => {
    if (currencyDataType) {
      setCurrencyDataType(parseFloat(currencyDataType).toFixed(2));
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
                            <CustomToolbar />

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
        <Button sx={{}} variant="outlined">
          save
        </Button>
        <Button sx={{ mr: 2 }}>save and new</Button>
      </Stack>
    </>
  );
};

export default AllFormDataTypes;
