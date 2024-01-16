import {createSlice} from "@reduxjs/toolkit"

const OwnerSlice = createSlice({
  name:"owner",
  initialState:{
    token:"",
    owner:null
  },
  reducers:{
    ownerLogin:(state,action) => {
      state.token = action.payload.token
      state.owner = action.payload.owner
    },
    ownerLogout:(state) => {
      state.owner = {
        token:"",
        owner:null
      }
    }
  }
})
export const {ownerLogin,ownerLogout} = OwnerSlice.actions
export default OwnerSlice.reducer