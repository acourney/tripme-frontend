import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  useMessageContext,
  Window,
} from 'stream-chat-react';

import 'stream-chat-react/dist/css/index.css';

const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZmFsbGluZy1zbW9rZS04In0.IdSpgme1dbwjXC8Cms8DSHYaYsVVdSjNHt3TvGDY2Bw';

const filters = { type: 'messaging', members: { $in: ['falling-smoke-8'] } };
const sort = { last_message_at: -1 };

const CustomChannelPreview = (props) => {
  const { channel, setActiveChannel } = props;

  const { messages } = channel.state;
  const messagePreview = messages[messages.length - 1]?.text.slice(0, 30);

  return (
    <div onClick={() => setActiveChannel(channel)} style={{ margin: '12px' }}>
      <div>{channel.data.name || 'Unnamed Channel'}</div>
      <div style={{ fontSize: '14px' }}>{messagePreview}</div>
    </div>
  );
};

const CustomMessage = () => {
  const { message } = useMessageContext();

  return (
    <div>
      <b style={{ marginRight: '4px' }}>{message.user.name}</b> {message.text}
    </div>
  );
};

const MessageApp = () => {
  const [chatClient, setChatClient] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance('f4q28mfsq5wm');

      await client.connectUser(
        {
          id: 'falling-smoke-8',
          name: 'falling-smoke-8',
        },
        userToken,
      );

      setChatClient(client);
    };

    initChat();
  }, []);

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  return (
    <Chat client={chatClient} theme='messaging light'>
      <ChannelList filters={filters} sort={sort} Preview={CustomChannelPreview} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList Message={CustomMessage} />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default MessageApp;