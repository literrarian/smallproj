import {Button, Col, Container, Row} from "react-bootstrap";
import React, {useContext, useState,useEffect} from "react";
import {Context} from '../index'
import {observer} from "mobx-react-lite"
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart,Bar} from 'recharts';
import {getCountRegDates} from'../http/UserAPI'
import {getGenreCount} from'../http/GenreAPI'

const ExcelJS = require('exceljs');

const Statistics = observer(() => {
    const [userData, setUserData] = useState([]);
    const [genreData,setGenreData] = useState([])
    let essGenreData={};
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

    const exportToExcel = () => {
        const workbook = new ExcelJS.Workbook();
        const sheetRegs = workbook.addWorksheet('Регистрации');
        const sheetGenres = workbook.addWorksheet('Жанры');
        let headersUsers = Object.keys(userData[0]);
        let headersGenres = ['name','gameCount'];
       
        sheetRegs.addRow(headersUsers);
        sheetGenres.addRow(headersGenres);
        userData.forEach(row=>{
            let values = headersUsers.map(header => row[header]);
            sheetRegs.addRow(values)
        })

        genreData.forEach(row=>{
            let values = headersGenres.map(header => row[header]);
            sheetGenres.addRow(values)
        })

        workbook.xlsx.writeBuffer()
            .then(buffer => {
                const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); //binary large obj
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'Статистика.xlsx';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch(err => {
                console.error('Ошибка:', err);
            });
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