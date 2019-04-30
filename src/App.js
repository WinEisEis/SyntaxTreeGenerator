import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import './App.css';
import Header from './components/Header';
import Stage from './containers/Stage'
import Label from './components/CardofInput/CardofInput'
import SelectionButton from './components/SelectionButton'
import ExcelRender from './components/ExcelRender'

class App extends Component {
  swapStage = (toggle) => {
    this.stage.setState({ toggle });
  }

  handleData = (data) => this.stage.drawTree(data);

  render() {
    return (
      <Container fluid >
        <Header />

        <Row>
          <Col md="8">
            <SelectionButton
              handlerFromParent={this.swapStage}
            />
          </Col>

        </Row>
        <div class="pt-3">
          <Row>
            <Col md="8">
              <Stage ref={(ref) => this.stage = ref} />
            </Col>
            <Col md="4">
              <Label handlerFromParent={this.handleData} />
            </Col>
          </Row>
        </div>

        <div class="pt-3">
          <Row>
            <Col md="8">
              <ExcelRender />
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default App;