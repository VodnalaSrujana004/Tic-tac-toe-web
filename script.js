// script.js

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const popup = document.getElementById('popup');
    const winnerText = document.getElementById('winner-text');
    const closePopup = document.getElementById('close-popup');
    const scoreX = document.getElementById('scoreX');
    const scoreO = document.getElementById('scoreO');
    let currentPlayer = 'X';
    let gameActive = true;
    let board = ['', '', '', '', '', '', '', '', ''];
    let score = { X: 0, O: 0 };

    // Winning combinations
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWin = () => {
        let roundWon = false;
        for (let i = 0; i < winningCombos.length; i++) {
            const [a, b, c] = winningCombos[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                break;
            }
        }
        return roundWon;
    };

    const checkDraw = () => {
        return board.every(cell => cell);
    };

    const handleCellClick = (e) => {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (board[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        board[clickedCellIndex] = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
        clickedCell.textContent = currentPlayer;

        if (checkWin()) {
            gameActive = false;
            winnerText.textContent = `Player ${currentPlayer} Wins!`;
            popup.classList.remove('hidden');
            score[currentPlayer]++;
            updateScoreboard();
        } else if (checkDraw()) {
            gameActive = false;
            winnerText.textContent = `It's a Draw!`;
            popup.classList.remove('hidden');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    };

    const updateScoreboard = () => {
        scoreX.textContent = score.X;
        scoreO.textContent = score.O;
    };

    const resetGame = () => {
        gameActive = true;
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
    closePopup.addEventListener('click', () => {
        popup.classList.add('hidden');
        resetGame();
    });
});
