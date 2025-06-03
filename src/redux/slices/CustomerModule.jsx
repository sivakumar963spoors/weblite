import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  customerActivityForms,
  customerDetailsAPi,
  cutomerActivityUrl,
  getCustomersAjaxUrl,
  loadMetPast30DaysPercentage_ajax,
  loadNotMetPast30Days_ajax,
  loadNotMetPast30DaysByTeam_ajax,
  loadTodaysCustomerVisitsByTeam_ajax,
  loadtotalsCustomersCountUnderEmployees_ajax,
  loadYesterdayCustomerVisitsByTeam_ajax,
  todaysCustomerVisits_ajx,
  totalCustomersSize_ajax,
} from "../../api/Auth";
import { CustomerModuleMenu } from "../../components/customers/CustomerData";
const updateCustomerMenuCounts = (menu, state) => {
  return menu.map((item) => {
    const title = item.title;
    const countMap = {
      "Assigned to you": state.totalCustomersSize,
      "Visited today": state.todaysCustomerVisits,
      Coverage: state.loadNotMetPast30Days,
      "You haven't visited in the past 30 days":
        state.loadMetPast30DaysPercentage,
      "Assigned to team": state.loadtotalsCustomersCountUnderEmployees,
      "Visited by the team yesterday": state.loadYesterdayCustomerVisitsByTeam,
      "Visited by the team today": state.loadTodaysCustomerVisitsByTeam,
      "Team hasn't visited in the past 30 days":
        state.loadNotMetPast30DaysByTeam,
    };

    const updatedCount = countMap[title];
    return {
      ...item,
      count: updatedCount !== undefined ? updatedCount : item.count,
    };
  });
};

