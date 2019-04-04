import React from 'react';
import {
    Card, CardBody,
    CardTitle, Button
} from 'reactstrap';
import firebase from '../../Firebase';

const axios = require('axios');
const url = encodeURI('http://api-thai-parser.iapp.co.th/parse/');

class Label extends React.Component {


    state = {
        sentence: '',
        label: ''
    };

    // wrapperFunction contains 2 functions inside
    wrapperFunction(event) {
        console.log("Initiate getAPI");
        console.log("input sentence is" + this.state.sentence);
        console.log("url is" + url.concat(this.state.sentence));
        
        
        function getAPI(){
            axios.get(url.concat(this.state.sentence))
                .then(res => {
                    // handle success
                    console.log(res.data);
                })
                .catch(err => {
                    // handle error
                    console.log(err);
                })
        }

        function toLabel(){
            let mainArray = [];
            let leafIndex = 0;
            let drawArray = [];
            let count = 0;
            let countArray = [0] //keep numbers of square blacket
            let leafIndexArray = []
            let treeData = [
                {
                    name: ''
                },

            ];
            let array = this.state.label.split('[');
            console.log(array);

            //2. Push to mainArray
            for (var i = 0; i < array.length; i++) {
                if (array[i] != "," & array[i] != "") {
                    mainArray.push(array[i]);
                }
            }
            console.log(mainArray);

            while (mainArray.length != 0) {
                // for (var i = 0; i>2; i++){
                dance:
                for (var i = 0; i < mainArray.length; i++) {
                    for (var j = 0; j < mainArray[i].length; j++) {
                        if (mainArray[i][j] == "]") {
                            leafIndex = i;
                            break dance;
                        }
                    }

                }
                console.log("First found index", leafIndex);

                //4. draw  0: "S(2)"  1: "NP" 2: "NCMN เมล็ดกาแฟ]]"


                for (var i = 0; i <= leafIndex; i++) {
                    drawArray.push(mainArray[i]);

                }

                console.log(drawArray);
                //Output  = [ 'S(2)', 'NP', 'NCMN เมล็ดกาแฟ]]' ]

                // initiate a tree

                // find and travese the node that already have been constructed
                console.log('count:', countArray);

                var nodeArray = [];
                for (var i = 0; i < drawArray.length; i++) {
                    nodeArray[i] = drawArray[i].replace(/]/g, '');
                }

                if (countArray.length == 1) {
                    var cnode = treeData[0];
                    cnode.name = nodeArray[0]
                    nodeArray.shift();//remove first element of the array
                }
                else {
                    var cnode = treeData[0];
                    nodeArray.shift();
                    for (var i = 0; i < leafIndexArray[leafIndexArray.length - 1] - countArray[countArray.length - 1]; i++) {//retrieve the right most element of the countArray
                        cnode = cnode.children[cnode.children.length - 1];// select the right most node
                        nodeArray.shift();
                    }
                }

                console.log("current node", cnode)
                console.log("to draw node", nodeArray)
                // put into JSON
                for (var i = 0; i < nodeArray.length; i++) {
                    // console.log(cnode.children)
                    if (cnode.children === undefined) {//when node has no child
                        console.log('un')
                        cnode.children = [];//create children array
                        cnode.children[0] = {};//creat object in children array
                        cnode = cnode.children[0];//traverse down the tree
                        cnode.name = nodeArray[i];//add name
                    }
                    else {// node already has a child
                        var nodelength = cnode.children.length;
                        cnode.children[nodelength] = {};
                        cnode = cnode.children[nodelength];
                        cnode.name = nodeArray[i];
                    }

                }

                //5. Count "]" in the drawArray
                let Pop = drawArray[leafIndex];
                console.log(Pop);
                for (var i = 0; i < Pop.length; i++) {
                    if (Pop[i] == "]") {
                        count++;
                    }
                }

                console.log("Number of elements to be popped:", count);

                countArray.push(count);//appends count
                leafIndexArray.push(leafIndex);//appends count

                mainArray.splice(leafIndex - count + 1, count);
                count = 0;
                leafIndex = -1;
                drawArray = []

                console.log('result array:', mainArray);

                this.props.handlerFromParent(treeData);

            }
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

                        {/* Draw & Clear Buttons  */}
                        <span>
                            <Button onClick={this.wrapperFunction} color="primary" size="sm">Draw</Button>{' '}
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
