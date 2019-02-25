import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import Header from './components/Header';
import Stage from './containers/Stage'
import Label from './components/CardofInput/CardofInput'
import Buttons from './components/SelectionButton'

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
          <Buttons/>
          </Col>
        
        </Row>
        <div class = "pt-3">
        <Row>
          <Col md="8">
            <Stage ref={(ref) => this.stage = ref} />
          </Col>
          <Col md="4">
            <Label handlerFromParent={this.handleData} />
          </Col>
        </Row>
        </div>
      </Container>
    );
  }
}

export default App;
