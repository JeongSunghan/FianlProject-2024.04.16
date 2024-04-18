import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Home from './pages/Theme/Dark/Home';
import Login from './pages/Theme/Dark/Login';
import Register from './pages/Theme/Dark/register';
// import LoginLight from './pages/Theme/Light/Login';
// import RegisterLight from './pages/Theme/Light/register';  
import Follower from './pages/Theme/Dark/Follower';
import Message from './pages/Theme/Dark/Message';
import Setting from './pages/Theme/Dark/Setting';
import Search from './pages/Theme/Dark/Search';
import Mypage from './pages/Theme/Dark/Mypage';


//라우터 주석 물어보기
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'Home', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },      
      { path: 'message', element: <Message />},
      { path: 'follow', element: <Follower />},
      { path: 'setting', element: <Setting />},
      { path: 'search', element: <Search />},
      { path: 'mypage', element: <Mypage />}
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
