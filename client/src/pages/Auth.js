import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {REGISTRATION_ROUTE, LOGIN_ROUTE,GAME_CAT_ROUTE} from '../utils/consts'
import {NavLink, useLocation, useNavigate} from "react-router-dom"
import {registration,login} from '../http/UserAPI'
import {observer} from "mobx-react-lite";
import {Context} from "../index"

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [inputType, setInputType] = useState("text");
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [nickname,setNickname] = useState('')
    const [age,setAge] = useState('')
   const click = async ()=>{
       try{
           let data;
           if(isLogin) {
               data = await login(email,password)
           }
           else
           {
               data = await registration(email,password,nickname,age)
           }
           user.setUser(user)
           user.setIsAuth(true) 
           navigate(GAME_CAT_ROUTE)
       } catch (e) {
           alert(e.response.data.message)
       }
       
   }
    return (
        <Container className={"d-flex justify-content-center align-items-center"}
        style={{height: window.innerHeight-54}}
        >
           <Card style={{width:600}} className={"p-5"}>
               <h2 className={"m-auto"}>{isLogin ? "Вход" : "Регистрация"} </h2>
               <Form className={"d-flex flex-column"}>
                   {isLogin ? 
                       <div>
                        <Form.Control
                        className={"mt-2"}
                        placeholder="Введите email..."
                        value={email}
                        onChange={e=> setEmail(e.target.value)}
                        />
                        <Form.Control
                           className={"mt-2"}
                           placeholder="Введите пароль..."
                           type={"password"}
                           value={password}
                           onChange={e=> setPassword(e.target.value)}
                        />
                       </div>
                       :
                       <div>
                       <Form.Control
                       className={"mt-2"}
                       placeholder="Введите email..."
                       value={email}
                       onChange={e=> setEmail(e.target.value)}
                       />
                       <Form.Control
                           className={"mt-2"}
                           placeholder="Введите пароль..."
                           type={"password"}
                           value={password}
                           onChange={e=> setPassword(e.target.value)}
                       />
                       <Form.Control
                           className={"mt-2"}
                           placeholder="Введите имя..."
                           value={nickname}
                           onChange={e=> setNickname(e.target.value)}
                       />
                       <Form.Control
                           className={"mt-2"}
                           type={inputType}
                           placeholder="Введите дату рождения..." //Костылина с стекоферфлоу - без нее не показывает плейсхолдер
                           onFocus={() => setInputType("date")}
                           onBlur={() => setInputType("text")}

                           value={age}
                           onChange={e=> setAge(e.target.value)}
                           
                       />
                       </div>
                   }
                   <div className={"mt-3 d-flex flex-row justify-content-between align-items-center"}>
                       {isLogin ? 
                           <NavLink to={REGISTRATION_ROUTE}> Зарегистрироваться?</NavLink> 
                           : 
                           <NavLink to={LOGIN_ROUTE}> Войти?</NavLink>  
                       }   
                       <Button  variant={"outline-primary"} onClick={click}>
                           {isLogin ? 'Войти' :'Регистрация'}
                           
                       </Button>  
                   </div>
                   
               </Form> 
           </Card>
            
        </Container>
    );
});

export default Auth;