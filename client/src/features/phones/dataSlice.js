import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import dataService from './dataService'


const initialState = {
    phones: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const postNewNumber = createAsyncThunk('number/create',
    async(phone_number, thunkAPI)=>{
        try {
            return await dataService.postPhoneNumber(phone_number)
        } catch (error) {
            const message = ( error.response && error.response.data && error.response.data.message )
            || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
})
export const getNumbers = createAsyncThunk('numbers/getAll',
    async(_, thunkAPI)=>{
        try {
            return await dataService.getAll()
        } catch (error) {
            const message = ( error.response && error.response.data && error.response.data.message )
            || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
})

export const dataSlice = createSlice({
    name:'data',
    initialState,   
    reducers:{
        reset:(state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(postNewNumber.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(postNewNumber.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.phones.push(action.payload)
            })
            .addCase(postNewNumber.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
             .addCase(getNumbers.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(getNumbers.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.phones = action.payload
            })
            .addCase(getNumbers.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = dataSlice.actions
export default dataSlice.reducer