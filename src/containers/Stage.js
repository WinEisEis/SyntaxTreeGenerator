import React, { Component } from 'react';
import Tree from 'react-d3-tree';

const myTreeData = 
    


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
            <div id="treeWrapper" style={{ width: '100%', height: '30em', borderStyle: 'solid', borderWidth: '1px', borderColor: 'lightgrey' }} ref={tc => (this.treeContainer = tc)}>
                <Tree data={myTreeData}
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





