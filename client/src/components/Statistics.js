import {Button, Col, Container, Row} from "react-bootstrap";
import React, {useContext, useState,useEffect} from "react";
import {Context} from '../index'
import {observer} from "mobx-react-lite"
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart,Bar} from 'recharts';
import {getCountRegDates} from'../http/UserAPI'
import {getGenreCount} from'../http/GenreAPI'


const Statistics = observer(() => {
    const [userData, setUserData] = useState([]);
    const [genreData,setGenreData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const regData = await getCountRegDates();
                const genreCountData = await getGenreCount();
                const groupedGenreData = groupGenreData(genreCountData);
                setUserData(regData);
                setGenreData(groupedGenreData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    const groupGenreData = (data) => {
        const groupedData = data.reduce((group, cur) => {
            if (+cur.gameCount === 0) {
                group[0].gameCount += 1;
                
            } else {
                group.push(cur);
            }
            return group;
        }, [{ id: '0', name: 'Не использован в игре', gameCount: 0 }]);
        return groupedData;
    };
  
    const exportToExcel = () =>{
        console.log(userData)
    }   
        return (
            <Container className={"mt-4"}>
              <Row className={"d-flex justify-content-center"}>
                  <Col md={8}>
                    <h5>Количество зарегистрировавшихся пользователей по дням</h5>
                    <div style={{width: '100%', height: 300}}>
                        <ResponsiveContainer>
                            <LineChart data={userData} margin={{top: 20, right: 30, left: 20, bottom: 10}}>
                                <XAxis dataKey="date"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Line type="monotone" dataKey="count" stroke="#8884d8" name="Количество регистраций"/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <h5 className={"mt-4"}>Количество игр каждого жанра</h5>
                    <div style={{width: '100%', height: 300}}>
                       <ResponsiveContainer>
                            <BarChart data={genreData}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="gameCount" fill="#82ca9d" name="Количество игр"/>
                            </BarChart>
                        </ResponsiveContainer>
                        
                    </div>
                      <Button variant={"dark"} className={"mt-2"} onClick={exportToExcel}> Экспорт статистики в Эксель</Button>
                  </Col>
              </Row>
            </Container>
        )

    }
)
export default Statistics;