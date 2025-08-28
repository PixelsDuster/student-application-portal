import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { RootState } from "../../redux/store"

interface ApplicationSlice {
  applications: any[],
  error: any
}

const initialState: ApplicationSlice = {
  applications: [],
  error: null
}

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(createApplication.fulfilled, (state) => {
        state.error = null
      })
      .addCase(createApplication.rejected, (state, action) => {
        state.error = action.payload as string
      })
      
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.applications = action.payload
        state.error = null
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.error = action.payload as string
      })
      
      .addCase(deleteApplication.fulfilled, (state, action) => {
        state.applications = action.payload
        state.error = null
      })
      .addCase(deleteApplication.rejected, (state, action) => {
        state.error = action.payload as string
      })
  }
})

export const fetchApplications = createAsyncThunk(
  'application/fetchApplications',
  async(_, { getState, rejectWithValue }) => {
    try{
      const state = getState() as RootState
      const token: string = state.auth.accessToken
      const baseUrl = import.meta.env.VITE_API_URL
      const isAdmin: boolean = state.user.isAdministrator

      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }

      let response
      if(isAdmin){
        response = await fetch(`${baseUrl}/degreeCourseApplications`, requestOptions)
      }else {
        response = await fetch(`${baseUrl}/degreeCourseApplications/myApplications`, requestOptions)
      }
      
      if(!response.ok){
        return Promise.reject(response.statusText)
      }
      
      return await response.json()

    } catch(err: any){
      return rejectWithValue(err.message || "Fetching failed")
    }
  } 
)

export const createApplication = createAsyncThunk(
  'application/createApplication',
  async(newApplication: {
      applicantUserID: string,
      degreeCourseID: string,
      targetPeriodYear: number,
      targetPeriodShortName: string
  }, { getState, rejectWithValue }) => {
    try{
      const state = getState() as RootState
      const token: string = state.auth.accessToken
      const baseUrl = import.meta.env.VITE_API_URL

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newApplication)
      }
      const response = await fetch(`${baseUrl}/degreeCourseApplications`, requestOptions)
      
      if(!response.ok){
        return Promise.reject(response.statusText)
      }
      
      return await response.json()

    } catch(err: any){
      return rejectWithValue(err.message || "Adding failed")
    }
  }
) 

export const deleteApplication = createAsyncThunk(
  'application/deleteApplication',
  async(applicationID: string, { getState, rejectWithValue }) => {
    try{
      const state = getState() as RootState
      const token: string = state.auth.accessToken
      const baseUrl = import.meta.env.VITE_API_URL

      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      const response = await fetch(`${baseUrl}/degreeCourseApplications/${applicationID}`, requestOptions)
      
      if(!response.ok){
        return Promise.reject(response.statusText)
      }
      
      return await response.json()

    } catch(err: any){
      return rejectWithValue(err.message || "Deletion failed")
    }
  }
)

export default applicationSlice.reducer