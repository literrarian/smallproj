import React,{useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {REGISTRATION_ROUTE, LOGIN_ROUTE} from '../utils/consts'
import {NavLink, useLocation} from "react-router-dom"
const Auth = () => {
   const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    
    const [inputType, setInputType] = useState("text");
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
                        />
                        <Form.Control
                           className={"mt-2"}
                           placeholder="Введите пароль..."
                        />
                       </div>
                       :
                       <div>
                       <Form.Control
                       className={"mt-2"}
                       placeholder="Введите email..."
                       />
                       <Form.Control
                           className={"mt-2"}
                           placeholder="Введите пароль..."
                       />
                       <Form.Control
                           className={"mt-2"}
                           placeholder="Введите имя..."
                       />
                       <Form.Control
                           className={"mt-2"}
                           type={inputType}
                           placeholder="Введите дату рождения..." //Костылина с стекоферфлоу - без нее не показывает плейсхолдер
                           onFocus={() => setInputType("date")}
                           onBlur={() => setInputType("text")}
                           
                       />
                       </div>
                   }
                   <div className={"mt-3 d-flex flex-row justify-content-between align-items-center"}>
                       {isLogin ? 
                           <NavLink to={REGISTRATION_ROUTE}> Зарегистрироваться?</NavLink> 
                           : 
                           <NavLink to={LOGIN_ROUTE}> Войти?</NavLink>  
                       }   
                       <Button  variant={"outline-primary"}>
                           {isLogin ? 'Войти' :'Регистрация'}
                           
                       </Button>  
                   </div>
                   
               </Form> 
           </Card>
            
        </Container>
    );
};

export default Auth;