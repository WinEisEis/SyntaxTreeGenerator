import React, { Component } from 'react';
import Tree from 'react-d3-tree';
import image from '../static/Capture.png';

class Stage extends Component {
    state = {
        treeData: null,
    }

    componentDidMount() {
        const dimensions = this.treeContainer.getBoundingClientRect();
        this.setState({
            translate: {
                x: dimensions.width / 3,
                y: dimensions.height / 3
            }
        });
    }

    drawTree = (data) => {
        console.log(`Stage.js ${JSON.stringify(data)}`);
        this.setState({ treeData: data });
    }

    render() {
        let stage;

        if (this.state.treeData && !this.state.toggle)
            stage = <Tree data={this.state.treeData}
                translate={this.state.translate}
                orientation={'vertical'}
            />
        else if(this.state.toggle)
            stage = <img src={image} alt="Not available." width='100%' height='100%' />
        
        return (
            <div id="treeWrapper" style={{ width: '100%', height: '30em', borderStyle: 'solid', borderWidth: '1px', borderColor: 'lightgrey' }} ref={tc => (this.treeContainer = tc)}>
                {stage}
            </div>
        );
    }
}

export default Stage