import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Home from './pages/Theme/Dark/Home';
import Login from './pages/Theme/Dark/Login';
import Register from './pages/Theme/Dark/register';
import LoginLight from './pages/Theme/Light/Login';
import RegisterLight from './pages/Theme/Light/register';   //에러 신경쓰지말것
import Message from './pages/Theme/Dark/Message';
import Follower from './pages/Theme/Dark/Follower';


//라우터 주석 물어보기
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'Home', element: <Home /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'login2', element: <LoginLight /> },
      { path: 'register2', element: <RegisterLight />},
      { path: 'message', element: <Message />},
      { path: 'follow', element: <Follower />},
    ]    
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
