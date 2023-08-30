import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainCalendar from './pages/Calendar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Equipment from './pages/Equipment';
import People from './pages/People';
import ProjectInfo from './pages/ProjectInfo';
import ProrationPage from './pages/Proration';



function Routing(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/calendar"} element={<MainCalendar/>}/>
                <Route path={"/projects"} element={<Projects/>}/>
                <Route path={"/people"} element={<People/>}/>
                <Route path={"/equipment"} element={<Equipment/>}/>
                <Route path={"/projects/:id"} element={<ProjectInfo/>}/>
                <Route path={"/proration"} element={<ProrationPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;
