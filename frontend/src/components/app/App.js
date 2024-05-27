
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';

import Header from '../header/Header';
import Footer from '../footer/Footer';

import {MainPage, Page404,
  AboutPage, CoursePage, CreateTaskOrLektionPage,
  LektionPage, LoginPage, RegistrationPage, ProfilePage,
  AdminPage, MainCoursePage, ReviewsPage, TaskPage} from "../pages";

function App() {

  return (
      <Router>
        <div className="app">
          <Header/>
          <main>
            <Routes>
              <Route path="/" element={<MainPage/>}/>
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/register" element={<RegistrationPage/>} />
              <Route path="/profile" element={<ProfilePage/>} />
              <Route path="/:courseId" element={<CoursePage/>}/>
              <Route path="/task/create" element={<CreateTaskOrLektionPage/>}/>
              <Route path="/about" element={<AboutPage/>}/>
              <Route path="/admin" element={<AdminPage/>}/>
              <Route path="/lektion/:lektionId" element={<LektionPage/>}/>
              <Route path="/task/:taskId" element={<TaskPage/>}/>
              <Route path="/user/course" element={<MainCoursePage/>}/>
              <Route path="/reviews" element={<ReviewsPage/>}/>
              <Route path="*" element={<Page404/>}/>
            </Routes>
          </main>
          <Footer/>
        </div>
      </Router>
  );
}

export default App;

