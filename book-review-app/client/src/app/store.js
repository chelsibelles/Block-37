import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Import your combined reducers if you have multiple

const store = configureStore({
  reducer: rootReducer, // Pass in your root reducer
  // You can also add middleware and devTools configuration here if needed
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export default store;
