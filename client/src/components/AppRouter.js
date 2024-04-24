import React, {useContext} from 'react';
import {Routes,Route} from 'react-router-dom'
import {authRoutes, publicRoutes} from '../routes'
import GameCataloguePage from '../pages/GameCataloguePage'
import {Context} from '../index'

const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {publicRoutes.map(route =>{
                const Component = route.component;
                return <Route key={route.path} path={route.path} element={<Component />} exact/>})
            }
                
            {user.isAuth && authRoutes.map(route =>{
                const Component = route.component;
                return <Route key={route.path} path={route.path} element={<Component />} exact/>})
            }
            <Route path="*" element={<GameCataloguePage/>} exact/> 
        </Routes>
       
        
    );
};

export default AppRouter;