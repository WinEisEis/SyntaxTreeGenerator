


// [S(2)[NP[NCMN เมล็ดกาแฟ]][VP(1)[VACT กระตุ้น][NP[NCMN หัวใจ]]]]

let mainArray = [];
let leafIndex = 0;
let drawArray = [];
let count = 0;
console.log("Initial leafindex", leafIndex);


// const label = "[S(2)[NP[NCMN Ɛ]] [VP(1) [VACT ส่งเสริม] [NP[NCMN อาชีพ]] [PP(1) [RPRE ให้] [NP[NCMN ประชาชน]] [VP(1,2) [NEG ไม่][VACT ให้เกิด] [NP(2) [FIXN การ] [VSTA ว่างงาน]]]]]]";
// const label = "[S(2)[NP[NCMN เมล็ดกาแฟ]] [VP(1)[VACT กระตุ้น][NP[NCMN หัวใจ]]]]"
const label = "[S(2)[NP(1)[NOUN กาแฟ]][VP(1)[VERB กระตุ้น][NOUN หัวใจ]]]"
//1. split "["
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
countArray = [0]//keep numbers of square bracket
leafIndexArray= []

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
    for (var i=0 ; i< drawArray.length  ; i++){
        nodeArray[i] = drawArray[i].replace(/]/g,'');
    }
    console.log('nodeArray', nodeArray );

    if(countArray.length == 1 ){
        var cnode = treeData[0];
        cnode.name = nodeArray[0]
        nodeArray.shift();//remove first element of the array
    }
    else{
        var cnode = treeData[0];
        nodeArray.shift();
        for(var i = 0; i< leafIndexArray[leafIndexArray.length-1 ] - countArray[countArray.length-1]; i++){//retrieve the right most element of the countArray
            cnode = cnode.children[cnode.children.length-1];// select the right most node
            nodeArray.shift();
        }
    }
    
    console.log("current node",cnode)
    console.log("to draw node",nodeArray)
    // put into JSON
    for (var i = 0; i< nodeArray.length ; i++){
        // console.log(cnode.children)
        if (cnode.children === undefined){//when node has no child
            console.log('un')
            cnode.children=[];//create children array
            cnode.children[0]={};//create object in children array
            cnode = cnode.children[0];//traverse down the tree
            cnode.name = nodeArray[i];//add name
        }
        else{// node already has a child
            var nodelength = cnode.children.length;
            cnode.children[nodelength]={};
            cnode = cnode.children[nodelength];
            cnode.name =nodeArray[i];
        }
     
    }
    
    console.log('Tree',JSON.stringify(treeData));

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
