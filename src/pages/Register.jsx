import React, { useState } from "react";
import { Card } from "@mui/material";
import '../CSS/theme.css';

export default function Register() {
    const [theme, setTheme] = useState('light'); // 초기 테마를 설정

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light'); // 테마 전환 함수
    };

    const backgroundImage = theme === 'light' ? '/img/flowLight.png' : '/img/flowNight.png';
    const logoImage = theme === 'light' ? '/img/LightLogo.png' : '/img/DarkLogo.png';

    return (
        <div className={`background ${theme}`} style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <Card id='cardMain' className="cardMain">
                <div id='login-box' className="loginBox">
                    <img src={logoImage} style={{ maxWidth: '30%' }} />
                    <br />
                    <input placeholder="닉네임 혹은 이메일" className="commonInputStyle" />
                    <br />
                    <input type="password" placeholder="비밀번호" className="commonInputStyle" />
                    <br />
                    <input type="password" placeholder="비밀번호 확인" className="commonInputStyle" />
                    <br />
                    <button className="fill">가입확인</button>
                    <hr style={{ border: '2px solid rgba(255, 255, 255, 0.4)' }} />
                    <p style={{ color: theme === 'light' ? '#dca3e7' : '#ffffff' }}>또는</p>
                    <button className="fill">GOOGLE <br />로그인</button>
                    <button className="fill">FlowNary <br />로그인</button>
                    <br />
                    <button onClick={toggleTheme} className="fill">테마변경</button>
                </div>
            </Card>
        </div>
    );
}
