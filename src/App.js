import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import Header from './components/Header';
import Stage from './containers/Stage'
import Label from './components/CardofInput'

class App extends Component {
  render() {
    return (
      <Container fluid >
        <Header />
        <Row>
          <Col md="8">
            <Stage />
          </Col>
          <Col md="4">
            <Label />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