const initialState = {
  CustomerModuleMenu: CustomerModuleMenu,
  totalCustomersSize: 0,
  todaysCustomerVisits: 0,
  loadNotMetPast30Days: 0,
  loadMetPast30DaysPercentage: 0,
  loadTodaysCustomerVisitsByTeam: 0,
  loadYesterdayCustomerVisitsByTeam: 0,
  loadtotalsCustomersCountUnderEmployees: 0,
  filteredCustomerData: [],
  loadNotMetPast30DaysByTeam: 0,
  getAllCustomerData: {},
  isgetAllCustomerData: false,
  customerViewTypeTitle: "",
  displayCountForCustomerModule: 0,
  get_selectedCustomerDetails_data: {},
  isGetSelectedCustomer: false,
  customerActivity_data: {},
  isGetcustomerActivity_data: false,
  get_customerActivityForms_data: {},
  isget_customerActivityForms: false,
};
export const totalCustomersSize_get = createAsyncThunk(
  "CustomerModule/totalCustomersSize_get",
  async () => {
    try {
      const response = await fetch(totalCustomersSize_ajax, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {}
  }
);
export const todaysCustomerVisits_get = createAsyncThunk(
  "CustomerModule/todaysCustomerVisits_get",
  async () => {
    try {
      const response = await fetch(todaysCustomerVisits_ajx, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {}
  }
);
export const loadNotMetPast30Days_get = createAsyncThunk(
  "CustomerModule/loadNotMetPast30Days_get",
  async () => {
    try {
      const response = await fetch(loadNotMetPast30Days_ajax, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = response.json();
        return data;
      }
    } catch (error) {}
  }
);
export const loadMetPast30DaysPercentage_get = createAsyncThunk(
  "CustomerModule/loadMetPast30DaysPercentage_get",
  async () => {
    try {
      const response = await fetch(loadMetPast30DaysPercentage_ajax, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {}
  }
);
export const loadtotalsCustomersCountUnderEmployees_get = createAsyncThunk(
  "CustomerModule/loadtotalsCustomersCountUnderEmployees_get",
  async () => {
    try {
      const response = await fetch(
        loadtotalsCustomersCountUnderEmployees_ajax,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {}
  }
);
export const loadYesterdayCustomerVisitsByTeam_get = createAsyncThunk(
  "CustomerModule/loadYesterdayCustomerVisitsByTeam_get",
  async () => {
    try {
      const response = await fetch(loadYesterdayCustomerVisitsByTeam_ajax, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {}
  }
);
export const loadNotMetPast30DaysByTeam_get = createAsyncThunk(
  "CustomerModule/loadNotMetPast30DaysByTeam_get",
  async () => {
    try {
      const response = await fetch(loadNotMetPast30DaysByTeam_ajax, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {}
  }
);
export const loadTodaysCustomerVisitsByTeam_get = createAsyncThunk(
  "CustomerModule/loadTodaysCustomerVisitsByTeam_get",
  async () => {
    try {
      const response = await fetch(loadTodaysCustomerVisitsByTeam_ajax, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {}
  }
);

export const get_allCustomer = createAsyncThunk(
  "CustomerModule/get_allCustomer",
  async (queryParams, thunkAPI) => {
    try {
      const response = await fetch(getCustomersAjaxUrl(queryParams), {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {}
  }
);
export const get_selectedCustomerDetails = createAsyncThunk(
  "CustomerModule/get_selectedCustomerDetails",
  async (queryParams, thunkAPI) => {
    try {
      const response = await fetch(customerDetailsAPi(queryParams), {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {}
  }
);

export const GetcustomerActivity_data = createAsyncThunk(
  "CustomerModule/GetcustomerActivity_data",
  async (queryParams, thunkAPI) => {
    try {
      const response = await fetch(cutomerActivityUrl(queryParams), {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {}
  }
);
export const get_customerActivityForms = createAsyncThunk(
  "CustomerModule/get_customerActivityForms",
  async (queryParams, thunkAPI) => {
    try {
      const response = await fetch(customerActivityForms(queryParams), {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {}
  }
);


const CustomerModule = createSlice({
  name: "CustomerModule",
  initialState,
  reducers: {
    filterCustomer: (state, action) => {
      const searchText = action.payload
        ? action.payload.toLowerCase().trim()
        : "";

      if (!searchText) {
        state.filteredCustomerData = state.getAllCustomerData?.customers || [];
        return;
      }

      state.filteredCustomerData = (
        state.getAllCustomerData?.customers || []
      ).filter((item) =>
        item.customerName && typeof item.customerName === "string"
          ? item.customerName.toLowerCase().includes(searchText)
          : false
      );

      if (state.filteredCustomerData.length === 0) {
        console.warn("No matching customers found for:", searchText);
      }
    },

    resetCustomerData: (state) => {
      state.filteredCustomerData = state.getAllCustomerData?.customers || [];
    },

    setTitleForCustomerView: (state, action) => {
      state.customerViewTypeTitle = action.payload;
    },
    setDisplayCount: (state, action) => {
      state.displayCountForCustomerModule = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(totalCustomersSize_get.pending, (state, action) => {})
      .addCase(totalCustomersSize_get.fulfilled, (state, action) => {
        state.totalCustomersSize = action.payload;
        state.CustomerModuleMenu = updateCustomerMenuCounts(
          CustomerModuleMenu,
          state
        );
      })
      .addCase(totalCustomersSize_get.rejected, (state, action) => {})
      .addCase(todaysCustomerVisits_get.pending, (state, action) => {})
      .addCase(todaysCustomerVisits_get.fulfilled, (state, action) => {
        state.todaysCustomerVisits = action.payload;
        state.CustomerModuleMenu = updateCustomerMenuCounts(
          CustomerModuleMenu,
          state
        );
      })
      .addCase(todaysCustomerVisits_get.rejected, (state, action) => {})
      .addCase(loadNotMetPast30Days_get.pending, (state, action) => {})
      .addCase(loadNotMetPast30Days_get.fulfilled, (state, action) => {
        state.loadNotMetPast30Days = action.payload;
        state.CustomerModuleMenu = updateCustomerMenuCounts(
          CustomerModuleMenu,
          state
        );
      })
      .addCase(loadNotMetPast30Days_get.rejected, (state, action) => {})
      .addCase(loadNotMetPast30DaysByTeam_get.pending, (state, action) => {})
      .addCase(loadNotMetPast30DaysByTeam_get.fulfilled, (state, action) => {
        state.loadNotMetPast30DaysByTeam = action.payload;
        state.CustomerModuleMenu = updateCustomerMenuCounts(
          CustomerModuleMenu,
          state
        );
      })
      .addCase(loadNotMetPast30DaysByTeam_get.rejected, (state, action) => {})
      .addCase(loadMetPast30DaysPercentage_get.pending, (state, action) => {})
      .addCase(loadMetPast30DaysPercentage_get.fulfilled, (state, action) => {
        state.loadMetPast30DaysPercentage = action.payload;
        state.CustomerModuleMenu = updateCustomerMenuCounts(
          CustomerModuleMenu,
          state
        );
      })
      .addCase(loadMetPast30DaysPercentage_get.rejected, (state, action) => {})
      .addCase(
        loadtotalsCustomersCountUnderEmployees_get.pending,
        (state, action) => {}
      )
      .addCase(
        loadtotalsCustomersCountUnderEmployees_get.fulfilled,
        (state, action) => {
          state.loadtotalsCustomersCountUnderEmployees = action.payload;
          state.CustomerModuleMenu = updateCustomerMenuCounts(
            CustomerModuleMenu,
            state
          );
        }
      )
      .addCase(
        loadtotalsCustomersCountUnderEmployees_get.rejected,
        (state, action) => {}
      )
      .addCase(
        loadYesterdayCustomerVisitsByTeam_get.pending,
        (state, action) => {}
      )
      .addCase(
        loadYesterdayCustomerVisitsByTeam_get.fulfilled,
        (state, action) => {
          state.loadYesterdayCustomerVisitsByTeam = action.payload;
          state.CustomerModuleMenu = updateCustomerMenuCounts(
            CustomerModuleMenu,
            state
          );
        }
      )
      .addCase(
        loadYesterdayCustomerVisitsByTeam_get.rejected,
        (state, action) => {}
      )
      .addCase(
        loadTodaysCustomerVisitsByTeam_get.pending,
        (state, action) => {}
      )
      .addCase(
        loadTodaysCustomerVisitsByTeam_get.fulfilled,
        (state, action) => {
          state.loadTodaysCustomerVisitsByTeam = action.payload;
          state.CustomerModuleMenu = updateCustomerMenuCounts(
            CustomerModuleMenu,
            state
          );
        }
      )
      .addCase(
        loadTodaysCustomerVisitsByTeam_get.rejected,
        (state, action) => {}
      )

      .addCase(get_allCustomer.pending, (state, action) => {
        state.isgetAllCustomerData = true;
      })
      .addCase(get_allCustomer.fulfilled, (state, action) => {
        state.getAllCustomerData = action.payload;
        state.filteredCustomerData = action?.payload?.customers || [];

        state.isgetAllCustomerData = false;
      })
      .addCase(get_allCustomer.rejected, (state, action) => {
        state.isgetAllCustomerData = false;
      })
      .addCase(get_selectedCustomerDetails.pending, (state, action) => {
        state.isGetSelectedCustomer = true;
      })
      .addCase(get_selectedCustomerDetails.fulfilled, (state, action) => {
        state.get_selectedCustomerDetails_data = action.payload;

        state.isGetSelectedCustomer = false;
      })
      .addCase(get_selectedCustomerDetails.rejected, (state, action) => {
        state.isGetSelectedCustomer = false;
      })
      .addCase(GetcustomerActivity_data.pending, (state, action) => {
        state.isGetcustomerActivity_data = true;
      })
      .addCase(GetcustomerActivity_data.fulfilled, (state, action) => {
        state.customerActivity_data = action.payload;

        state.isGetcustomerActivity_data = false;
      })
      .addCase(GetcustomerActivity_data.rejected, (state, action) => {
        state.isGetcustomerActivity_data = false;
      })
      .addCase(get_customerActivityForms.pending, (state, action) => {
        state.isget_customerActivityForms = true;
      })
      .addCase(get_customerActivityForms.fulfilled, (state, action) => {
        state.get_customerActivityForms_data = action.payload;

        state.isget_customerActivityForms = false;
      })
      .addCase(get_customerActivityForms.rejected, (state, action) => {
        state.isget_customerActivityForms = false;
      });
  },
});

export default CustomerModule.reducer;
export const {
  filterCustomer,
  resetCustomerData,
  setTitleForCustomerView,
  setDisplayCount,
} = CustomerModule.actions;
