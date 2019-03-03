import React, { Component } from 'react';
import Tree from 'react-d3-tree';

class Stage extends Component {
    state = {
        treeData: [
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
        ]
    }

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
        this.setState({ treeData: data })
    }

    render() {
        return (
            <div id="treeWrapper" style={{ width: '100%', height: '30em', borderStyle: 'solid', borderWidth: '1px', borderColor: 'lightgrey' }} ref={tc => (this.treeContainer = tc)}>
                <Tree data={this.state.treeData}
                    translate={this.state.translate}
                    orientation={'vertical'}
                    // textLayout = {textAnchor: "end", transform: string}
                    // collapsible={false}

                    pathFunc={'straight'}

                />
            </div>
        );
    }
}

export default Stage





