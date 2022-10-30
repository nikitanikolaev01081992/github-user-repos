import { createContext } from 'react';
import RootStore from '../stores/RootStore';

// ====================================================================================================================
const RootStoreContext = createContext<RootStore>(RootStore.getInstance());

// ====================================================================================================================
export default RootStoreContext;
