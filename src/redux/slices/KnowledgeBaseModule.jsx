import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getArticleAjax,
  getArticleNewAjaxUrl,
  getKnowledgeBaseAjaxUrl,
  loadKNowledgeBasedCount,
} from "../../api/Auth";

const initialState = {
  KnowledgeBaseData: {},
  isKnowledgeBaseData: false,
  articleDataForTrue: {},
  isarticleDataForTrue: false,
  articleDataForNew: {},
  isarticleDataForNew: false,
  KnowledgeBaseCount: {},
};

export const GetKnowledgeBase = createAsyncThunk(
  "KnowledgeBase/GetKnowledgeBase",
  async () => {
    try {
      const response = await fetch(getKnowledgeBaseAjaxUrl, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch");
      }
    } catch (error) {
      throw error;
    }
  }
);
export const getArticleForViewTrue = createAsyncThunk(
  "KnowledgeBase/getArticleForViewTrue",
  async ({ id, forView }, thunkApi) => {
    try {
      const response = await fetch(getArticleAjax(id, forView), {
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
export const getArticleForNewTrue = createAsyncThunk(
  "KnowledgeBase/getArticleForNewTrue",
  async (viewType, thunkApi) => {
    try {
      const response = await fetch(getArticleNewAjaxUrl(viewType), {
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
export const loadKNowledgeBasedCount_get = createAsyncThunk(
  "KnowledgeBase/loadKNowledgeBasedCount_get",
  async () => {
    try {
      const response = await fetch(loadKNowledgeBasedCount, {
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
const KnowledgeBaseSlice = createSlice({
  name: "KnowledgeBaseReducerModule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetKnowledgeBase.pending, (state) => {
        state.isKnowledgeBaseData = true;
      })
      .addCase(GetKnowledgeBase.fulfilled, (state, action) => {
        state.isKnowledgeBaseData = false;
        state.KnowledgeBaseData = action.payload;
      })
      .addCase(GetKnowledgeBase.rejected, (state, action) => {
        state.isKnowledgeBaseData = false;
      })
      .addCase(getArticleForViewTrue.pending, (state) => {
        state.isarticleDataForTrue = true;
      })
      .addCase(getArticleForViewTrue.fulfilled, (state, action) => {
        state.articleDataForTrue = action.payload;
        state.isarticleDataForTrue = false;
      })
      .addCase(getArticleForViewTrue.rejected, (state, action) => {
        state.isarticleDataForTrue = false;
      })
      .addCase(getArticleForNewTrue.pending, (state) => {
        state.isarticleDataForNew = true;
      })
      .addCase(getArticleForNewTrue.fulfilled, (state, action) => {
        state.articleDataForNew = action.payload;
        state.isarticleDataForNew = false;
      })
      .addCase(getArticleForNewTrue.rejected, (state, action) => {
        state.isarticleDataForNew = false;
      })
      .addCase(loadKNowledgeBasedCount_get.pending, (state) => {
        //state.articleDataForNew = true;
      })
      .addCase(loadKNowledgeBasedCount_get.fulfilled, (state, action) => {
        // state.articleDataForNew = false;
        state.KnowledgeBaseCount = action.payload;
      })
      .addCase(loadKNowledgeBasedCount_get.rejected, (state, action) => {
        // state.articleDataForNew = false;
      });
  },
});

export default KnowledgeBaseSlice.reducer;
