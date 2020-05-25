import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const BASE_ADDRESS = "http://192.168.2.104:8080/api/v1";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoRefresh: false,
      light: {
        state: 1
      },
      heater: {
        state: 1
      },
      message: ""
    };
    this.timer = null;
  }

  componentDidMount = () => {
    this.timer = setInterval(() => this.updateState(), 10000);
  }

  componentWillMount = () => {
    clearInterval(this.timer)
  }

  render = () => {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 border m-4 rounded-lg">
              <h1 className="text-secondary p-3">Welcome to my Smart Home</h1>
              <div class="alert alert-primary" role="alert">
                {this.state.message === "" ? "---" : this.state.message}
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Devices</th>
                    <th>State</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Light</td>
                    <td>{this.state.light.state === 1 ? "Off" : "On"}</td>
                    <td><button className={this.state.light.state == 1 ? "btn btn-sm btn-danger" : "btn btn-sm btn-success"} onClick={this.toggleLight}>{this.state.light.state === 1 ? "Switch On" : "Switch Off"}</button></td>
                  </tr>
                  <tr>
                    <td>Heater</td>
                    <td>{this.state.heater.state === 1 ? "Off" : "On"}</td>
                    <td><button className={this.state.heater.state == 1 ? "btn btn-sm btn-danger" : "btn btn-sm btn-success"} onClick={this.toggleHeater}>{this.state.heater.state === 1 ? "Switch On" : "Switch Off"}</button></td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3"><button onClick={this.micOn} className="btn btn-sm btn-dark m-2">Mic on</button><button onClick={this.micOff} className="btn btn-sm btn-dark m-2">Mic off</button><button onClick={this.selfTest} className="btn btn-sm btn-primary m-2">Self Test</button><button onClick={this.allOff} className="btn btn-sm btn-warning m-2">All Off</button><button onClick={this.allOn} className="btn btn-sm btn-primary m-2">All On</button></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  toggleHeater = () => {
    if (this.state.heater.state === 1) {
      fetch(`${BASE_ADDRESS}/heater-on`)
        .then(res => res.json())
        .then(res => {
          this.setState({
            message: res.message
          })
        })
    } else {
      fetch(`${BASE_ADDRESS}/heater-off`)
        .then(res => res.json())
        .then(res => {
          this.setState({
            message: res.message
          })
        })
    }
  }

  toggleLight = () => {
    if (this.state.light.state === 1) {
      fetch(`${BASE_ADDRESS}/light-on`)
        .then(res => res.json())
        .then(res => {
          this.setState({
            message: res.message
          })
        })
    } else {
      fetch(`${BASE_ADDRESS}/light-off`)
        .then(res => res.json())
        .then(res => {
          this.setState({
            message: res.message
          })
        })
    }
  }

  selfTest = () => {
    fetch(`${BASE_ADDRESS}/self-test`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          message: res.message
        })
      })
  }

  allOn = () => {
    fetch(`${BASE_ADDRESS}/relay-all-on`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          message: res.message
        })
      })
  }

  allOff = () => {
    fetch(`${BASE_ADDRESS}/relay-all-off`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          message: res.message
        })
      })
  }

  micOn = () => {
    fetch(`${BASE_ADDRESS}/mic-on`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          message: res.message
        })
      })
  }

  micOff = () => {
    fetch(`${BASE_ADDRESS}/mic-off`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          message: res.message
        })
      })
  }

  updateState = () => {
    fetch(`${BASE_ADDRESS}/relays-state`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          light: {
            state: res.state.Pin18
          },
          heater: {
            state: res.state.Pin23
          }
        })
      })
  }
}

export default App;
