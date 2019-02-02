import React, { Component } from 'react';
import Card from './Card.jsx';
import { Redirect } from 'react-router-dom';

class Event extends Component {
  constructor() {
    super();
    this.state = {
      events: null
    }
  }

  componentDidMount() {
    this.props.socket.emit('events request', this.props.tripId)

    this.props.socket.on('events data', eventsData => {
      console.log(eventsData[0].lat, eventsData[0].long)
      this.setState({events: eventsData})
    })
  }

  render () {
    if (this.props.currentStep !== 'events') {
      return (
        <Redirect to={`${this.props.tripURL}/${this.props.currentStep}`} />
      );
    } else {
      if (this.state.events) {
        const events = this.state.events.map(event => {
          return <Card 
            title={ event.name }
            rating={ event.rating } 
            address={ event.address } 
            imgSrc={ event.img }
            price={ event.price }
          />
        });
        return (
          <div id="events-container">
            { events }
          </div>
        )
      } else {
        return (
          <div>
            <p>Loading...</p>
          </div>
        );
      }
    }  
  }
}

export default Event;