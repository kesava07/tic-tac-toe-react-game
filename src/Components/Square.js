import React from 'react'

function Square(props) {
    const { handleClick, value } = props;
    return (
        <React.Fragment>
            <button
                className={`square-button ${value === 'X' ? 'text-primary' : 'text-danger'}`}
                type="button"
                onClick={handleClick}
            >
                {value}
            </button>
        </React.Fragment>
    )
};

export default Square;
