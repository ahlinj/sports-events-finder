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
      ratings: [],
      comment:{
        event:"",
        text:""
      }
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

  QGetTextFromField=(e)=>{
    this.setState(prevState=>({
        comment:{...prevState.comment,[e.target.name]:e.target.value}
      }))
  }

  QPostSignup=()=>{
    axios.post(API_URL+'/events/comment',{
      eventId:this.state.comment.event,
      comment:this.state.comment.text,
      username:this.props.username
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
      <>
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
                )
              })}
            </tbody>
            </table>
        </div>
      </div>
      <div className="card" style={{width:"400px", marginLeft:"auto", marginRight:"auto", marginTop:"10px", marginBottom:"10px"}}>
      <h4 className="card-header">Add a comment</h4>
      <form style={{margin:"20px"}} >
        <label className="form-label">Choose an event</label>
        <select name="event" className="form-control" id="commentSelect" onChange={(e)=>this.QGetTextFromField(e)}>
          {this.state.joinedEvents.map(event => (
            <option key={event.d_ID} value={event.d_ID}>
              {this.state.events.find(evt => evt.id === event.d_ID).ime}
            </option>
          ))}
        </select>
        <p></p>
        <div className="mb-3">
          <label className="form-label">Write a comment</label>
          <textarea onChange={(e)=>this.QGetTextFromField(e)} name="text" type="text" className="form-control" id="exampleInputEmail1" rows="4"/>
        </div>
      </form>
      <button onClick={()=>this.QPostSignup()} style={{margin:"10px"}}  className="btn btn-primary bt">Submit</button>
      </div>
      </>
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