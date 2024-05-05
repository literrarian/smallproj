import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite'
import {Context} from '../index'
import {Pagination} from 'react-bootstrap'
import {useLocation} from "react-router-dom"
import {GAME_CAT_ROUTE} from '../utils/consts'

const Pages = observer(() => {

    const location = useLocation()
    const isGames = location.pathname === GAME_CAT_ROUTE
    let temp = []
    
    if (isGames){
        const {game} = useContext(Context)
         temp = game
    }
    else{
        const {meeting} = useContext(Context)
         temp = meeting
    }
    
    
    const pageCount = Math.ceil(temp.totalCount/temp.limit)
    const pages =[]
    for (let i = 0; i<pageCount;i++){
        pages.push(i+1) //номер страницы
    }
    return (
        <Pagination className={"mt-5"}>
            {pages.map(page =>
            <Pagination.Item 
                key={page}
                onClick={()=>temp.setPage(page)}
            >{page}</Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;