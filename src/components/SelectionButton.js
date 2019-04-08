import React from 'react';
import { Button } from 'reactstrap';

export default class Buttons extends React.Component {
  state = {
    toggle: true
  }

  handleClick = () => {
    const toggle = !this.state.toggle;
    this.setState({ toggle });
    this.props.handlerFromParent(toggle);
  }

  render() {
    const btnValue = this.state.toggle ? "Dependency Tree" : "Constituent Tree";

    return (
      <div class="pt-5">
        <Button outline color="secondary" onClick={this.handleClick} >{btnValue}</Button>
      </div>
    );
  }
}