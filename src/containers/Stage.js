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
        const dimensions = this.treeContainer.getBoundingClientRect();
        console.log(dimensions)
        this.setState({
            translate: {
                x: dimensions.width / 3,
                y: dimensions.height / 3
            }
        });
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