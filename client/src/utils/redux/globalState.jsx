import { createContext, useContext, useReducer } from 'react';
import { reducer, initialState } from './reducers';

const GlobalStateContext = createContext();
const { Provider } = GlobalStateContext;

const GlobalStateProvider = ({ value = {}, ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        ...value    
    });
    return <Provider value={[state, dispatch]} {...props} />;
}

const useGlobalState = () => {
    return useContext(GlobalStateContext);
}

export { GlobalStateProvider, useGlobalState };
