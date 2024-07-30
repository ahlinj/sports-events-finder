import React from 'react'
import axios from 'axios'
import { API_URL } from "../Utils/Configuration"

class EventsView extends React.Component
{
  constructor(props) {
    super(props)
    this.state = {
      events: []
    };
  }
  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents = () => {
    axios.get(API_URL+'/events')
      .then(res => {
        this.setState({
          events: res.data})
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
      console.log("Sent to server...")
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
                </tr>
              </thead>
              <tbody>
                {this.state.events.map(evt => (
                  <tr>
                    <td>{evt.ime}</td>
                    <td>{evt.opis}</td>
                    <td>{evt.lokacija}</td>
                    <td>{formatDateTime(evt.datumCas)}</td>
                    <td>{evt.orgIme}</td>
                    <td>
                    <button
                      onClick={() => this.handleJoin(evt.id)}
                      className="btn btn-primary"
                    >
                      Join
                    </button>
                  </td>
                  </tr>
                ))}
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