import React from 'react';
import {
    Card, CardBody,
    CardTitle, Button
} from 'reactstrap';
import firebase from '../Firebase';

class Label extends React.Component {

    constructor() {
        super();
        this.state = {
            sentence: '',
            label: ''
        };
    }


    addSentence = (event) => {
        event.preventDefault();
        const db = firebase.firestore();
        const dbRef = db.collection('Treebank').add({
            sentence: this.state.sentence,
            label: this.state.label
        });
        
    };

    updateInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    clearInput = (event) => {
        event.value = ''
        
        this.setState({
            sentence: '',
            label: ''
        });
    }

    render() {

        return (
            <div>
                {/* // Title */}
                <Card body className="text-center">
                    <CardBody>
                        <CardTitle >Labelled Bracket </CardTitle>

                    </CardBody>

                    {/* Label Bracket textarea */}
                    <form onSubmit={this.addSentence}>
                        <textarea
                            rows="5" cols="40"
                            name="label"
                            placeholder="[S(2)[NP[NCMN เมล็ดกาแฟ]] [VP(1)[VACT กระตุ้น][NP[NCMN หัวใจ]]]]"
                            value={this.state.label}
                            onChange={this.updateInput}
                            required>

                        </textarea>
                        <br></br>



                        {/* Sentence Textarea */}

                        <textarea
                            rows="3" cols="40"
                            name="sentence"
                            placeholder="เมล็ดกาแฟกระตุ้นหัวใจ"
                            value={this.state.sentence}
                            onChange={this.updateInput}
                            required
                        >
                        </textarea>

                        <br></br>
                        <br></br>

                        {/* Buttons  */}
                        <span>
                            <Button color="primary" size="sm">Draw</Button>{' '}
                            <Button color="primary" size="sm" onClick = {this.clearInput}>Clear</Button>
                        </span>


                        <br></br>
                        <br></br>
                        {/* Add to database button */}
                        <Button type="submit" color="primary" size="lg" active >Add to database</Button>
                    </form>

                </Card>
            </div>
        )
            ;
    }

}

export default Label;
