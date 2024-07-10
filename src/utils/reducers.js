// import { SET_SERVICE_NAME, SET_SERVICE_ORDER } from './actions';
 
// const initialState = {
//   serviceName: '',
//   serviceOrder: [],
// };
 
// const serviceReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_SERVICE_NAME:
//       return {
//         ...state,
//         serviceName: action.payload,
//       };
//     case SET_SERVICE_ORDER:
//       return {
//         ...state,
//         serviceOrder: action.payload,
//       };
//     default:
//       return state;
//   }
// };
 
// export default serviceReducer;

// import { ADD_SERVICE_NAME } from './actions';
 
// const initialState = {
//   serviceNames: [],
// };
 
// const serviceReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_SERVICE_NAME:
//       return {
//         ...state,
//         serviceNames: [...state.serviceNames, action.payload],
//       };
//     default:
//       return state;
//   }
// };
 
// export default serviceReducer;
import { createSlice } from '@reduxjs/toolkit';
 
const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    serviceNames: [],
  },
  reducers: {
    addServiceName: (state, action) => {
      state.serviceNames.push(action.payload);
    },
    setServiceNames: (state, action) => {
      state.serviceNames = action.payload;
    },
  },
});
 
export const { addServiceName, setServiceNames } = servicesSlice.actions;
export default servicesSlice.reducer;