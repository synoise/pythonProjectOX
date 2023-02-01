document.addEventListener('DOMContentLoaded', () => {



        const chatSocket = new WebSocket(
            'ws://'
            + window.location.host
            + '/ws/chat/array/'
        );
        //
        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            console.log(data.message)
            setRecivedAIX(data.message[1])
        };
        //
        // chatSocket.onclose = function(e) {
        //     console.error('Chat socket closed unexpectedly');
        // };

        // document.querySelector('#chat-message-input').focus();
        // document.querySelector('#chat-message-input').onkeyup = function(e) {
        //     if (e.keyCode === 13) {  // enter, return
        //         document.querySelector('#chat-message-submit').click();
        //     }
        // };

        //document.querySelector('#chat-message-submit').onclick = function(e) {
        //     const messageInputDom = document.querySelector('#chat-message-input');
        //     const message = "messageInputDom.value;"
        //     chatSocket.send(JSON.stringify({
        //         'message': message
        //     }));
        //     messageInputDom.value = '';
       // };


    let gamer = true;

    let symbol = gamer === true ? 'X' : 'O';
    let boardSize = 20;

    //fills the board with boxes with coordinates
    function makeNewBoard() {
        $('#board').empty().off();
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                let square = `<div class='square' data-xy=${i+','+j}></div>`;
                $('#board').append(square);
            }
        }
    }
    makeNewBoard();

    //on kilck places a symbol of one of the players
    $('.square').on('click', function () {
        if ($(this).text() === '') {
            $(this).toggleClass('rotator');
            gamer = gamer === true ? false : true;
            symbol = gamer === true ? 'X' : 'O';
            //console.log(symbol,gamer,$(this).data('xy'));
            $(this).html(symbol);
            checkForWinner()
        }
    });

    function parser(x){
        return x === "" ? 0 : (x==="X"? 1 : -1 )
    }

    function sendMessage(param,winner) {
         chatSocket.send(JSON.stringify({
                 'message': param,
                 'winner': winner
             }));
    }

    function setRecivedAIX(x) {
         //for (let i = 0; i < boardSize * boardSize; i++) {
        gamer = gamer === true ? false : true;
        $('.square').eq(x).text("X")
         //}
    }

    function checkForWinner() {
        let $square = $('.square');
        // console.log($square.eq(1).text())
        let gameArray = []
        let winner = ""
        for (let i = 0; i < boardSize * boardSize; i++) {
            $square.eq(i).text()
            gameArray.push(parser($square.eq(i).text()))
            //checking for winner in horizontal plane
            if ($square.eq(i).text() !== '' &&
                $square.eq(i).text() === $square.eq(i + 1).text() &&
                $square.eq(i + 1).text() === $square.eq(i + 2).text() &&
                $square.eq(i + 2).text() === $square.eq(i + 3).text() &&
                $square.eq(i + 3).text() === $square.eq(i + 4).text()) {
                    console.log('winner is ', $square.eq(i).text(), ' horizontally');
                    winner = $square.eq(i).text()
                makeNewBoard();
            }
            //checking for winner in vertical plane
            else if ($square.eq(i).text() !== '' &&
                $square.eq(i).text() === $square.eq(i + boardSize).text() &&
                $square.eq(i + boardSize).text() === $square.eq(i + boardSize*2).text() &&
                $square.eq(i + boardSize*2).text() === $square.eq(i + boardSize*2).text() &&
                $square.eq(i + boardSize*2).text() === $square.eq(i + boardSize*2).text()) {
                    console.log('winner is ', $square.eq(i).text(), ' vertically');
                    winner = $square.eq(i).text()
                makeNewBoard();
            }
            //checking for winner on a diagonal forward plane
            else if ($square.eq(i).text() !== '' &&
                $square.eq(i).text() === $square.eq(i + boardSize*2+1).text() &&
                $square.eq(i + boardSize*2+1).text() === $square.eq(i + boardSize*2+2).text() &&
                $square.eq(i + boardSize*2+2).text() === $square.eq(i + boardSize*3+3).text() &&
                $square.eq(i + boardSize*3+3).text() === $square.eq(i + boardSize*4+4).text()) {
                    console.log('winner is '+ $square.eq(i).text()+ ' diagonally');
                    winner = $square.eq(i).text()
                makeNewBoard();
            }
            //checking for winner in a minus diagonal option
            else if ($square.eq(i).text() !== '' &&
                $square.eq(i).text() === $square.eq(i + boardSize-1).text() &&
                $square.eq(i + boardSize-1).text() === $square.eq(i + boardSize*2-2).text() &&
                $square.eq(i + boardSize*2-2).text() === $square.eq(i + boardSize*3-3).text() &&
                $square.eq(i + boardSize*3-3).text() === $square.eq(i + boardSize*4-4).text()) {
                    console.log('winner is '+ $square.eq(i).text()+ ' anti-diagonally');
                    winner = $square.eq(i).text()
                makeNewBoard();
            }
        }
        // console.log(gameArray,parser(winner))
        sendMessage(gameArray,parser(winner))
    }
    //git is counterintuiitive
}) 