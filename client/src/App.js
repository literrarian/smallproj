import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {NavBar} from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {Spinner} from "react-bootstrap";
import {check} from './http/UserAPI'
const App = observer(() => {
    const {user} = useContext(Context)
    const [loading,setLoading] = useState(true)
 //один раз при первом запуске, чтоб не перерендерить навбар и он не вел себя плохо
    useEffect(() => {
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    
    return(
      <BrowserRouter>
        <NavBar />
          <AppRouter />
      </BrowserRouter>
  )
})


export default App;
