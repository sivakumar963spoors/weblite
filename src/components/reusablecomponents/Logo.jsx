import React from 'react';
import { SvgIcon } from '@mui/material';

const Logo = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24" sx={{ width: 40, height: 40 }}>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12 6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.5c-5.75 0-10.5-4.75-10.5-10.5S6.25 1.5 12 1.5 22.5 6.25 22.5 12 17.75 22.5 12 22.5z" />
      <path d="M16 12h-8v-1.5h8V12zm0-3h-8v-1.5h8V9zm0-3h-8V5h8v1.5z" />
    </SvgIcon>
  );
};

export default Logo;
