document.addEventListener('DOMContentLoaded', () => {


    const chatSocket = new WebSocket(
        'ws://'
        + window.location.host
        + '/ws/chat/array/'
    );
    //
    chatSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        //console.log(data.message)
        setRecivedMove(data.message[1], data.message[2],)
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

    let gameArray = []

    //fills the board with boxes with coordinates
    function makeNewBoard() {
        gamer = true;
        symbol = gamer === true ? 'X' : 'O';

        $('#board').empty().off();
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                let square = `<div class='square' data-xy=${i + ',' + j}></div>`;
                $('#board').append(square);
            }
        }
        $('.square').on('click', moveHuman);
        gameArray = []
    }

    makeNewBoard();

    //on kilck places a symbol of one of the players


    function moveHuman() {
        addSymbol($(this))
        tura($(this).attr('data-xy'))
    }

    function addSymbol(sqr) {
        if (sqr.text() === '') {
            sqr.toggleClass('rotator');
            gamer = gamer === true ? false : true;
            symbol = gamer === true ? 'X' : 'O';
            sqr.html(symbol);
            //console.log(sqr.attr('data-xy'))
            // tura(sqr.attr('data-xy'))
        }
    }

    function setRecivedMove(i, OorX) {
        //for (let i = 0; i < boardSize * boardSize; i++) {
        // gamer = gamer === true ? false : true;
        // symbol = gamer === true ? 'X' : 'O';
        // console.log(OorX, i)
        // $('.square').eq(i).text(symbol)
        //}
        addSymbol($('.square').eq(i))
        //tura($('.square').eq(i).attr('data-xy'))
    }

    // function addAImove(i) {
    //     $('.square').eq(5).text()
    //     if ($(this).text() === '') {
    //         $(this).toggleClass('rotator');
    //         gamer = gamer === true ? false : true;
    //         symbol = gamer === true ? 'X' : 'O';
    //         //console.log(symbol,gamer,$(this).data('xy'));
    //         $(this).html(symbol);
    //         //console.log($(this).attr('data-xy'))
    //         tura($(this).attr('data-xy'))
    //     }
    // }

    function parser(x) {
        return x === "" ? 0 : (x === "X" ? 1 : -1)
    }

    function unParser(x) {
        return x === 0 ? "" : (x === 1 ? "X" : "O")
    }

    function sendMessage(param, winner, award = -1) {
        chatSocket.send(JSON.stringify({
            'gamer': gamer ? 1 : -1,
            'message': param,
            'winner': winner,
            'award': award
        }));
    }


    function checkAward($square = $('.square'), i) {
        //console.log("i", i)
        let awardX = 0
        let awardX1 = 0
        let awardY = 0
        let awardY1 = 0
        let awardXY = 0
        let awardXY2 = 0
        let awardYX = 0
        let awardYX2 = 0
        //for (let i = 0; i < boardSize * boardSize; i++) {
        //checking for winner in horizontal plane
        // if ($square.eq(i).text() !== ''){awardX=1;
        if ($square.eq(i).text() === $square.eq(i + 1).text()) {awardX = 2;
            if ($square.eq(i + 1).text() === $square.eq(i + 2).text()) { awardX = 3;
                if ($square.eq(i + 2).text() === $square.eq(i + 3).text()) {    awardX = 4;
                    if ($square.eq(i + 3).text() === $square.eq(i + 4).text()) {    awardX = 5;
                    }
                }
            }
        }

        // if ($square.eq(i).text() !== ''){awardX1=1;
        if ($square.eq(i).text() === $square.eq(i - 1).text()) {awardX1 = 2;
            if ($square.eq(i - 1).text() === $square.eq(i - 2).text()) {awardX1 = 3;
                if ($square.eq(i - 2).text() === $square.eq(i - 3).text()) {awardX1 = 4;
                    if ($square.eq(i - 3).text() === $square.eq(i - 4).text()) {awardX1 = 5;
                    }
                }
            }
        }

        //checking for winner in vertical plane
        // else if ($square.eq(i).text() !== '') {awardY=1;
        if ($square.eq(i).text() === $square.eq(i + boardSize).text()) {awardY = 2;
            if ($square.eq(i + boardSize).text() === $square.eq(i + boardSize * 2).text()) {awardY = 3;
                if ($square.eq(i + boardSize * 2).text() === $square.eq(i + boardSize * 3).text()) {awardY = 4;
                    if ($square.eq(i + boardSize * 3).text() === $square.eq(i + boardSize * 4).text()) {awardY = 5;
                    }
                }
            }
        }

        // else if ($square.eq(i).text() !== '') {awardY1=1;
        if ($square.eq(i).text() === $square.eq(i - boardSize).text()) {awardY1 = 2;
            if ($square.eq(i - boardSize).text() === $square.eq(i - boardSize * 2).text()) {awardY1 = 3;
                if ($square.eq(i - boardSize * 2).text() === $square.eq(i - boardSize * 3).text()) {awardY1 = 4;
                    if ($square.eq(i - boardSize * 3).text() === $square.eq(i - boardSize * 4).text()) {awardY1 = 5;
                    }
                }
            }
        }
        //checking for winner on a diagonal forward plane

        // else if ($square.eq(i).text() !== ''){awardXY=1;
        if ($square.eq(i).text() === $square.eq(i + boardSize + 1).text()) {awardXY = 2;
            if ($square.eq(i + boardSize + 1).text() === $square.eq(i + boardSize * 2 + 2).text()) {awardXY = 3;
                if ($square.eq(i + boardSize * 2 + 2).text() === $square.eq(i + boardSize * 3 + 3).text()) {awardXY = 4;
                    if ($square.eq(i + boardSize * 3 + 3).text() === $square.eq(i + boardSize * 4 + 4).text()) {awardXY = 5;
                    }
                }
            }
        }

        // else if ($square.eq(i).text() !== ''){awardXY2=1;
        if ($square.eq(i).text() === $square.eq(i + boardSize - 1).text()) {awardXY2 = 2;
            if ($square.eq(i + boardSize - 1).text() === $square.eq(i + boardSize * 2 - 2).text()) {awardXY2 = 3;
                if ($square.eq(i + boardSize * 2 - 2).text() === $square.eq(i + boardSize * 3 - 3).text()) {awardXY2 = 4;
                    if ($square.eq(i + boardSize * 3 - 3).text() === $square.eq(i + boardSize * 4 - 4).text()) {awardXY2 = 5;
                    }
                }
            }
        }

        //checking for winner in a minus diagonal option
        // else if ($square.eq(i).text() !== ''){awardYX=1;
        if ($square.eq(i).text() === $square.eq(i - boardSize - 1).text()) {awardYX = 2;
            if ($square.eq(i - boardSize - 1).text() === $square.eq(i - boardSize * 2 - 2).text()) {awardYX = 3;
                if ($square.eq(i - boardSize * 2 - 2).text() === $square.eq(i - boardSize * 3 - 3).text()) {awardYX = 4;
                    if ($square.eq(i - boardSize * 3 - 3).text() === $square.eq(i - boardSize * 4 - 4).text()) {awardYX = 5;}}}}

        // else if ($square.eq(i).text() !== ''){awardYX2=1;
        if ($square.eq(i).text() === $square.eq(i - boardSize + 1).text()) {awardYX2 = 2;
            if ($square.eq(i - boardSize + 1).text() === $square.eq(i - boardSize * 2 + 2).text()) {awardYX2 = 3;
                if ($square.eq(i - boardSize * 2 + 2).text() === $square.eq(i - boardSize * 3 + 3).text()) {awardYX2 = 4;
                    if ($square.eq(i - boardSize * 3 + 3).text() === $square.eq(i - boardSize * 4 + 4).text()) {awardYX2 = 5;}}}}

        //}
        console.log(awardX, awardX1, awardY, awardY1, awardXY, awardXY2, awardYX, awardYX2)

        return awardX+awardX1+awardY+awardY1+awardXY+awardXY2+awardYX+awardYX2
    }


    function checkForWinners(arr) {
        let $square = $('.square');
        // console.log($square.eq(1).text())
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
                winner = $square.eq(i).text()
                console.log('winner is ' + winner + ' horizontally');

                makeNewBoard();
            }
            //checking for winner in vertical plane
            else if ($square.eq(i).text() !== '' &&
                $square.eq(i).text() === $square.eq(i + boardSize).text() &&
                $square.eq(i + boardSize).text() === $square.eq(i + boardSize * 2).text() &&
                $square.eq(i + boardSize * 2).text() === $square.eq(i + boardSize * 3).text() &&
                $square.eq(i + boardSize * 3).text() === $square.eq(i + boardSize * 4).text()) {
                winner = $square.eq(i).text()
                console.log('winner is ' + winner + ' vertically');
                makeNewBoard();
            }
            //checking for winner on a diagonal forward plane
            else if ($square.eq(i).text() !== '' &&
                $square.eq(i).text() === $square.eq(i + boardSize + 1).text() &&
                $square.eq(i + boardSize + 1).text() === $square.eq(i + boardSize * 2 + 2).text() &&
                $square.eq(i + boardSize * 2 + 2).text() === $square.eq(i + boardSize * 3 + 3).text() &&
                $square.eq(i + boardSize * 3 + 3).text() === $square.eq(i + boardSize * 4 + 4).text()) {
                winner = $square.eq(i).text()
                console.log('winner is ' + winner +  ' diagonally');
                makeNewBoard();
            }
            //checking for winner in a minus diagonal option
            else if ($square.eq(i).text() !== '' &&
                $square.eq(i).text() === $square.eq(i + boardSize - 1).text() &&
                $square.eq(i + boardSize - 1).text() === $square.eq(i + boardSize * 2 - 2).text() &&
                $square.eq(i + boardSize * 2 - 2).text() === $square.eq(i + boardSize * 3 - 3).text() &&
                $square.eq(i + boardSize * 3 - 3).text() === $square.eq(i + boardSize * 4 - 4).text()) {
                winner = $square.eq(i).text()
                console.log('winner is ' + winner +  ' anti-diagonally');
                makeNewBoard();
            }
        }
        return winner
    }


    function tura(arr) {
        gameArray = []
        // console.log(gameArray,parser(winner)) checkAward($square,0)

        arr = arr.split(",")
        let $square = $('.square');
        const awards = checkAward($square,Number(arr[0])*boardSize+ Number(arr[1]))

        winner = checkForWinners(arr);

        //console.log("award", arr, "gamer", parser(gamer))

        sendMessage(gameArray, parser(winner), awards)
    }

    //git is counterintuiitive
}) 