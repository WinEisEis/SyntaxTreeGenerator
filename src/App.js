import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import Header from './components/Header';
import Stage from './containers/Stage'
import Label from './components/CardofInput'

class App extends Component {
  handleData = (data) => {
    this.stage.drawTree(data)
  }

  render() {
    return (
      <Container fluid >
        <Header />
        <Row>
          <Col md="8">
            <Stage ref={(ref) => this.stage = ref} />
          </Col>
          <Col md="4">
            <Label handlerFromParant={this.handleData} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
