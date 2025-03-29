
import React from 'react';
import ChatContainer from '@/components/chat/ChatContainer';

const Chat: React.FC = () => {
  return (
    <div className="container max-w-4xl py-24 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Chat Assistant</h1>
        <p className="mt-2 text-muted-foreground">
          Have questions about our products or services? Our AI assistant is here to help!
        </p>
      </div>
      
      <ChatContainer />
    </div>
  );
};

export default Chat;
