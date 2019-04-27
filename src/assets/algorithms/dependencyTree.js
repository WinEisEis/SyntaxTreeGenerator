export default function getDependency(treeData) {
    let parentArray = [treeData[0].name];
    let indexAray = [];
    let childrenArray = [];
    let idArray = [];
    var element = treeData[0];
    let prev = [];
    let popVal = "";
    let isMainverb = true;

    function searchTreebyId(element, id) {
        if (element.id == id) {
            return element;
        } else if (element.children != null) {
            var i;
            var result = null;
            for (i = 0; result == null && i < element.children.length; i++) {
                result = searchTreebyId(element.children[i], id);
            }
            //console.log('searchtreebyid is', result);
            return result;
        }
        return null;
    }




    // A function to find the specified node in JSON tree
    function searchTreebyIndex(element, index) {
        if (element.index == index) {
            return element;
        } else if (element.children != null) {
            var i;
            var result = null;
            for (i = 0; result == null && i < element.children.length; i++) {
                result = searchTreebyIndex(element.children[i], index);
            }
            //console.log('Current searchTreebyIndex is', result);
            return result;
        }
        return null;
    }

    // A function to traverse all of the JSON tree
    function loopTree(treeData) {
        for (var k in treeData) {
            if (typeof treeData[k] == "object" && treeData[k] !== null) {
                if (treeData[k].index == null && treeData[k].name != undefined) {


                    parentArray.push(treeData[k].name);
                }
                else if (treeData[k].index != null) {
                    childrenArray.push(treeData[k].name);
                    indexAray.push(treeData[k].index);
                    idArray.push(treeData[k].id);
                }
                loopTree(treeData[k]);
            }

        }
    }




    loopTree(treeData[0]);
    //console.log('All index array is ', indexAray);

    //console.log('parentArray is ', parentArray);
    //console.log('childrenArray is ', childrenArray);

    // Getting maximum index in order to use it in the iteration of the MAIN ALGORITHM!
    let max = Math.max(...indexAray);
    //console.log('maximum index is ', max);



    function findParent(msg, childId) {

        for (var k in msg) {
            if (typeof msg[k] == "object" && msg[k] !== null) {
                if (msg[k].id == childId) {
                    popVal = prev.pop();
                    //console.log("parent is ", popVal);
                    return popVal;
                } else if (msg[k].name != undefined) {
                    prev.push(msg[k].id);

                }
                findParent(msg[k], childId);
            }
        }
    }



    // INITIATE MAIN ALGORITHM
    //console.log("------------------------------------------INITIATE AN ALGORITHM!------------------------------------------------");


    let currentIndex;
    let parentId;
    let dependencyData = {


        'words': [],
        'arcs': [],
    };
    let dir, start, end;

    for (var RunningIndex = 0; RunningIndex <= max; RunningIndex++) {
        dependencyData.words.push({ 'text': childrenArray[RunningIndex], 'tag': '' });

        //Go to leaf node
        var element = treeData[0];
        let startNode = searchTreebyId(element, idArray[RunningIndex]);
        let startIndex = startNode.index;
        //console.log("WE ARE CURRENTLY CONSIDERING", startIndex, "INDEX!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        currentIndex = searchTreebyIndex(element, RunningIndex);
        //console.log('Current leaf node is : ', currentIndex);
        let header = currentIndex.header; // Keep the header of the current node.

        // while loop for TRAVERSE UP
        while (isMainverb == true) {
            //console.log("CLIMBING UPPPPPPPPPPPPPPPPPPPPPPPPPP!!")
            //หา parent node อ้างอิงก่อน
            findParent(treeData, currentIndex.id);
            let ParentVal = popVal;
            prev = []; // We need to reset prev[] everytime after we have successfully implemented findParent function
            //console.log("jjjjjjjjjjjjjjjjj", currentIndex)
            //console.log("ooooooooooooooooooooooooo", ParentVal)
            if (ParentVal == undefined) {
                //console.log("To S(2) motherfucker!");
                break;
            }
            let parentIndex = searchTreebyId(treeData[0], ParentVal);

            parentId = parentIndex.id;

            // กันปัญหาเวลาที่ parent มีหลาย child
            while (parentIndex.depth !== ((currentIndex.depth) - 1)) { // ให้ currentIndex เป็น leaf ที่เราพิจารณาอยู่ก่อน
                //console.log("This is the case where ParentNode and currentNode has a same depth")
                //console.log("From now, CurrentIndex is ", currentIndex, "which has depth = ", currentIndex.depth);
                findParent(treeData, parentId);
                prev = [];
                ParentVal = popVal;
                parentIndex = searchTreebyId(treeData[0], ParentVal);
                parentId = parentIndex.id;
                //console.log("parent is ", parentId);
                //console.log("parentIndex is", parentIndex);
                //console.log("-------------------------------------------------------------------------------------------------------", parentIndex.id)
                if (parentIndex.id == 1) {
                    //console.log("root breakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
                    isMainverb = false;
                    break;
                }
            }


            if (parentIndex.children[(parentIndex.header) - 1] !== currentIndex) {
                //console.log("PREPARE TO CLIMB DOWNNNNNNNNNNNNNNN");
                currentIndex = parentIndex;
                header = currentIndex.header;
                isMainverb = false;



            }

            // ไต่ขึ้นต่อไป
            else {

                isMainverb = true;
                //console.log("Continue climbing up");
                currentIndex = parentIndex;
                //console.log("currrentIndex is", currentIndex.id);
                header = currentIndex.header;
                //console.log("Second CurrentIndex is", currentIndex);

                //console.log("header of", currentIndex.name, 'is', header, 'which id is ', currentIndex.id);
            }
        }


        if (isMainverb == false) {
            while (header != 0) {// while loop สำหรับการไต่ลง

                //console.log("CLIMBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB DOWNNNNNNNNNNNNNNNNNNNNN");
                currentIndex = currentIndex.children[header - 1];
                //console.log("end index is", currentIndex);

                header = currentIndex.header;
            }
            let endIndex = currentIndex.index;
            //console.log("The end index is", endIndex);
            //console.log("The start index is", startIndex);

            // startIndex must less than endIndex

            if (startIndex < endIndex) {
                dir = "left";
                start = startIndex;
                end = endIndex;
            }
            else {
                dir = "right";
                start = endIndex;
                end = startIndex;
            }
            dependencyData.arcs.push({ 'start': start, 'end': end, 'label': '', 'dir': dir });
            //console.log("data.arcs: คือ", dependencyData.arcs);
            isMainverb = true;

            let datastring = JSON.stringify(dependencyData);
            console.log("JSON for Dependency is .....", datastring);
        }



    }
    epsilon(dependencyData);

    return dependencyData;
}

