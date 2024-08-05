import React from 'react'
import axios from 'axios'
import { API_URL } from "../Utils/Configuration"

class EventsView extends React.Component
{
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      joinedEvents: [],
      uniqueUsers: []
    };
  }
  componentDidMount() {
    this.fetchEvents()
  }

  fetchEvents = () => {
    axios.get(API_URL+'/events')
      .then(res => {
        this.setState({
          events: res.data.events,
          uniqueUsers: res.data.uniqueUsers
        })
        this.checkJoinedEvents()
      })
      .catch(error => {
        console.error(error)
      })
  }

  handleJoin = (eventId) => {
    axios.post(API_URL+'/events/join',{
      username: this.props.username,
      d_ID: eventId
    })
    .then(response=>{
      this.fetchEvents()
    })
    .catch(err=>{
      console.log(err)
    })
  }

  checkJoinedEvents = () => {
    axios.post(API_URL+'/events/check',{
      username: this.props.username
    })
    .then(res=>{
      console.log(res.data)
      this.setState({
        joinedEvents: res.data
      })
    })
    .catch(err=>{
      console.log(err)
    })
  }


  render()
  {
    return(
      <div className="card" style={{ width: "80%", margin: "20px auto" }}>
        <h2 className="card-header">Events</h2>
        <div className="card-body">
           
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Location</th>
                  <th>Date & Time</th>
                  <th>Organizer</th>
                  <th>Participants</th>
                </tr>
              </thead>
              <tbody>
              {this.state.events.map(evt => {
                let unique = this.state.uniqueUsers.find(user => user.d_ID === evt.id);
                return (
                  <tr key={evt.id}>
                    <td>{evt.ime}</td>
                    <td>{evt.opis}</td>
                    <td>{evt.lokacija}</td>
                    <td>{formatDateTime(evt.datumCas)}</td>
                    <td>{evt.orgIme}</td>
                    <td>{unique ? unique.uniqueUser : "0"}</td>
                    <td>
                    {this.state.joinedEvents.map(event => event.d_ID).includes(evt.id) ? null : (
                      <button
                        onClick={() => this.handleJoin(evt.id)}
                        className="btn btn-primary"
                      >
                        Join
                      </button>
                    )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            </table>
        </div>
      </div>
    )
  }
}

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); 
  const year = date.getUTCFullYear();

  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export default EventsView