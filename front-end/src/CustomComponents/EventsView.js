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
      uniqueUsers: [],
      ratings: []
    }
  }

  componentDidMount() {
    this.fetchEvents()
  }

  fetchEvents = () => {
    axios.get(API_URL+'/events')
      .then(res => {
        this.setState({
          events: res.data.events,
          uniqueUsers: res.data.uniqueUsers,
          ratings: res.data.ratings
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

  SendRating = (eventId,e) => {
    if(e.target.value !== "0" && this.state.joinedEvents.map(event => event.d_ID).includes(eventId)){
    axios.post(API_URL+'/events/rating',{
      eventId: eventId,
      username: this.props.username,
      rating: e.target.value
    })
    .then(res=>{
      this.fetchEvents()
    })
    .catch(err=>{
      console.log(err)
    })
  }
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
                  <th>Average rating</th>
                  <th>Add rating</th>
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
                    {this.state.ratings.filter(rat => rat.d_ID === evt.id).map(rat => rat.average_vrednost)[0] || 0}
                    </td>
                    <td>
                    {this.state.joinedEvents.map(event => event.d_ID).includes(evt.id) ? (
                    <select onChange={(e) => this.SendRating(evt.id,e)} name="rating" className="form-control" id="ratingSelect">
                      <option value="0">Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    ) : (
                      <select disabled>
                      <option value="0">Select</option>
                      </select>
                    )}
                    </td>
                    <td>
                    {this.state.joinedEvents.map(event => event.d_ID).includes(evt.id) ? (
                      <button className="btn btn-secondary" disabled>Joined</button>
                      ) : (
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