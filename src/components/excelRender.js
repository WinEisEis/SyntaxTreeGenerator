import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import ReactDataGrid from 'react-data-grid';

//Sample column data
// const columns = [
//     { key: 'OrderDate', name: 'Date' },
//     { key: 'Region', name: 'Region' },
//     { key: 'Rep', name: 'Rep' },
//     { key: 'Item', name: 'Item' },
//     { key: 'Units', name: 'Units' }];

const columns = [
    { key: 'raw', name: 'Raw' },
    { key: 'lb', name: 'LB' },
    { key: 'type', name: 'Type' },
    { key: 'source', name: 'Source' },
    { key: 'dependency', name: 'Dependency' },
]

const rows = require('../assets/treeBank.json');

export default class ExcelRender extends React.Component {
    state = {
        modal: false,
        rows: null,
        cols: null,
    };

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    }

    render() {
        return (
            <div>
                <Button color="danger" onClick={this.toggle}>Treebank repo</Button>
                <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} style={{ minWidth: '992px' }}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <div>
                            <ReactDataGrid
                                columns={columns}
                                rowGetter={i => rows[i]}
                                rowsCount={rows.length}
                                minHeight={300} />
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div >
        );
    }
}