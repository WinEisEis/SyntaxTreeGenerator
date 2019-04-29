import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';

export default class ExcelRender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            rows: null,
            cols: null,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    fileHandler = () => {
        let fileObj = './treebank workshop.xlsx';

        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                this.setState({
                    cols: resp.cols,
                    rows: resp.rows
                });
            }
        });

    }

    render() {

        const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggle}>&times;</button>;
        return (
            <div>
                <Button color="danger" onClick={this.toggle} onChange={this.fileHandler}>{this.props.buttonLabel} Treebank repository</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} external={externalCloseBtn}>
                    <ModalHeader>Treebank repository</ModalHeader>
                    {/* Keep the excel data */}
                    <ModalBody>
                        <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />

                    </ModalBody>
                    <ModalFooter>

                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}