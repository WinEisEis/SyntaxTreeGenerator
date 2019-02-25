import React, { Component } from 'react';
import Tree from 'react-d3-tree';

const myTreeData = [
    {
        name: 'Top Level',
        attributes: {
            keyA: 'val A',
            keyB: 'val B',
            keyC: 'val C',
        },
        children: [
            {
                name: 'Level 2: A',
                attributes: {
                    keyA: 'val A',
                    keyB: 'val B',
                    keyC: 'val C',
                },
            },
            {
                name: 'Level 2: B',
            },
        ],
    },
];

class Stage extends Component {
    state = {}

    componentDidMount() {
        console.log(`Stage: ${this.props.data}`)
        const dimensions = this.treeContainer.getBoundingClientRect();
        this.setState({
            translate: {
                x: dimensions.width / 3,
                y: dimensions.height / 3
            }
        });
    }

    drawTree = (data) => {
        console.log(`Stage.js ${data}`)

        
    }

    render() {
        return (
            <div id="treeWrapper" style={{ width: '100%', height: '30em', borderStyle: 'solid', borderWidth: '1px',borderColor: 'lightgrey'}} ref={tc => (this.treeContainer = tc)}>
                <Tree data={myTreeData}
                    translate={this.state.translate}
                    orientation={'vertical'}
                />
            </div>
        );
    }
}

export default Stage