import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import Header from './components/Header';
import Stage from './containers/Stage'
import InputCard from './components/CardofInput';
import AddtoDatabase from './components/addtoDatabase';
import firestore from "./firestore";


class App extends Component {

  state = {
    sentence:"",
    label:""
  }

  addtoDatabaseHandler = (event) => {
    
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    event.preventDefault();
    this.setState({
      sentence: event.target.value,
      label: event.target.value
    });

    const dbRef = db.collection('Treebank').add({
      sentence: this.state.sentence,
      label: this.state.label
    });  
  }
  
  render() {
    return (
      <Container fluid >
        <Header />
        <Row>
          <Col md="8">
            <Stage />
          </Col>
          <Col md="4">
            <InputCard />
            <div className="mt-4">
              <AddtoDatabase onClick={this.addtoDatabaseHandler} />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
