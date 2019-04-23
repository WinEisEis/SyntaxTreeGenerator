import React from 'react';
import {
    Card, CardBody,
    CardTitle, Button
} from 'reactstrap';
import firebase from '../../Firebase';

class Label extends React.Component {
    state = {
        sentence: '',
        label: ''
    };

    drawHandler = async () => {
        const axios = require('axios');
        const url = encodeURI('http://api-thai-parser.iapp.co.th/parse/');

        try {
            if (this.state.sentence) {
                const res = await axios.get(url.concat(this.state.sentence));
                console.log(res.data.split('||')[0].trim());
                this.getLabel(res.data.split('||')[0].trim());
            } else {
                this.getLabel(this.state.label);
            }
        } catch (err) {
            console.log(err);
        }
    }

    getLabel = (label) => {




        // [S(2)[NP[NCMN เมล็ดกาแฟ]][VP(1)[VACT กระตุ้น][NP[NCMN หัวใจ]]]]

        let mainArray = [];
        let leafIndex = 0;
        let drawArray = [];
        let count = 0;
        let index = 0;
        let id = 0;
        let depth = 0;
        console.log("Initial leafindex", leafIndex);
        var stringify = require('json-stringify-safe');


        // const label = "[S(2)[NP[NCMN Ɛ]] [VP(1) [VACT ส่งเสริม] [NP[NCMN อาชีพ]] [PP(1) [RPRE ให้] [NP[NCMN ประชาชน]] [VP(1,2)[NEG ไม่][VACT ให้เกิด] [NP(2)[FIXN การ] [VSTA ว่างงาน]]]]]]";
        
        let array = label.split('[');
        console.log(array);

        //2. Push to mainArray
        for (var i = 0; i < array.length; i++) {
            if (array[i] != "," & array[i] != "") {
                mainArray.push(array[i]);
            }
        }
        console.log(mainArray);

        // Output we got looks like this
        // 0: "S(2)"
        // 1: "NP"
        // 2: "NCMN เมล็ดกาแฟ]]"
        // 3: "VP(1)"
        // 4: "VACT กระตุ้น]"
        // 5: "NP"
        // 6: "NCMN หัวใจ]]]]"
        // length: 7
        // __proto__: Array(0)

        // 3.1 Iterate over mainArray
        //3.2  ถ้าเจอ "]" ก็ หาindexของจุดที่เจอ แล้วจึงbreak
        let countArray = [-1]//keep numbers of square bracket
        let leafIndexArray = []

        let treeData = [
            {
                name: ''
            },

        ];

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
            // var nodeArray = drawArray.slice(0);//clone draw array
            // remove ]] from string

            var nodeArray = [];
            for (var i = 0; i < drawArray.length; i++) {
                nodeArray[i] = drawArray[i].replace(/]/g, '');
            }
            console.log('nodeArray', nodeArray);

            if (countArray.length == 1) {
                var cnode = treeData[0];
                cnode.name = nodeArray[0];
                cnode.depth = depth;
                depth++;
                id++;
                
                cnode.id = id;
                let m = parseInt(cnode.name[cnode.name.length - 2]);// retrieve header  
                cnode.header = m;
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
            depth = cnode.depth;
            for (var i = 0; i < nodeArray.length; i++) {
                // console.log(cnode.children)


                if (cnode.children === undefined) {//when node has no child
                    cnode.children = [];//create children array
                    cnode.children[0] = {};//create object in children array
                    cnode = cnode.children[0];//traverse down the tree
                    cnode.name = nodeArray[i];//add name
                    depth++;
                    cnode.depth = depth;
                    id++;
                    cnode.id = id;//add ID

                    if (i == nodeArray.length - 1) {//add index to child node
                        cnode.index = index;
                        index++;
                        cnode.header = 0;
                    }

                    else {
                        if (isNaN(cnode.name[cnode.name.length - 2]) === false) {//check wether header exist if yes
                            let m = parseInt(cnode.name[cnode.name.length - 2]);// retrieve header  
                            cnode.header = m;
                        }

                        else {
                            cnode.header = 1;
                        }
                    }

                }
                else {// node already has a child
                    var nodelength = cnode.children.length;
                    cnode.children[nodelength] = {};
                    cnode = cnode.children[nodelength];
                    cnode.name = nodeArray[i];
                    depth++;
                    cnode.depth = depth;
                    id++;
                    cnode.id = id;//add ID


                    if (i == nodeArray.length - 1) {//add index to child node
                        cnode.index = index;
                        index++;
                        cnode.header = 0;
                    }

                    else {
                        if (isNaN(cnode.name[cnode.name.length - 2]) === false) {//check wether header exist if yes
                            let m = parseInt(cnode.name[cnode.name.length - 2]);// retrieve header                
                            cnode.header = m;
                        }
                        else {
                            cnode.header = 1;
                        }
                    }
                }



            }

            console.log('Tree', stringify(treeData));

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
        }
      











        this.props.handlerFromParent(treeData);
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