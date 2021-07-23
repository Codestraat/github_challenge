import React, { Component } from 'react'
import axios from 'axios';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      d_user:"",
      repost:{},
      repos_url:[]
    }
  }
  componentDidMount=()=>(
    axios.get(`https://api.github.com/users/codestraat?client_id=21ad4a5af95478241799&client_secret=1b2142923dd094a072bfcbee0edbcd3e711677c6&sort=created`)
    .then((res)=>{
      this.setState({
        repost:res.data,
        repos_url:[]
      })
    }).catch((error)=>{
      console.log(error)
    })
  )

  onChange=(event)=>{
    this.setState({
      [event.target.name]:event.target.value
    })
    }

  onClick=()=>{
    axios.get(`https://api.github.com/users/${this.state.d_user}?client_id=bd603486786a9f5556be&client_secret=c4e8261be133d4d188dc343944d568bbca09387e&sort=created`)
    .then((res)=>{
      console.log(res)
      this.setState({
        repost:res.data,
        repos_url:[]
      })
    }).catch((error)=>{
      console.log(error)
    })
  }
    repos=(e)=>{
      axios.get(this.state.repost.repos_url)
      .then((res)=>{
        this.setState({
          repos_url:res.data
        })
      }).catch((error)=>{
        console.log(error)
      })
    }
  render() {
    return (
      <div style={{margin:"30px"}}>
        <div className="card mb-3" style={{maxWidth:"70%"}}>
          <div className="row g-0">
          <div className="col-md-4">
            <img src={this.state.repost.avatar_url} alt="avatar" style={{width:"300px"}}/>
          </div>
            <div className="col-md-6">
              <div className="card-body">
                <div className="input-group mb-4">
                  <input type="text" name="d_user" onChange={this.onChange} value={this.state.d_user} className="form-control" placeholder=""/>
                  <button className="btn btn-success" type="button"  onClick={this.onClick}>User Name</button>               
                </div>
                <br/>
                <ul className="list-group">
                  <li className="list-group-item list-group-item-action">Name: {this.state.repost.name}</li>
                  <li className="list-group-item list-group-item-action">UserName: {this.state.repost.login}</li>
                  <li className="list-group-item list-group-item-action">Location: {this.state.repost.location}</li>
                  <li className="list-group-item list-group-item-action">Email Address: {this.state.repost.email}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <ul>
          <div className="d-grid gap-2">
          <div class="row justify-content-center">
            <button className="btn btn-dark" type="button" style={{width:"150px"}} onClick={e=>this.repos(e)}>Show </button>
          </div>
          </div>
          
          <h3>User Repositories </h3>
          {this.state.repos_url.map((value,index)=>{
            return(
              <li className="list-group-item  list-group-item-action" style={{width:"880px"}} key={index}>{value.name}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}