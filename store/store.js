import { configureStore } from '@reduxjs/toolkit';
import thingspeakReducer from './thingspeak'

export const store = configureStore({
  reducer: {
    thingspeak: thingspeakReducer
  }
})