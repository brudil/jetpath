import storeProd from './configureStore.prod';
import storeDev from './configureStore.prod';

const store = process.env.NODE_ENV === 'production' ? storeProd : storeDev;

export default store;
