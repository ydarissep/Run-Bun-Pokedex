async function getMoves(Moves){
    footerP("Fetching moves")
    const rawMoves = await fetch(`https://raw.githubusercontent.com/${repo}/moves/battle_moves.h`)
    const textMoves = await rawMoves.text()

    return regexMoves(textMoves, Moves)
}

async function getMovesDescription(Moves){
    footerP("Fetching moves descriptions")
    const rawMovesDescription = await fetch(`https://raw.githubusercontent.com/${repo}/moves/move_descriptions.h`)
    const textMovesDescription = await rawMovesDescription.text()

    return regexMovesDescription(textMovesDescription, Moves)
}



async function buildMovesObj(){
    let moves = {}
    moves = await getMoves(moves)
    moves = await getMovesDescription(moves)

    await localStorage.setItem("moves", LZString.compressToUTF16(JSON.stringify(moves)))
    return moves
}


async function fetchMovesObj(){
    if(!localStorage.getItem("moves")){
        window.moves = await buildMovesObj()
    }
    else{
        window.moves = await JSON.parse(LZString.decompressFromUTF16(localStorage.getItem("moves")))
    }

    window.movesTracker = []
    for(let i = 0, j = Object.keys(moves).length; i < j; i++){
        movesTracker[i] = {}
        movesTracker[i]["key"] = Object.keys(moves)[i]
        movesTracker[i]["filter"] = []
    }
}