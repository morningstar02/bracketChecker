const bracketMap = new Map();
bracketMap.set('{','}');
bracketMap.set('(',')');
bracketMap.set('[',']');
var automataString = process.argv[2];

if(automataString == undefined){
    automataString = '';
}

const inputArray = automataString.split('');
var splicedPalindromeArray = '';
var splicedArrayChecker;

const check = validityCheck(inputArray);
if(check){
    process.stdout.write('true');
}else {
    process.stdout.write('false');
}


function validityCheck(nowArray) {
    let thisLength = nowArray.length;
    if(thisLength % 2 == 0){
        // proceed
        let adjacentTracker = openCloseCheck(nowArray);
        let adjacentClosure;    // {}{}[]
        let hybridClosure;      // {}()(({}))
        if(!adjacentTracker.valid) {    // assume that earlier tracks are good and this is the first bad track
            splicedPalindromeArray = nowArray.splice(adjacentTracker.spliceIndicator, thisLength);
            splicedArrayChecker = palindromeCheck(splicedPalindromeArray);
            if(!splicedArrayChecker){
                return false;
            }else {
                hybridClosure = true;   // both exist
                adjacentClosure = true;
            }
        }else{
            adjacentClosure = true; 
            hybridClosure = true; // does not exist
        }

        let endToEndClosure = palindromeCheck(nowArray);

        if((adjacentClosure && hybridClosure) || endToEndClosure){
            return true;
        }else{
            return false;
        }
    } else {
        return false;
    }
}

function openCloseCheck(nowArray) {
    let thisLength = nowArray.length;
    var trackerObj = {
        valid: true,
        spliceIndicator: null
    };
    for(let i=0; i < thisLength-1 ; i+=2){
        if(nowArray[i+1] != bracketMap.get(nowArray[i])){
            trackerObj = {
                valid:  false,
                spliceIndicator: i,
              };
            return trackerObj;
        }
    }
    return trackerObj;
}
function palindromeCheck(nowArray) {
    let thisLength = nowArray.length;
    for(let i=0; i < thisLength / 2; i++){
        if(nowArray[thisLength-i-1] != bracketMap.get(nowArray[i])){
            return false;
        }
    }
    return true;
}
