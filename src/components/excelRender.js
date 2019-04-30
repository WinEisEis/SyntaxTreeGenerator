import React, { useState } from 'react';
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
    { key: 'raw', name: 'Raw', editable: true },
    { key: 'lb', name: 'LB', editable: true },
    { key: 'type', name: 'Type', editable: true },
    { key: 'source', name: 'Source', editable: true },
    { key: 'dependency', name: 'Dependency', editable: true },
]

const rows = require('../assets/treeBank.json');

export default function ExcelRender() {
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    }

    return (
        <div>
            <Button color="secondary" onClick={toggle}>Treebank repository</Button>
            <Modal size="lg" isOpen={modal} toggle={toggle} style={{ minWidth: '992px' }}>
                <ModalHeader toggle={toggle}>Treebank repository</ModalHeader>
                <ModalBody>
                    <div>
                        <ReactDataGrid
                            columns={columns}
                            rowGetter={i => rows[i]}
                            rowsCount={rows.length}
                            minHeight={300}
                            enableCellSelect={true} />
                    </div>

                </ModalBody>
                <ModalFooter>

                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </div >
    );
}