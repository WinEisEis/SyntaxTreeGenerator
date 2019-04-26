import React, { Component } from 'react';
import Tree from 'react-d3-tree';
import image from '../static/Capture.png';

import Iframe from 'react-iframe'

import axios from 'axios';

import getDependency from '../assets/algorithms/dependencyTree';

class Stage extends Component {
    state = {
        constituentData: null
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

    drawTree = data => {
        console.log(`Stage.js ${JSON.stringify(data)}`);
        this.setState({ constituentData: data });

        axios.post('http://localhost:3001/postjson', { data: getDependency(data) })
    }

    render() {
        let stage;

        if (this.state.constituentData && !this.state.toggle)
            stage = <Tree data={this.state.constituentData}
                translate={this.state.translate}
                orientation={'vertical'}
            />
        else if (this.state.toggle)
            stage = <Iframe url="http://localhost:3001"
                width="100%"
                height="100%"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative" />

        return (
            <div id="treeWrapper" style={{ width: '100%', height: '30em', borderStyle: 'solid', borderWidth: '1px', borderColor: 'lightgrey' }} ref={tc => (this.treeContainer = tc)}>
                {stage}
            </div>
        );
    }
}

export default Stage