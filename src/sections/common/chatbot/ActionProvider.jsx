import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const handleHello = () => {
        const botMessage = createChatBotMessage('나도 반가워요');

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    const handleUnknownMessage = () => {
        const botMessage = createChatBotMessage('죄송해요 무슨 말씀이신지 잘 모르겠어요 ㅜㅜ');

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: { handleHello, handleUnknownMessage },
                });
            })}
        </div>
    );
};

export default ActionProvider;