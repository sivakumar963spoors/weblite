import { createSlice } from '@reduxjs/toolkit';
import { menuItem } from '../../components/navbar/TopBarData';


const initialState = {
  menuItems:menuItem,
  currentMenuTitle: localStorage.getItem("menuTiles") || "Home",
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
  toggleMenuTitle: (state, action) => {
     state.currentMenuTitle = action.payload;
 
    },
  },
});


export const { toggleMenuTitle } = menuSlice.actions;

export default menuSlice.reducer;
