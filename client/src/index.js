import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore'

export const Context = createContext(null) //Context provides a way to pass data through the component tree without having to pass props down manually at every level.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserStore()
    }}>
        <App /> 
    </Context.Provider>
 
);

