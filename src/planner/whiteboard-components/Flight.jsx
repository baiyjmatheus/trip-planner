import React, { Component } from 'react';
import Card from './Card.jsx';
import { Redirect } from 'react-router-dom';


class Flight  extends Component {
  constructor() {
    super();

    this.state = {
      flights: []
    };
  }

  componentDidMount() {
    this.props.socket.emit('flightReady', this.props.tripId);
    this.props.socket.on('flights', (flights) => {
      this.setState({flights});
    });

    this.props.socket.on('flight selection', flight => {
      this.props.getSelectedItems(this.state.flights, 'flights')
      let stateCopy = Object.assign({}, this.state);
      stateCopy.flights[this.findFlightIndexById(this.state.flights, flight.id)] = flight
      this.setState({stateCopy})
    })
  }

  render () {
    const flightCards = this.state.flights.map((flight) => {
          return  <Card 
            id={flight.id}
            title={`${flight.route.length - 1} stops`} 
            rating={((flight.quality / 100) / 2).toPrecision(2)} 
            address={`From: ${flight.flyFrom} \t To: ${flight.flyTo}`} 
            price={flight.price} 
            imgSrc={'https://images.pexels.com/photos/674783/pexels-photo-674783.jpeg?cs=srgb&dl=aerial-air-air-traffic-674783.jpg&fm=jpg'}
            addUserSelection={this.addUserSelection}
            socketIds={flight.socketIds}
          />
    });
    if (this.props.currentStep !== 'flights') {
      return (
        <Redirect to={`${this.props.tripURL}/${this.props.currentStep}`} />
      );
    }
    return (
      <div id="flights-container">
        { flightCards }
      </div>
    )
  }

  addUserSelection = (flightId) => {
    let flight;
    this.state.flights.forEach((e) => {
      if (e.id == flightId) {
        flight = e;
      }
    })
    flight.socketIds[this.props.currentUser.socketId].selected = !flight.socketIds[this.props.currentUser.socketId].selected;
    flight.socketIds[this.props.currentUser.socketId].color = this.props.currentUser.color;
    this.props.socket.emit('flight selection', flight);
  }

  findFlightIndexById = (flights, id) => {
    let index;
    flights.forEach((e, i) => {
      if (e.id === id) {
        index = i
      }
    })
    return index;
  }
}

export default Flight;