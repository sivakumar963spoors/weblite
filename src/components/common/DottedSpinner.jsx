import { CircularProgress } from "@mui/material";

const DottedSpinner = ({ size = 24, color = "black", thickness = 5 }) => {
  return (
    <CircularProgress
      size={size}
      thickness={thickness}
      sx={{
        color,
        '& circle': {
          strokeDasharray: '2, 6',        // dot size and gap
          strokeLinecap: 'round',         // round dots
          animation: 'dotted-spin 1.2s linear infinite',
        },
        '@keyframes dotted-spin': {
          from: { strokeDashoffset: 0 },
          to: { strokeDashoffset: -20 },
        },
      }}
    />
  );
};

export default DottedSpinner;