let arr = [];// index of ep
var sta = [];// start index of ep
var sto = [];//stop index of ep
var arrIndex = []; //index of array that need fixing
function epsilon(dependencyData) {
    for (let i in dependencyData.words) {//find epsilon
        var str = dependencyData.words[i].text
        if (str[str.length - 1] === "Ɛ") {
            arr.push(i);//keep index of ep
        }
    }
    for (let i in arr) {
        sta.push(dependencyData.arcs[arr[i]].start);//fill sta
        sto.push(dependencyData.arcs[arr[i]].end);//fill sto
        for (let j in dependencyData.arcs) {
            if (dependencyData.arcs[j].end == arr[i]) {// find index of array that need fixing
                arrIndex.push(j);
            }
        }

    }
    for (let k in arrIndex) {
        for (let l in sta) {
            if (dependencyData.arcs[arrIndex[k]].end === sta[l]) {
                dependencyData.arcs[arrIndex[k]].end = sto[l];// replace index that need fixing with item in sto
            }
        }
    }
    for (let i in arr) {
        delete dependencyData.words[arr[i]];// delete epsilon words using word index
        for (let j in dependencyData.arcs) {
            if (dependencyData.arcs[j].start == arr[i]) {
                delete dependencyData.arcs[j]; // delete epsilon arcs () we can not use i because of root
            }
        }

    }
    console.log(JSON.stringify(dependencyData))
    return dependencyData;

}

