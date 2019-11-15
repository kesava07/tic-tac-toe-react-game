import React, { Component } from 'react'
import Square from './Square'

export default class Board extends Component {

    displaySquare = (value) => (
        <Square
            value={this.props.squares[value]}
            handleClick={() => this.props.handleClick(value)}
        />
    )
    render() {
        return (
            <React.Fragment>
                <div className="board-row">
                    {this.displaySquare(0)}
                    {this.displaySquare(1)}
                    {this.displaySquare(2)}
                </div>
                <div className="board-row">
                    {this.displaySquare(3)}
                    {this.displaySquare(4)}
                    {this.displaySquare(5)}
                </div>
                <div className="board-row">
                    {this.displaySquare(6)}
                    {this.displaySquare(7)}
                    {this.displaySquare(8)}
                </div>
            </React.Fragment>
        )
    }
}
