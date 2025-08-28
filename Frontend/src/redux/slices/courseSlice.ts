import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { RootState } from "../../redux/store"

interface CourseState {
  courses: any[],
  error: any
}

const initialState: CourseState = {
  courses: [],
  error: null
}

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
            builder
              .addCase(fetchCourses.fulfilled, (state, action) => {
                state.courses = action.payload
                state.error = null
              })
              .addCase(fetchCourses.rejected, (state, action) => {
                state.error = action.payload as string
              })

              .addCase(deleteCourse.fulfilled, (state) => {
                state.error = null
              })
              .addCase(deleteCourse.rejected, (state, action) => {
                state.error = action.payload as string
              })

              .addCase(editCourse.fulfilled, (state) => {
                state.error = null
              })
              .addCase(editCourse.rejected, (state, action) => {
                state.error = action.payload as string
              })
            
              .addCase(addCourse.fulfilled, (state) => {
                state.error = null
              })
              .addCase(addCourse.rejected, (state, action) => {
                state.error = action.payload as string
              })
    }
})

export const fetchCourses = createAsyncThunk(
    'course/fetchCourses',
  async(_, { getState, rejectWithValue }) => {
    try{
      const state = getState() as RootState
      const token: string = state.auth.accessToken
      const baseUrl = import.meta.env.VITE_API_URL

      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      const response = await fetch(`${baseUrl}/degreeCourses`, requestOptions)
      
      if(!response.ok){
        return Promise.reject(response.statusText)
      }
      
      return await response.json()

    } catch(err: any){
      return rejectWithValue(err.message || "Fetching failed")
    }
  } 
)

export const deleteCourse = createAsyncThunk(
  'course/deleteCourse',
  async(courseID: string, { getState, rejectWithValue }) => {
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
      const response = await fetch(`${baseUrl}/degreeCourses/${courseID}`, requestOptions)
      
      if(!response.ok){
        return Promise.reject(response.statusText)
      }
      
      return await response.json()

    } catch(err: any){
      return rejectWithValue(err.message || "Deletion failed")
    }
  }
)

export const editCourse = createAsyncThunk(
  'course/editCourse',
  async(updatedCourse: {
    courseID: string,
    name: string,
    shortName: string,
    universityName: string,
    universityShortName: string,
    departmentName: string,
    departmentShortName: string
  }, { getState, rejectWithValue }) => {
    try{
      const state = getState() as RootState
      const token: string = state.auth.accessToken
      const baseUrl = import.meta.env.VITE_API_URL

      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedCourse)
      }
      const response = await fetch(`${baseUrl}/degreeCourses/${updatedCourse.courseID}`, requestOptions)
      
      if(!response.ok){
        return Promise.reject(response.statusText)
      }
      
      return await response.json()

    } catch(err: any){
      return rejectWithValue(err.message || "Update failed")
    }
  }
)

export const addCourse = createAsyncThunk(
    'course/addCourse',
  async(newCourse: {
    name: string,
    shortName: string,
    universityName: string,
    universityShortName: string,
    departmentName: string,
    departmentShortName: string
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
        body: JSON.stringify(newCourse)
      }
      const response = await fetch(`${baseUrl}/degreeCourses`, requestOptions)
      
      if(!response.ok){
        return Promise.reject(response.statusText)
      }
      
      return await response.json()

    } catch(err: any){
      return rejectWithValue(err.message || "Adding failed")
    }
  }
)


export default courseSlice.reducer