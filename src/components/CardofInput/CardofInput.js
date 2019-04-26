import React from 'react';
import {
    Card, CardBody,
    CardTitle, Button
} from 'reactstrap';
import firebase from '../../Firebase';

// Algorithms
import getLabel from '../../assets/algorithms/constituentTree';
import getDependency from '../../assets/algorithms/dependencyTree';

class Label extends React.Component {
    state = {
        sentence: 'ฉันกินข้าว',
        label: ''
    };

    drawHandler = async () => {
        const axios = require('axios');
        const url = encodeURI('http://api-thai-parser.iapp.co.th/parse/');

        try {
            if (this.state.sentence) {
                const res = await axios.get(url.concat(this.state.sentence));
                // console.log(res.data.split('||')[0].trim());

                this.props.handlerFromParent(getLabel(res.data.split('||')[0].trim()));
            } else {
                const constituentData = await getLabel(this.state.label);
                this.props.handlerFromParent(constituentData);
                this.props.parentDepend(getDependency(constituentData));
            }
        } catch (err) {
            console.log(err);
        }
    }

    addSentence = (event) => {
        event.preventDefault();
        const db = firebase.firestore();
        db.collection('Treebank').add({
            sentence: this.state.sentence,
            label: this.state.label
        });
    };

    SuccessAlert = () => {
        alert("Successfully added to the database!");
    }

    updateInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    clearInput = () => {
        this.setState({
            sentence: '',
            label: ''
        });
    }

    render() {
        return (
            <div>
                {/* Title */}
                <Card body className="text-center">
                    <CardBody>
                        <CardTitle >Labelled Bracket & Sentence</CardTitle>
                    </CardBody>

                    {/* Label Bracket textarea */}
                    <form onSubmit={this.addSentence}>
                        <textarea
                            rows="5" cols="40"
                            name="label"
                            placeholder="Input Labelled bracket here,e.g.,[S(2)[NP[NCMN เมล็ดกาแฟ]] [VP(1)[VACT กระตุ้น][NP[NCMN หัวใจ]]]]"
                            value={this.state.label}
                            onChange={this.updateInput}
                            required>
                        </textarea>
                        <br></br>

                        {/* Sentence Textarea */}
                        <textarea
                            rows="3" cols="40"
                            name="sentence"
                            placeholder="Input raw sentence here,e.g., มะขามใช้เป็นยาระบาย"
                            value={this.state.sentence}
                            onChange={this.updateInput}
                            required
                        >
                        </textarea>
                        <br></br>
                        <br></br>

                        {/* Draw & Clear Buttons  */}
                        <span>
                            <Button onClick={this.drawHandler} color="primary" size="sm">Draw</Button>{' '}
                            <Button color="primary" size="sm" onClick={this.clearInput}>Clear</Button>
                        </span>
                        <br></br>
                        <br></br>

                        {/* Add to database button */}
                        <Button type="submit" color="primary" size="lg" active onClick={this.SuccessAlert} >Add to database</Button>
                    </form>
                </Card>
            </div>
        );
    }
}
export default Label;