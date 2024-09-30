function gameStatus(piece){
    let pieceColour;
    let piecesClass; // to store all the pieces
    //storing all possible one step ahead moves for pieces to check for stalemate
    let pawnMove;
    const knightMove =[[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];
    const bishopMove = [[1,1],[1,-1],[-1,1],[-1,-1]];
    const rookMove = [[0,1],[0,-1],[1,0],[-1,0]];
    const queenMove = [[1,1],[1,-1],[-1,1],[-1,-1],[0,1],[0,-1],[1,0],[-1,0] ];
    if(piece[0] == 'w'){
        pieceColour = 'b';
        piecesClass = ['.bk','.bp','.bn','.bb','.br','.bq'];
        pawnMove = [[0,-2],[0,-1],[1,-1],[-1,-1]];
    }
    else{
        pieceColour = 'w';
        piecesClass = ['.wK','.wP','.wN','.wB','.wR','.wQ'];
        pawnMove = [[0,2],[0,1],[1,1],[-1,1]];
    }
    const pawns = document.body.querySelectorAll(piecesClass[1]);
    const knights = document.body.querySelectorAll(piecesClass[2]);
    const bishops = document.body.querySelectorAll(piecesClass[3]);
    const rooks = document.body.querySelectorAll(piecesClass[4]);
    const queens = document.body.querySelectorAll(piecesClass[5]);
    let king = document.body.querySelector(piecesClass[0]); //store position of king
    let currentPos = king.parentNode.id;
    let kingCanMove = false;
    let kingPossibleMoves = checkKingMove(currentPos[0],parseInt(currentPos[1]),null,false).possibleMoves; // storing whether it has possible moves
    for(let move of kingPossibleMoves){
        if (kingSimulator(currentPos[0],parseInt(currentPos[1]),move,pieceColour,king)) {
            kingCanMove = true;
            break;
        }
    }
    let inCheck = isCheck(pieceColour);
    let possibleMoves = inCheck.possibleMoves;
    if(possibleMoves && !inCheck.valid){//checking if u can block or kill the piece
        console.log(possibleMoves);
        for(let move of possibleMoves){
            let moveId = '#' + move;
            let target = document.body.querySelector(moveId);
            console.log(move);
            for(let pawn of pawns){
                if(isValid(piecesClass[1].slice(1), pawn.parentNode.id, move,target,pawn,true)) return 'validGame';
            }
            console.log('pawn block possible');
            for(let knight of knights){
                if(isValid(piecesClass[2].slice(1), knight.parentNode.id, move,target,knight,true)) return 'validGame';
            }
            console.log('knight block possible');
            for(let bishop of bishops){
                if(isValid(piecesClass[3].slice(1), bishop.parentNode.id, move,target,bishop,true)) return 'validGame';
            }
            console.log('bishop block possible');
            for(let rook of rooks){
                if(isValid(piecesClass[4].slice(1), rook.parentNode.id, move,target,rook,true)) return 'validGame';
            }
            console.log('rook block possible');
            for(let queen of queens){
                if(isValid(piecesClass[5].slice(1), queen.parentNode.id, move,target,queen,true)) return 'validGame';
            }
            console.log('queen block possible');
        }
        console.log('no possible move');
    }
    console.log('no possible block');
    console.log(kingCanMove);
    if(kingCanMove == false){//checkmate
        if(!inCheck.valid){
            console.log('checkmate');
            return 'checkmate';
        }
        else{
            for(let pawn of pawns){
                for(let move of pawnMove){
                    let moveId = '#' + String.fromCharCode(pawn.parentNode.id.charCodeAt(0) + move[0]) + (parseInt(pawn.parentNode.id[1]) + move[1]);
                    if(moveId[1] >= 'a' && moveId[1] <= 'h' && parseInt(moveId.slice(2)) >= 1 && parseInt(moveId.slice(2)) <= 8){
                        // console.log(moveId);
                        let target = document.body.querySelector(moveId);
                        if(isValid(piecesClass[1].slice(1), pawn.parentNode.id, moveId.slice(1),target,pawn,true)) return 'validGame';
                    }   
                }
            }
            // console.log('pawn not possible');
            for(let knight of knights){
                for(let move of knightMove){
                    let moveId = '#' + String.fromCharCode(knight.parentNode.id.charCodeAt(0) + move[0]) + (parseInt(knight.parentNode.id[1]) + move[1]);
                    if(moveId[1] >= 'a' && moveId[1] <= 'h' && parseInt(moveId.slice(2)) >= 1 && parseInt(moveId.slice(2)) <= 8){
                        // console.log(moveId);
                        let target = document.body.querySelector(moveId);
                        if(isValid(piecesClass[2].slice(1), knight.parentNode.id, moveId.slice(1),target,knight,true)) return 'validGame';
                    } 
                }
            }
            // console.log('knight possible');
            for(let bishop of bishops){
                for(let move of bishopMove){
                    let moveId = '#' + String.fromCharCode(bishop.parentNode.id.charCodeAt(0) + move[0]) + (parseInt(bishop.parentNode.id[1]) + move[1]);
                    if(moveId[1] >= 'a' && moveId[1] <= 'h' && parseInt(moveId.slice(2)) >= 1 && parseInt(moveId.slice(2)) <= 8){
                        // console.log(moveId);
                        let target = document.body.querySelector(moveId);
                        if(isValid(piecesClass[3].slice(1), bishop.parentNode.id, moveId.slice(1),target,bishop,true)) return 'validGame';
                    }
                    
                }
            }
            // console.log('bishop possible');
            for(let rook of rooks){
                for(let move of rookMove){
                    let moveId = '#' + String.fromCharCode(rook.parentNode.id.charCodeAt(0) + move[0]) + (parseInt(rook.parentNode.id[1]) + move[1]);
                    if(moveId[1] >= 'a' && moveId[1] <= 'h' && parseInt(moveId.slice(2)) >= 1 && parseInt(moveId.slice(2)) <= 8){
                        // console.log(moveId);
                        let target = document.body.querySelector(moveId);
                        if(isValid(piecesClass[4].slice(1), rook.parentNode.id, moveId.slice(1),target,rook,true)) return 'validGame';
                    }
                    
                }
            }
            // console.log('rook possible');
            for(let queen of queens){
                for(let move of queenMove){
                    let moveId = '#' + String.fromCharCode(queen.parentNode.id.charCodeAt(0) + move[0]) + (parseInt(queen.parentNode.id[1]) + move[1]);
                    if(moveId[1] >= 'a' && moveId[1] <= 'h' && parseInt(moveId.slice(2)) >= 1 && parseInt(moveId.slice(2)) <= 8){
                        // console.log(moveId);
                        let target = document.body.querySelector(moveId);
                        if(isValid(piecesClass[5].slice(1), queen.parentNode.id, moveId.slice(1),target,queen,true)) return 'validGame';
                    }
                }
            }
            // console.log('queen possible');
        return 'stalemate';
        }
    }
    return 'validGame';
}

function isValid(piece, initialPos, finalPos, target ,draggedPiece,check){
    const initialFile = initialPos[0];// stores the alphabet of notation
    const initialRank = parseInt(initialPos[1]);//stores the number of notation
    const existingPiece = target.querySelector('.piece');
    let finalId = '#'+finalPos;
    let pieceOpp = document.body.querySelector(finalId).children;
    let colour = (piece[0] == 'w') ? 'white' : 'black'
    const moveData = {'piece' : piece , 'initialPos' : initialPos , 'finalPos' : finalPos , 'colour' : colour , 'castle' : false}
    if(pieceOpp.length != 0){
        pieceOpp = pieceOpp[0].classList[1][0];//stores colour of piece in that square
    }
    if (initialPos === finalPos){
        return false;
    }
    switch (piece) {
        case 'wP':
            if (checkWhitePawnMove(initialFile,initialRank,finalPos) &&
            handleCheck(piece,existingPiece,initialPos,finalPos,draggedPiece)){
                if(existingPiece){
                    if (existingPiece.classList[1][0] !== piece[0]){
                        if(check == false) existingPiece.remove();
                    } else{
                        return false;
                    }
                }
                if(check == false){
                    socket.send(JSON.stringify({
                    'action': 'move',
                    'data': moveData
                }));
                }
                return true;
            }
            return false;

        case 'bp':
            if (checkBlackPawnMove(initialFile,initialRank,finalPos) &&
            handleCheck(piece,existingPiece,initialPos,finalPos,draggedPiece)){
                if(existingPiece){
                    if (existingPiece.classList[1][0] !== piece[0]){
                        if(check == false) existingPiece.remove();
                        //return true;
                    } else{
                        return false;
                    }
                }
                if(check == false){
                    socket.send(JSON.stringify({
                    'action': 'move',
                    'data': moveData
                }));
                }
                return true;
            }
            return false;

        case 'wR':
        case 'br':
            if (checkRookMove(initialFile,initialRank,finalPos) &&
            handleCheck(piece,existingPiece,initialPos,finalPos,draggedPiece)){
                draggedPiece.classList.remove('castle');
                if(existingPiece){
                    if (existingPiece.classList[1][0] !== piece[0]){
                        if(check == false) existingPiece.remove();
                    } else{
                        return false;
                    }
                }
                if(check == false){
                    socket.send(JSON.stringify({
                    'action': 'move',
                    'data': moveData
                }));
                }
                return true;
            }
            return false;

        case 'wB':
        case 'bb':
            if (checkBishopMove(initialFile,initialRank,finalPos) &&
            handleCheck(piece,existingPiece,initialPos,finalPos,draggedPiece)){
                if(existingPiece){
                    if (existingPiece.classList[1][0] !== piece[0]){
                        if(check == false) existingPiece.remove();
                    } else{
                        return false;
                    }
                }
                if(check == false){
                    socket.send(JSON.stringify({
                    'action': 'move',
                    'data': moveData
                }));
                }
                return true;
            }
            return false;

        case 'wQ':
        case 'bq':
            if((checkRookMove(initialFile,initialRank,finalPos) || checkBishopMove(initialFile,initialRank,finalPos)) &&
            handleCheck(piece,existingPiece,initialPos,finalPos,draggedPiece)){
                if(existingPiece){
                    if (existingPiece.classList[1][0] !== piece[0]){
                        if(check == false) existingPiece.remove();
                    } else{
                        return false;
                    }
                }
                if(check == false){
                    socket.send(JSON.stringify({
                    'action': 'move',
                    'data': moveData
                }));
                }
                return true;
            }
        return false;

        case 'wN':
        case 'bn':
            if (checkKnightMove(initialFile,initialRank,finalPos) &&
            handleCheck(piece,existingPiece,initialPos,finalPos,draggedPiece)){
                if(existingPiece){
                    if (existingPiece.classList[1][0] !== piece[0]){
                        if(check == false) existingPiece.remove();
                    } else{
                        return false;
                    }
                }
                if(check == false){
                    socket.send(JSON.stringify({
                    'action': 'move',
                    'data': moveData
                }));
                }
                return true;
            }
            return false;
            
        case 'wK':
        case 'bk':
            let checkKing = checkKingMove(initialFile,initialRank,finalPos,true)
            if (checkKing.valid &&
            handleCheck(piece,existingPiece,initialPos,finalPos,draggedPiece)){
                draggedPiece.classList.remove('castle');
                if(existingPiece){
                    if (existingPiece.classList[1][0] !== piece[0]){
                        if(check == false) existingPiece.remove();
                    } else{
                        return false;
                    }
                }
                if(Math.abs(initialFile.charCodeAt(0) - finalPos.charCodeAt(0))) moveData.castle = checkKing.castle
                if(check == false){
                    socket.send(JSON.stringify({
                    'action': 'move',
                    'data': moveData
                }));
                }
                return true;
            }
            return false;
    }
    return false;
}

function checkBlackPawnMove(initialFile,initialRank,finalPos){
    let finalId = '#'+finalPos;
    let pawn = document.getElementById(initialFile+initialRank);
    let pieceOpp = document.body.querySelector(finalId).children;
    if(pieceOpp.length != 0){
        pieceOpp = pieceOpp[0].classList[1][0];
    }
    // pawn forward move by one
    if (finalPos[0] === initialFile && parseInt(finalPos[1]) === initialRank - 1 && pieceOpp != 'w'){
        return true;
    }
    // double move on first turn
    if (initialRank === 7 && finalPos[0] === initialFile && parseInt(finalPos[1]) === 5 && pieceOpp != 'w'){
        let moveAhead = '#' + initialFile + (initialRank - 1);
        let oneMoveAhead = document.body.querySelector(moveAhead);
        document.getElementById(initialFile+initialRank).children[0].classList.add('en-passant');
        if(oneMoveAhead.children.length != 0) return false;
        else return true;
    }
    // capturing
    if (Math.abs(finalPos[0].charCodeAt(0) - initialFile.charCodeAt(0)) === 1 && parseInt(finalPos[1]) === initialRank - 1 
    && pieceOpp == 'w') {
        return true;
    }
    if (Math.abs(finalPos[0].charCodeAt(0) - initialFile.charCodeAt(0)) === 1 && parseInt(finalPos[1]) === initialRank - 1 && 
    pawn.previousSibling.children.length > 0 && pawn.previousSibling.children[0].classList.contains('en-passant')){
        pawn.previousSibling.children[0].remove();
        return true;
    }
    else if (Math.abs(finalPos[0].charCodeAt(0) - initialFile.charCodeAt(0)) === 1 && parseInt(finalPos[1]) === initialRank - 1 && 
    pawn.nextSibling.children.length > 0 && pawn.nextSibling.children[0].classList.contains('en-passant')){
        pawn.nextSibling.children[0].remove();
        return true;
    }
    return false;
}

function checkWhitePawnMove(initialFile,initialRank,finalPos){
    let finalId = '#'+finalPos;
    let pieceOpp = document.body.querySelector(finalId).children;
    let pawn = document.getElementById(initialFile+initialRank);
    if(pieceOpp.length != 0){
        pieceOpp = pieceOpp[0].classList[1][0];
    }
    // pawn forward move by one
    if (finalPos[0] === initialFile && parseInt(finalPos[1]) === initialRank + 1 && pieceOpp != 'b'){
        return true;
    }
    // double move on first turn
    if (initialRank === 2 && finalPos[0] === initialFile && parseInt(finalPos[1]) === 4 && pieceOpp != 'b'){
        let moveAhead = '#' + initialFile + (initialRank + 1);
        document.getElementById(initialFile+initialRank).children[0].classList.add('en-passant');
        let oneMoveAhead = document.body.querySelector(moveAhead);
        if(oneMoveAhead.children.length != 0) return false;
        else return true;
    }
    // capturing
    if (Math.abs(finalPos[0].charCodeAt(0) - initialFile.charCodeAt(0)) === 1 && parseInt(finalPos[1]) === initialRank + 1
     && pieceOpp == 'b'){
        return true;
    }
    if (Math.abs(finalPos[0].charCodeAt(0) - initialFile.charCodeAt(0)) === 1 && parseInt(finalPos[1]) === initialRank + 1 && 
    pawn.previousSibling.children.length > 0 && pawn.previousSibling.children[0].classList.contains('en-passant')){
        pawn.previousSibling.children[0].remove();
        return true;
    }
    else if (Math.abs(finalPos[0].charCodeAt(0) - initialFile.charCodeAt(0)) === 1 && parseInt(finalPos[1]) === initialRank + 1 && 
    pawn.nextSibling.children.length > 0 && pawn.nextSibling.children[0].classList.contains('en-passant')){
        pawn.nextSibling.children[0].remove();
        return true;
    }
    return false;
}

function checkKnightMove(initialFile,initialRank,finalPos){
    const move =  [[2, 1], [2, -1], [-2, 1], [-2, -1], 
                      [1, 2], [1, -2], [-1, 2], [-1, -2]]; //all possible movements of knight
    for(let m of move){
        let possibleFile = String.fromCharCode(initialFile.charCodeAt(0) + m[0]);
        let possibleRank = initialRank + m[1];
        if(possibleFile >= 'a' && possibleFile <= 'h' && possibleRank >= 1 
            && possibleRank <= 8 && (possibleFile + possibleRank) === finalPos ){
                return true;
            }
    }
    return false;
}

function checkRookMove(initialFile,initialRank,finalPos) {
    // vertical movement
    if (finalPos[0] === initialFile) {
        let min = Math.min(initialRank, parseInt(finalPos[1]));
        let max = Math.max(initialRank, parseInt(finalPos[1]));
        for (let i = min + 1; i < max; i++) {
            if (document.getElementById(`${finalPos[0]}${i}`).childNodes.length > 0) {
                return false;
            }
        }
        return true;
    }
    // horizontal movement
    if (parseInt(finalPos[1]) === initialRank) {
        let min = Math.min(initialFile.charCodeAt(0), finalPos[0].charCodeAt(0));
        let max = Math.max(initialFile.charCodeAt(0), finalPos[0].charCodeAt(0));
        for (let i = min + 1; i < max; i++) {
            if (document.getElementById(`${String.fromCharCode(i)}${parseInt(finalPos[1])}`).childNodes.length > 0) {
                return false;
            }
        }
        return true;
    }
    return false;
}

function checkBishopMove(initialFile,initialRank,finalPos) {
    let countRight = initialFile.charCodeAt(0) + 1;
    let countLeft = initialFile.charCodeAt(0) - 1;
    let rightUp = true;
    let rightDown = true;
    let leftUp = true;
    let leftDown = true;
    for (let j = 1; j <= 8; j++){
        let tempUp = initialRank + j; //storing file ranks for upper 
        let tempDown = initialRank - j; //storing file ranks for lower

        if(rightUp && String.fromCharCode(countRight) <= 'h' && tempUp <= 8){//right up
            let move = String.fromCharCode(countRight) + tempUp;
            if(move === finalPos) {
                return true;
            }
            if(document.getElementById(move).childNodes.length > 0){
                rightUp = false;
            }
        }

        if(rightDown && String.fromCharCode(countRight) <= 'h' && tempDown >= 1){//right down
            let move = String.fromCharCode(countRight) + tempDown;
            if (move === finalPos){
                return true;
            }
            if (document.getElementById(move).childNodes.length > 0){
                rightDown = false;
            }
            
        }

        if (leftUp && String.fromCharCode(countLeft) >= 'a' && tempUp <= 8){//left up
            let move = String.fromCharCode(countLeft) + tempUp;
            if (move === finalPos){
                return true;
            }
            if (document.getElementById(move).childNodes.length > 0){
                leftUp = false;
            }

        }

        if (leftDown && String.fromCharCode(countLeft) >= 'a' && tempDown >= 1){//left down
            let move = String.fromCharCode(countLeft) + tempDown;
            if (move === finalPos){
                return true;
            }
            if (document.getElementById(move).childNodes.length > 0){
                leftDown = false;
            }
        }

        countRight++;
        countLeft--;
    }
    return false;
}

function checkKingMove(initialFile,initialRank,finalPos,check){
    const moveKing = [[1, 1], [1, 0], [1, -1], [0, -1], 
    [0, 1], [-1, 1], [-1, 0], [-1, -1]]; // all possible movements of king
    const kingPosition = document.body.querySelector(`#${(initialFile + initialRank)}`);  
    const king = kingPosition.children[0].classList[1];
    const kingOpp = (king == 'wK') ? 'bk' : 'wK';
    const kingOppPiece = document.body.querySelector(`.${kingOpp}`);
    let possibleOppMoves = [];
    for(let m of moveKing){
        let possibleFile = String.fromCharCode(kingOppPiece.parentNode.id.charCodeAt(0) + m[0]);
        let possibleRank = parseInt(kingOppPiece.parentNode.id[1]) + m[1];
        if(possibleFile >= 'a' && possibleFile <= 'h' && possibleRank >= 1 && possibleRank <= 8){
            possibleOppMoves.push(possibleFile+possibleRank);
        }
    }
    let possibleMoves = [];
    for(let m of moveKing){
        let possibleFile = String.fromCharCode(initialFile.charCodeAt(0) + m[0]);
        let possibleRank = initialRank + m[1];
        if(possibleFile >= 'a' && possibleFile <= 'h' && possibleRank >= 1 && possibleRank <= 8 && !possibleOppMoves.includes(possibleFile+possibleRank)){
            possibleMoves.push(possibleFile+possibleRank);
            if((possibleFile + possibleRank) === finalPos){
                return {
                    possibleMoves : possibleMoves,
                    valid : true,
                    castle : [false]
                };
            }
        }
    }
    if(((initialFile+initialRank) == 'e8' || (initialFile+initialRank) == 'e1') && check){//castling
        const finalPosition = document.body.querySelector(`#${finalPos}`);
        const rookPosition1 = document.body.querySelector(`#${('a' + initialRank)}`);
        const rookPosition2 = document.body.querySelector(`#${('h' + initialRank)}`);
        const inCheck = handleCheck(king,null,(initialFile+initialRank),(initialFile+initialRank),kingPosition.children[0]);
        if(finalPosition.children.length == 0 && kingPosition.children.length > 0 && kingPosition.children[0].classList.contains('castle') && inCheck){
            if(finalPos == ('g' + initialRank) && rookPosition2.children && rookPosition2.children[0].classList.contains('castle')){
                const square1 = document.body.querySelector(`#${('f' + initialRank)}`);
                const rook = rookPosition2.children[0];
                if(square1.children.length == 0 && handleCheck(king,finalPosition.querySelector('.piece'),(initialFile+initialRank),square1.id,kingPosition.children[0])){
                    rook.classList.remove('castle');
                    square1.appendChild(rook);
                    return {
                        possibleMoves : possibleMoves,
                        valid : true,
                        castle : [true , ('h' + initialRank) , ('f' + initialRank)]
                    };
                }
            }
            else if(finalPos == ('c' + initialRank) && rookPosition1.children && rookPosition1.children[0].classList.contains('castle')){
                console.log('entered');
                const square1 = document.body.querySelector(`#${('d' + initialRank)}`);
                const square2 = document.body.querySelector(`#${('b' + initialRank)}`);
                const rook = rookPosition1.children[0];
                if(square1.children.length == 0 && handleCheck(king,finalPosition.querySelector('.piece'),(initialFile+initialRank),square1.id,kingPosition.children[0])
                && square2.children.length == 0){
                    rook.classList.remove('castle');
                    square1.appendChild(rook);
                    return {
                        possibleMoves : possibleMoves,
                        valid : true,
                        castle :[true , ('a' + initialRank) , ('d' + initialRank)]

                    };
                }
            }
        }
    }
    return{
        possibleMoves : possibleMoves,
        valid : false,
        castle : [false]
    };
    
}

function handleCheck(piece,existingPiece,initialPos,finalPos,draggedPiece){//simulating the moved piece
    let initialSquare = document.getElementById(initialPos);
    let finalSquare = document.getElementById(finalPos);
    let pieceColour = null;
    if(existingPiece){
        pieceColour = existingPiece.classList[1][0];
    }
    if(existingPiece && draggedPiece.classList[1][0] != pieceColour){
        existingPiece.remove();
        finalSquare.appendChild(draggedPiece);
        if(isCheck(piece[0]).valid){
            initialSquare.appendChild(draggedPiece);
            finalSquare.appendChild(existingPiece);
            return true;
        }
        finalSquare.removeChild(draggedPiece);
        initialSquare.appendChild(draggedPiece);
        finalSquare.appendChild(existingPiece);
        return false;
    }
    finalSquare.appendChild(draggedPiece);
    if(isCheck(piece[0]).valid && draggedPiece.classList[1][0] != pieceColour){
        finalSquare.removeChild(draggedPiece);//removing the element as is gets added back
        initialSquare.appendChild(draggedPiece); 
        return true;
    }
    finalSquare.removeChild(draggedPiece);
    initialSquare.appendChild(draggedPiece);
    return false;
}

function isCheck(colour){//returns true if the move is not bypassing any check
    let colourAttacker = null;
    if(colour == 'w'){//using to finding the colour of king
        colour = 'wK';
        colourAttacker = 'b';
    }
    else {
        colour = 'bk';
        colourAttacker = 'w';
    }
    let kingPosition = document.getElementsByClassName(colour)[0].parentNode.id;

    if(colourAttacker == 'b'){
        colourAttacker += 'p';
    }
    else{
        colourAttacker += 'P';
    }
    let pawnMove = pawnSimmulator(colourAttacker,kingPosition);
    if(!pawnMove.valid) {
        return {
            valid : false , 
            possibleMoves : pawnMove.possibleMoves
        };
    }

    if(colourAttacker[0] == 'b'){
        colourAttacker = 'bn';
    }
    else{
        colourAttacker = 'wN';
    }
    let knightMove = knightSimulator(colourAttacker,kingPosition);
    if(!knightMove.valid) {
        return {
            valid : false , 
            possibleMoves : knightMove.possibleMoves
        };
    }

    if(colourAttacker[0] == 'b'){
        colourAttacker = 'bb';
    }
    else{
        colourAttacker = 'wB';
    }
    let bishopMove = bishopSimulator(colourAttacker,kingPosition)
    if (!bishopMove.valid) {
        return {
            valid : false , 
            possibleMoves : bishopMove.possibleMoves
        };
    }

    if(colourAttacker[0] == 'b'){
        colourAttacker = 'br';
    }
    else{
        colourAttacker = 'wR';
    }
    let rookMove = rookSimulator(colourAttacker,kingPosition)
    if (!rookMove.valid) {
        return {
            valid : false , 
            possibleMoves : rookMove.possibleMoves
        };
    }

    if(colourAttacker[0] == 'b'){
        colourAttacker = 'bq';
    }
    else{
        colourAttacker = 'wQ';
    }

    let queenMove = queenSimulator(colourAttacker,kingPosition)
    if (!queenMove.valid) {
        return {
            valid : false , 
            possibleMoves : queenMove.possibleMoves
        };
    }
    
    return {
        valid : true , 
        possibleMoves : null
    };
}

function pawnSimmulator(colourAttacker,kingPosition){
    let pawns = document.getElementsByClassName(colourAttacker);
    let possibleMoves =[];
    for(let pawn of pawns){
        let initialFile = pawn.parentNode.id[0];
        let initialRank = parseInt(pawn.parentNode.id[1]);
        let valid = null;
        if(colourAttacker == 'wP'){
            valid = checkWhitePawnMove(initialFile,initialRank,kingPosition);
        }
        else{
            valid = checkBlackPawnMove(initialFile,initialRank,kingPosition);
        }
        if(valid == true){
            console.log('pawn check');
            possibleMoves.push(initialFile+initialRank);
            return{
                valid : false,
                possibleMoves : possibleMoves // as u can only kill the pawn in check(moving king is taken care already)
            };
        }
    }
    return{
        valid : true,
        possibleMoves : null
    };
}

function knightSimulator(colourAttacker,kingPosition){
    let knights = document.getElementsByClassName(colourAttacker);
    let possibleMoves = [];
    for(let knight of knights){
        let initialFile = knight.parentNode.id[0];
        let initialRank = parseInt(knight.parentNode.id[1]);
        let valid = checkKnightMove(initialFile,initialRank,kingPosition);
        if(valid == true){
            console.log('knight check');
            possibleMoves.push(initialFile+initialRank);
            return{
                valid : false,
                possibleMoves : possibleMoves // as u can only kill the knight in check(moving king is taken care already)
            };
        }
    }
    return{
        valid : true,
        possibleMoves : null
    };
}

function bishopSimulator(colourAttacker,kingPosition){
    let bishops = document.getElementsByClassName(colourAttacker);
    for(let bishop of bishops){
        let initialFile = bishop.parentNode.id[0];
        let initialRank = parseInt(bishop.parentNode.id[1]);
        let valid = checkBishopMove(initialFile,initialRank,kingPosition);
        if(valid == true){
            console.log('bishop check');
            possibleMoves = [];
            let kingFile = kingPosition[0];
            let kingRank = parseInt(kingPosition[1]);
            if(kingFile > initialFile){//king is towards the right
                let count = 0;
                if(kingRank > initialRank){//right top
                    for(let i = initialRank; i < kingRank;i++){
                        possibleMoves.push(String.fromCharCode(initialFile.charCodeAt(0) + count)  + i);
                        count++;
                    }
                }
                else{//right bottom
                    for(let i = initialRank; i > kingRank; i--){
                        possibleMoves.push(String.fromCharCode(initialFile.charCodeAt(0) + count)  + i);
                        count++;
                    }
                }
            }
            else{
                let count = 0;
                if(kingRank > initialRank){//left top
                    for(let i = initialRank; i < kingRank;i++){
                        possibleMoves.push(String.fromCharCode(initialFile.charCodeAt(0) + count)  + i);
                        count--;
                    }
                }
                else{//left bottom
                    for(let i = initialRank; i > kingRank; i--){
                        possibleMoves.push(String.fromCharCode(initialFile.charCodeAt(0) + count)  + i);
                        count--;
                    }
                }
            }
            return {
                valid : false,
                possibleMoves : possibleMoves
            };
        }
    }
    return{
        valid : true,
        possibleMoves : null
    };
}

function rookSimulator(colourAttacker,kingPosition){
    let rooks = document.getElementsByClassName(colourAttacker);
    for(let rook of rooks){
        let initialFile = rook.parentNode.id[0];
        let initialRank = parseInt(rook.parentNode.id[1]);
        let valid = checkRookMove(initialFile,initialRank,kingPosition);
        if(valid == true){
            console.log('rook check');
            let possibleMoves = [];
            let kingFile = kingPosition[0];
            let kingRank = parseInt(kingPosition[1]);
            if(kingFile == initialFile){//vertical
                let min = Math.min(initialRank,kingRank);
                let max = Math.max(initialRank,kingRank);
                for(let i = min; i <= max ; i++){
                    possibleMoves.push(initialFile + i);
                }
            }
            else if(initialFile == kingFile){ // horizontal
                let min = Math.min(initialFile.charCodeAt(0), kingFile.charCodeAt(0));
                let max = Math.max(initialFile.charCodeAt(0), kingFile.charCodeAt(0));
                for(let i = min; i<= max ; i++){
                    possibleMoves.push(String.fromCharCode(i) + initialFile);
                }
            }
            return {
                valid : false,
                possibleMoves : possibleMoves
            };
        }
    }
    return {
        valid : true,
        possibleMoves : null
    };
}

function queenSimulator(colourAttacker,kingPosition){
    let queens = document.getElementsByClassName(colourAttacker);
    for(let queen of queens){
        let initialFile = queen.parentNode.id[0];
        let initialRank = parseInt(queen.parentNode.id[1]);
        let valid = checkRookMove(initialFile,initialRank,kingPosition) || checkBishopMove(initialFile,initialRank,kingPosition);
        if(valid == true){
            console.log('queen check');
            possibleMoves = [];
            let kingFile = kingPosition[0];
            let kingRank = parseInt(kingPosition[1]);
            if(kingFile == initialFile){//vertical
                let min = Math.min(initialRank,kingRank);
                let max = Math.max(initialRank,kingRank);
                for(let i = min; i <= max ; i++){
                    possibleMoves.push(initialFile + i);
                }
            }
            else if(initialFile == kingFile){ // horizontal
                let min = Math.min(initialFile.charCodeAt(0), kingFile.charCodeAt(0));
                let max = Math.max(initialFile.charCodeAt(0), kingFile.charCodeAt(0));
                for(let i = min; i<= max ; i++){
                    possibleMoves.push(String.fromCharCode(i) + initialFile);
                }
            }
            else{//diagonal 
                if(kingFile > initialFile){//king is towards the right
                    let count = 0;
                    if(kingRank > initialRank){//right top
                        for(let i = initialRank; i < kingRank;i++){
                            possibleMoves.push(String.fromCharCode(initialFile.charCodeAt(0) + count)  + i);
                            count++;
                        }
                    }
                    else{//right bottom
                        for(let i = initialRank; i > kingRank; i--){
                            possibleMoves.push(String.fromCharCode(initialFile.charCodeAt(0) + count)  + i);
                            count++;
                        }
                    }
                }
                else{
                    let count = 0;
                    if(kingRank > initialRank){//left top
                        for(let i = initialRank; i < kingRank;i++){
                            possibleMoves.push(String.fromCharCode(initialFile.charCodeAt(0) + count)  + i);
                            count--;
                        }
                    }
                    else{//left bottom
                        for(let i = initialRank; i > kingRank; i--){
                            possibleMoves.push(String.fromCharCode(initialFile.charCodeAt(0) + count)  + i);
                            count--;
                        }
                    }
                }
            }
            console.log('queen check');
            return {
                valid : false,
                possibleMoves : possibleMoves
            };
        }
    }
    return{
        valid : true,
        possibleMoves : null
    };
}

function kingSimulator(initialFile,initialRank,finalPos,piece,draggedPiece){//simulating king moves
    let initialPos = initialFile + initialRank;
    let target = document.getElementById(finalPos);
    const existingPiece = target.querySelector('.piece');
    if (checkKingMove(initialFile,initialRank,finalPos,false).valid &&
    handleCheck(piece,existingPiece,initialPos,finalPos,draggedPiece)){
        if(existingPiece){
            if (existingPiece.classList[1][0] !== piece[0]){
                return true;//if it can capture
            } else{
                return false;
            }
        }
        return true; 
    }
    return false;
}

function promote(colour) {
    return new Promise((resolve) => {
        let promotion = document.body.querySelector('.promotion-box');
        promotion.style.visibility = 'visible';

        let promotionQueen = document.body.querySelector('.queen-button');
        let promotionRook = document.body.querySelector('.rook-button');
        let promotionBishop = document.body.querySelector('.bishop-button');
        let promotionKnight = document.body.querySelector('.knight-button');

        if (colour == 'b') {
            promotionQueen.innerText = '♛';
            promotionRook.innerText = '♜';
            promotionBishop.innerText = '♝';
            promotionKnight.innerText = '♞';
            promotionQueen.id = 'bq';
            promotionRook.id = 'br';
            promotionBishop.id = 'bb';
            promotionKnight.id = 'bn';
        } else {
            promotionQueen.innerText = '♕';
            promotionRook.innerText = '♖';
            promotionBishop.innerText = '♗';
            promotionKnight.innerText = '♘';
            promotionQueen.id = 'wQ';
            promotionRook.id = 'wR';
            promotionBishop.id = 'wB';
            promotionKnight.id = 'wN';
        }

        promotion.addEventListener('click', function onClick(e) {
            let target = e.target;
            promotion.style.visibility = 'hidden';
            console.dir(target);
            promotion.removeEventListener('click', onClick); // Remove the listener after the selection
            resolve({
                logo: target.innerHTML,
                piece: target.id
            });
        });
    });
}

async function handlePromotion(colour,target) {
    const pieceChosen = await promote(colour);
    const pieceElement = document.createElement('div');
    pieceElement.classList.add('piece'); // storing it as a piece
    pieceElement.classList.add(pieceChosen.piece); // storing the name of piece
    pieceElement.innerText = pieceChosen.logo;
    pieceElement.setAttribute('draggable', true);
    target.appendChild(pieceElement);
}

function storeMoves(move){
    let notation_move;
    if (move[0] == 'O') notation_move = move;
    else if(move[1].toLowerCase() == 'p'){
        notation_move = move.substring(2);
    }
    else{
        notation_move = move[1].toUpperCase() + move.substring(2);
    }
    return notation_move;
}
