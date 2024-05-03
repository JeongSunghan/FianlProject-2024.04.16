import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes('안녕')) {
      actions.handleHello();
      return;
    }

    if (message.includes('팀원')) {
      actions.handleEasterEgg();
      return;
    }

    else {
      actions.handleUnknownMessage();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;