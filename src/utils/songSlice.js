import { createSlice } from "@reduxjs/toolkit";

const songSlice=createSlice({
    name:'song',
    initialState:{
        isPlaying:false,
        currentPlayingIndex:null
    },
    reducers:{
        togglePlay:(state,action)=>{

             state.isPlaying=!state.isPlaying;
        },
        makeIsPlayingFalse:(state)=>{
            state.isPlaying=false;
        },
        setCurrentPlayingIndex: (state, action) => {
            state.currentPlayingIndex = action.payload;
          },
    }
});
export const {togglePlay,makeIsPlayingFalse,setCurrentPlayingIndex}=songSlice.actions;
export default songSlice.reducer;