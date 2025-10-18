

const createPlayer = function (Pname){
    let PlayerName = Pname;
    let Score = 0;
    const wins = () => Score++;
    const getScore = () => Score;
    const resetScore = () => Score = 0;
    return { PlayerName, wins, getScore, resetScore };
}

const createGamebox =  function(id){
    let uqid = id;
    let state = 0;
    return {uqid, state};
}

const Gameboard = function(){
    let track = 0;
    //take input name
    let Player1 = createPlayer("Sirjan");
    let Player2 = createPlayer("Deep");
    //create event
    let click = new Event('click', {
        bubbles: true,
        cancelable: true,
    });
    //create and dispatch dialogue and dom elements
    const congodig = document.getElementById('congo');
    const mycongo = document.getElementById('mycongo');
    const mycontinue = document.getElementById('continue');
    const inputdig = document.getElementById('input');
    const submit = document.getElementById('submit');
    const head1 = document.getElementById('player1');
    const head2 = document.getElementById('player2');
    let p1 = document.getElementById('P1');
    let p2 = document.getElementById('P2');

    submit.addEventListener('click', (e)=> {
        e.preventDefault();
        Player1.PlayerName = p1.value == "" ? "Sirjandeep" : p1.value;
        Player2.PlayerName = p2.value == "" ? "ShadowKnightX" : p2.value;
        head1.textContent = `${Player1.PlayerName} : ${Player1.getScore()}`;
        head2.textContent = `${Player2.PlayerName} : ${Player2.getScore()}`;
        inputdig.close();
    });

    mycontinue.addEventListener('click', (e)=> {
    congodig.close();
    });


    //turn tracker
    let playing = 1;
    //create an array with boxes
    array = [];
    for(let i = 1 ; i <= 9 ; i++){
        array.push(createGamebox(`${i}`));
    }

    //imageDOM CREATER
    let createimagecircle = function(){
        let img = document.createElement('img');
        img.style.height = '50%';
        img.src = './image/circle-ring.svg';
        img.alt = 'circle'
        return img;
    }

    let createimagecross = function(){
        let img = document.createElement('img');
        img.style.height = '80%';
        img.src = './image/cross.svg';
        img.alt = 'cross';
        return img;
    }

    //ResetEverything except score
    const resetwin = function(){
        playing = 1;
        track = 0;
        for(let i = 0 ; i < 9 ; i++){
            array[i].state = 0;
            let element = document.getElementById(`${i+1}`);
            element.innerHTML = '';
        }
    }

    //winner checker
    let checkwinner = function(){
        const winningCombinations = [
            [0, 1, 2],  // row 1
            [3, 4, 5],  // row 2
            [6, 7, 8],  // row 3
            [0, 3, 6],  // col 1
            [1, 4, 7],  // col 2
            [2, 5, 8],  // col 3
            [0, 4, 8],  // diagonal
            [2, 4, 6]   // diagonal
        ];

        for(let combo of winningCombinations){
            let [a,b,c] = combo;
            if(array[a].state != 0 && array[a].state === array[b].state && array[a].state === array[c].state) return array[a].state;
        }
        return 0;
    }


    //event listener for playing
    const play = document.getElementById('play');

    play.addEventListener('click', (e) => {
        let target = e.target;

        //verify
        if(!target.classList.contains('unit')){
            return;
        }
        
        //play move
        for(let k of array){
            if(k.uqid == target.id && k.state == 0){
                if(playing === 1){
                    target.appendChild(createimagecross());
                }
                else {
                    target.appendChild(createimagecircle());
                }
                k.state = playing;
                playing = playing == 1? 2 : 1;
            }
        }
        track++;
        //check for winners
        let k = checkwinner();
        if(k != 0){
            if(k == 1){
                Player1.wins(); 
                mycongo.textContent = ` Congratulations ${Player1.PlayerName} wins`;
            }else{
                Player2.wins();
                mycongo.textContent = ` Congratulations ${Player2.PlayerName} wins`;
            }
            resetwin();
            head1.textContent = `${Player1.PlayerName} : ${Player1.getScore()}`;
            head2.textContent = `${Player2.PlayerName} : ${Player2.getScore()}`;
            //call dialogue for winning
            congodig.showModal();
        }

        //reset on draw
        if(track == 9){
            resetwin();
        }
    });

    const reset = document.getElementById('reset');
    reset.addEventListener('click', () => {
        for(let i = 0 ; i < 9 ; i++){
            array[i].state = 0;
            let element = document.getElementById(`${i+1}`);
            element.innerHTML = '';
        }
        Player1.resetScore();
        Player2.resetScore();
        p1.value = "";
        p2.value = "";
        //call for dialogue with form
        inputdig.showModal();
    });


    //start of website :D
    inputdig.showModal();
}();