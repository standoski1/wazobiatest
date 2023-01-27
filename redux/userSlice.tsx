import { createSlice } from '@reduxjs/toolkit'
 
  export const userSlice = createSlice({
         name: 'user',
         initialState: {
           username: '',
           accessToken:'',
           id:''
         },
      reducers: {
      loginUser: (state,action) => {
         state.username = action.payload.username
         state.accessToken = action.payload.token
         state.id = action.payload._id
       },
      logoutUser: (state) => {
         state.username = ''
         state.accessToken = ''
         state.id = ''
       }
     }
  })

  export const { loginUser, logoutUser } = userSlice.actions
  export default userSlice.reducer