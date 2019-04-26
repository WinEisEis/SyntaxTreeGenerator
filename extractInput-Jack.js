const { get, set } = require('lodash');

let treeData = [
    {
        name: '',
        children: []
    },
];
let depth = 0;

const jsonArray = (tarr) => {
    let foundIndex;
    tarr.forEach((element, i) => {
        if (i === 0)
            set(treeData, '[0]name', element)
        else if (i === 1) {
            foundIndex = get(treeData, '[0].children').findIndex(v => v.name === element)
            if (foundIndex === -1)
                get(treeData, `[0].children`).push({ name: element, children: [] })
        } else {
            foundIndex = 0;
            if (get(treeData, `[0].children[${i - 2}].children`).length !== 0)
                foundIndex = get(treeData, `[0].children[${i - 2}].children`).findIndex(v => v.name === element)
            console.log('TCL: jsonArray -> foundIndex', foundIndex)
            get(treeData, `[0].children[0].children`).push({ name: element, children: [] })
        }
    });
    const fs = require('fs')
    fs.writeFileSync('./test.json', JSON.stringify(treeData))
}

// [S(2)[NP[NCMN เมล็ดกาแฟ]][VP(1)[VACT กระตุ้น][NP[NCMN หัวใจ]]]]

let mainArray = [];
let leafIndex = 0;
let drawArray = [];
let count = 0;
console.log("Initial leafindex", leafIndex);


// const label = "[S(2)[NP[NCMN Ɛ]] [VP(1) [VACT ส่งเสริม] [NP[NCMN อาชีพ]] [PP(1) [RPRE ให้] [NP[NCMN ประชาชน]] [VP(1,2) [NEG ไม่][VACT ให้เกิด] [NP(2) [FIXN การ] [VSTA ว่างงาน]]]]]]";
const label = "[S(2)[NP[NCMN เมล็ดกาแฟ]] [VP(1)[VACT กระตุ้น][NP[NCMN หัวใจ]]]]"

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

while (mainArray.length != 0) {
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
    jsonArray(drawArray)

    //5. Count "]" in the drawArray
    let Pop = drawArray[leafIndex];
    console.log(Pop);
    for (var i = 0; i < Pop.length; i++) {
        if (Pop[i] == "]") {
            count++;
        }
    }

    console.log("Number of elements to be popped:", count);

    mainArray.splice(leafIndex - count + 1, count);
    count = 0;
    leafIndex = -1;
    drawArray = []

    console.log('result array:', mainArray);
}