import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <section id="message-list">
        <Message color={"tomato"} name={"Mike"} content={"JUSTIFY MORE CONTENT!"}/>
        <Message color={"greenyellow"} name={"Matt"} content={"BURRITO GENIUS"}/>
        <Message color={"yellow"} name={"Mariam"} content={"WHAT? I DON'T KNOW"}/>
      </section>
    );
  }
}

export default MessageList;