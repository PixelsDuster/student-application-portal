import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../redux/store"

interface UserState {
  isAdministrator: boolean,
  userID: string,
  users: any[],
  error: any
}

const initialState: UserState = {
  isAdministrator: false,
  userID: "",
  users: [],
  error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setUserInfo(state, action: PayloadAction<{ userID: string; isAdministrator: boolean }>){
        state.userID = action.payload.userID
        state.isAdministrator = action.payload.isAdministrator
      },
      clearUserInfo(state){
        state.userID = ""
        state.isAdministrator = false
      }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload
            state.error = null
          })
          .addCase(fetchUsers.rejected, (state, action) => {
            state.error = action.payload as string
          })

          .addCase(addUser.fulfilled, (state) => {
            state.error = null
          })
          .addCase(addUser.rejected, (state, action) => {
            state.error = action.payload as string
          })

          .addCase(editUser.fulfilled, (state) => {
            state.error = null
          })
          .addCase(editUser.rejected, (state, action) => {
            state.error = action.payload as string
          })

          .addCase(deleteUser.fulfilled, (state) => {
            state.error = null
          })
          .addCase(deleteUser.rejected, (state, action) => {
            state.error = action.payload as string
          })
      }
})

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
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
      const response = await fetch(`${baseUrl}/users`, requestOptions)
      
      if(!response.ok){
        return Promise.reject(response.statusText)
      }
      
      return await response.json()

    } catch(err: any){
      return rejectWithValue(err.message || "Fetching failed")
    }
  } 
)

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async(userID: string, { getState, rejectWithValue }) => {
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
      const response = await fetch(`${baseUrl}/users/${userID}`, requestOptions)
      
      if(!response.ok){
        return Promise.reject(response.statusText)
      }
      
      return await response.json()

    } catch(err: any){
      return rejectWithValue(err.message || "Deletion failed")
    }
  }
)

export const editUser = createAsyncThunk(
  'user/editUser',
  async(updatedUser: {
    userID: string,
    firstName: string,
    lastName: string,
    password: string,
    isAdministrator: boolean
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
        body: JSON.stringify(updatedUser)
      }
      const response = await fetch(`${baseUrl}/users/${updatedUser.userID}`, requestOptions)
      
      if(!response.ok){
        return Promise.reject(response.statusText)
      }
      
      return await response.json()

    } catch(err: any){
      return rejectWithValue(err.message || "Update failed")
    }
  }
)

export const addUser = createAsyncThunk(
  'user/addUser',
  async(newUser: {
    userID: string,
    firstName: string,
    lastName: string,
    password: string,
    isAdministrator: boolean
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
        body: JSON.stringify(newUser)
      }
      const response = await fetch(`${baseUrl}/users`, requestOptions)
      
      if(!response.ok){
        return Promise.reject(response.statusText)
      }
      
      return await response.json()

    } catch(err: any){
      return rejectWithValue(err.message || "Adding failed")
    }
  }
)


export const { setUserInfo, clearUserInfo } = userSlice.actions
export default userSlice.reducer