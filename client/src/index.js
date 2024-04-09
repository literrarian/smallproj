import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore'
import GenreStore from './store/GenreStore'
import MeetingStore from './store/MeetingStore'
import GameStore from './store/GameStore'

export const Context = createContext(null) //Context provides a way to pass data through the component tree without having to pass props down manually at every level.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        game: new GameStore(),
        genre: new GenreStore(),
        meeting: new MeetingStore()
    }}>
        <App /> 
    </Context.Provider>
 
);

