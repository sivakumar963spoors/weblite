import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "../formdata/datepicker.css";
import ReusableTextfield from "../common/ReusableTextfield";
import { datepickerStyles } from "./FormData_style";
const AllFormDataTypes = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <Stack sx={{"& > *": { mt: 2, textTransform:'capitalize' } }}>
      <Stack>
        <Typography sx={{ "& > span": { color: "red" } }}>
          currency
          <Typography component={"span"}>*</Typography>
        </Typography>
        <ReusableTextfield />
      </Stack>
      <Stack>
        <Typography sx={{ "& > span": { color: "red" } }}>
          date and Time
          <Typography component={"span"}>*</Typography>
        </Typography>

        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          dateFormat="yyyy-MM-dd h:mm aa"
          customInput={<input style={datepickerStyles.customDatepicker} />}
        />
      </Stack>
      <Stack>
        <Typography>Time</Typography>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
          customInput={<input style={datepickerStyles.customDatepicker} />}
        />
      </Stack>
      <Stack>
        <Typography>Date</Typography>
        <DatePicker
          showIcon
          toggleCalendarOnIconClick
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          customInput={<input style={datepickerStyles.customDatepicker} />}
        />
      </Stack>
    </Stack>
  );
};

export default AllFormDataTypes;
