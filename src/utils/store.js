import {configureStore} from '@reduxjs/toolkit';
import servicesReducer from './reducers';

const store = configureStore({
    reducer: {
        services: servicesReducer,
    },
});

export default store;