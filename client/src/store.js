import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import wordsReducer from "./reduxFolder/wordsSlice";
import ranReducer from "./reduxFolder/ranSlice"
import scoreReducer from "./reduxFolder/scoreSlice"
import overallReducer from "./reduxFolder/overallSlice"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    words: wordsReducer,
    ran_words: ranReducer,
    score: scoreReducer,
    overall: overallReducer
    
    // This is where you register your slice reducers
    // Example: counter: counterReducer,
  },
});
