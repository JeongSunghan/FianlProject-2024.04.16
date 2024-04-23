import React, { useState, useEffect } from 'react';
import '../css/chatbot.css'; // CSS 파일 임포트

function Chatbot() {
  const responses = {
    "게시글 작성방법": "게시글 설명",
    "팔로잉, 팔로워가 뭐야?": "팔로잉 팔로워",
    "책갈피 사용방법": "책갈피란 이런거다"
  };

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // 컴포넌트 마운트 시 챗봇의 초기 인사 메시지를 보냅니다.
    sendMessage("FlowNary에 오신것을 환영합니다!", "bot");
  }, []); // 빈 배열을 넣어 컴포넌트가 처음 마운트될 때만 실행되도록 합니다.

  const sendMessage = (text, sender) => {
    setMessages(prevMessages => {
      const newId = prevMessages.length ? prevMessages[prevMessages.length - 1].id + 1 : 0;
      const newMessage = { id: newId, text, sender };
      return [...prevMessages, newMessage];
    });
  };
  


  const handleButtonClick = (event) => {
    const questionKey = event.target.getAttribute('data-key');
    sendMessage(responses[questionKey], 'bot'); 
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg) => (
          <p key={msg.id} className={`message ${msg.sender}`}>
            {msg.text}
          </p>
        ))}
      </div>
      <div className="input-area">
        <button data-key="게시글 작성방법" onClick={handleButtonClick}>게시글 작성방법</button>
        <button data-key="팔로잉, 팔로워가 뭐야?" onClick={handleButtonClick}>팔로잉, 팔로워</button>
        <button data-key="책갈피 사용방법" onClick={handleButtonClick}>책갈피</button>
      </div>
    </div>
  );
}

export default Chatbot;
