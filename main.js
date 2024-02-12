
const searchParams = new URLSearchParams(window.location.search);


let numExist = []

let button = document.getElementById("numBut")


const winPos = [
    [0,1,2,3,4],
    [5,6,7,8,9],
    [10,11,12,13,14],
    [15,16,17,18,19],
    [20,21,22,23,24],
    [0,5,10,15,20],
    [1,6,11,16,21],
    [2,7,12,17,22],
    [3,8,13,18,23],
    [4,9,14,19,24],
    [0,6,12,18,24],
    [4,8,12,16,20]
]

const table = document.querySelector("#tblBingo")

let arr = Array.apply(null, {length: 50}).map(Number.call, Number)
arr.shift()
shuffle(arr);

let x = searchParams.get("User1");
let y = searchParams.get("User2");
let z = searchParams.get("User3");
let w = searchParams.get("User4");




document.getElementById("User1").innerHTML = x;
document.getElementById("User2").innerHTML = y;
document.getElementById("User3").innerHTML = z;
document.getElementById("User4").innerHTML = w;





function randomNumber(){

    let num = Math.floor(Math.random()*50)
    while (numExist.includes(num)){
        num = Math.floor(Math.random()*50)

    }
    return numExist.unshift(num)
}

function myNumber(){
    randomNumber();
    document.getElementById("numList").innerHTML = numExist
    document.getElementById("numGen").innerHTML = numExist[0]
    if (numExist.length === 25 ){
        button.style.display = "none";
        document.getElementById("Over").innerHTML = "Se acabo el juego"
    }
}


function shuffle(arr){
    let currentIndex = arr.length, randomIndex;

    while (currentIndex !=0){
        randomIndex = Math.floor(Math.random()*currentIndex);
        currentIndex--;

        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]

    }

    return arr;
}

let contador = 0;

for(i=0; i<5 ; i++){
    let tr = document.createElement("tr")
    table.appendChild(tr)
    for(j=0; j<5; j++){
        let td = document.createElement("td")
        td.id = arr[contador].toString()
        td.style.height = "20%"
        td.style.width = "20%"
        td.classList.add("main-table-cell")

        let div = document.createElement("div")
        div.classList.add("cell-format")
        div.textContent = arr[contador].toString()
        td.appendChild(div)
        tr.appendChild(td)
        contador++;

    }
}

const cell = document.querySelectorAll(".main-table-cell");

let puntaje = 0

cell.forEach(e =>{
    e.addEventListener("click", () =>{
        e.classList.add("strickout");

        if(matchWin()){
            
            puntaje++;

            document.getElementById("Puntaje").innerHTML = "Puntaje: " + puntaje
        }
    })
})



function matchWin(){
    const cell = document.querySelectorAll(".main-table-cell");

    return winPos.some(combination =>{
        let comb = 0
        combination.forEach(index =>{
            if(cell[index].classList.contains("strickout")) comb++;
        })

        if (comb === 5){
            let comparer1 = [0,6,12,18,24]
            let comparer2 = [4,8,12,16,20]
            let indexWin = winPos.indexOf(combination)
            if (combination.toString() === comparer1.toString()|| combination.toString() === comparer2.toString() ){
                puntaje = puntaje + 2
            }

            winPos.splice(indexWin,1)
            
        }

        return combination.every(index => {
            return cell[index].classList.contains("strickout")
        })
    })
}
