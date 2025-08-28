import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { jwtDecode } from "jwt-decode";
import { setUserInfo } from './userSlice'

interface AuthState {
  loginPending: boolean,
  showLoginDialog: boolean,
  isAuthenticated: boolean,
  accessToken: string,
  error: any
}

const initialState: AuthState = {
  showLoginDialog: false,
  loginPending: false,
  isAuthenticated: false,
  accessToken: "",
  error: null
}

export const authenticateUser = createAsyncThunk(
  'auth/authenticateUser',
  async ({ userID, password }: { userID: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const result = await login(userID, password)

      const decoded: any = jwtDecode(result.accessToken)

      dispatch(setUserInfo({
        userID: decoded.userID,
        isAdministrator: decoded.isAdministrator
      }))

      return result
    } catch (err: any) {
      return rejectWithValue(err.message || "Login failed")
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    showLoginDialog(state) {
      state.showLoginDialog = true
    },
    hideLoginDialog(state) {
      state.showLoginDialog = false
    },
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false
      state.accessToken = ""
      state.loginPending = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loginPending = true
        state.error = null
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.loginPending = false
        state.isAuthenticated = true
        state.accessToken = action.payload.accessToken
        state.showLoginDialog = false
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loginPending = false
        state.error = action.payload as string
      })
  }
})

export async function login(userID: string, password: string) {
  const auth = btoa(`${userID}:${password}`)
  const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${auth}`
    }
  }

  const baseUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${baseUrl}/authenticate`, requestOptions)
  return handleResponse(response)
}

export async function handleResponse(response: Response) {
  const authorizationHeader = response.headers.get('Authorization')
  
  console.log("authentication header: " + authorizationHeader)
  
  let token = ''

  if (authorizationHeader) {
    const parts = authorizationHeader.split(' ')
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1]
    }
  }
  else{
    return Promise.reject("Missing Authorization header")
  }

  if (!response.ok) {
    if (response.status === 401) {
      logout()
      return Promise.reject("Unauthorized")
    }
    const error = response.statusText
    return Promise.reject(error)
  }

  return {
    accessToken: token
  }
}

export const { showLoginDialog, hideLoginDialog, setAuthenticated, logout } = authSlice.actions
export default authSlice.reducer