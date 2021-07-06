import React, { Component } from "react";
import { Card, Container, Row, Form } from 'react-bootstrap';
import './index.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component {
  state = {
    result: [],
    search: "",
    error: "",
    rawResults: [],
    filtered: false
  };

  componentDidMount() {
    axios.get('https://randomuser.me/api/?results=20')
      .then(res => {
        this.setState({ result:res.data.results, rawResults:res.data.results });
      })
      .catch(err => console.log(err));
  };

  sortByCountry = (e) => {
    // onClick for Button
    if (e.target.value === "clear") {
      this.setState({ result:this.state.rawResults });
    } else {
      const sorted = this.state.rawResults.slice().sort((a, b) => {
        if (a.location.country.toLowerCase() < b.location.country.toLowerCase()) {
          return -1;
        } else if (a.location.country.toLowerCase() > b.location.country.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      })
      this.setState({ result:sorted, rawResults:this.state.result });
    }
  };

  filterByGender = (e) => {
    if (e.target.value === "clear") {
      this.setState({ result:this.state.rawResults });
    } else {
      const filtered = this.state.rawResults.filter(obj => obj.gender === e.target.value)
      this.setState({ result:filtered });
    }
  };

  render() {
    return (
    <div className="App">
      <Container>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Sort by:</Form.Label>
            <Form.Control as="select" onChange={this.sortByCountry}>
              <option value="clear">clear</option>
              <option value="country">Country</option>
              {/* <option>3</option>
              <option>4</option>
              <option>5</option> */}
            </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Filter by:</Form.Label>
            <Form.Control as="select" onChange={this.filterByGender}>
              <option value="clear">clear</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              {/* <option>3</option>
              <option>4</option>
              <option>5</option> */}
            </Form.Control>
        </Form.Group>

        <Row>
          {this.state.result.map((user, idx) => (
          <Card style={{ width: '18rem' }} key={idx}>
          <Card.Img variant="top" src= {user.picture.large} />
          <Card.Body>
            <Card.Title>{user.name.first} {user.name.last}</Card.Title>
            <Card.Text>
              Country: {user.location.country} | Gender: {user.gender.slice(0,1).toUpperCase() + user.gender.slice(1)}
            </Card.Text>
          </Card.Body>
        </Card>
        ))}
        </Row>
      </Container>
    </div>
  );
  }
}

export default App;
