import React, { Component } from 'react';
import Board from './Components/Board';
import './App.css';

export default class App extends Component {

    state = {
        history: [{ squares: Array(9).fill(null) }],
        stepNumber: 0,
        xIsNext: true
    }

    handleClick = (value) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[value]) {
            return;
        }
        squares[value] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat({
                squares: squares
            }),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })
    }

    calculateWinner = (sqaures) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (sqaures[a] && sqaures[a] === sqaures[b] && sqaures[a] === sqaures[c])
                return sqaures[a];
        }
        return null;
    }

    moves = (history) => history && history.map((step, move) => {
        const info = move ? `Go to step ${move}` : "Go to game start";
        return (
            <li key={move} className="list-group-item">
                <button className="btn btn-sm btn-success" onClick={() => this.jumpTo(move)}>{info}</button>
            </li>
        )
    });

    jumpTo = move => {
        this.setState({
            stepNumber: move,
            xIsNext: (move % 2) === 0
        })
    }

    startNewgame = () => {
        this.setState({
            history: [{ squares: Array(9).fill(null) }],
            stepNumber: 0,
            xIsNext: true
        })
    }
    render() {
        const current = this.state.history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);
        let status;
        if (winner) {
            status = `${winner} won the match`;
        } else {
            status = `Next player ${this.state.xIsNext ? 'X' : 'O'}`
        }
        return (
            <div className="container mt-5">
                <h1 className="display-3 text-center mb-4">Tic Tac Toe</h1>
                <div className='row'>
                    <div className="col-lg-6">
                        <Board squares={current.squares} handleClick={this.handleClick} />
                    </div>
                    <div className="game-info col-lg-6 card card-body shadow">
                        {winner !== null && (
                            <button onClick={this.startNewgame}>Start new game</button>
                        )}
                        {
                            (this.state.stepNumber === 9) && (winner == null) ? (
                                <p>Match was draw &nbsp;
                            <button onClick={this.startNewgame}>Start new game</button>
                                </p>
                            ) :
                                null
                        }
                        <h4 className="text-secondary text-center mb-3">{status}</h4>
                        <ul className="list-group">{this.moves(this.state.history)}</ul>
                    </div>
                </div>


            </div>
        )
    }
}
