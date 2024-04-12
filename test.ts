import React from 'react';

const MathComponent: React.FC = () => {

    function add(a: number, b: number): number {
        return a + b;
    }
    /**
     * @description This function computes the sine of a given number `a`.
     * 
     * @param { number } a - The `a` input parameter in the `sin()` function represents
     * the angle for which the sine value is being computed. It is a number that determines
     * the input value for the mathematical operation performed by the function.
     * 
     * @returns { number } The function `sin` returns the sine of a given number `a`. The
     * output is a number between 0 and 1, representing the value of the sine of `a`.
     */
    function sin(a: number): number {
        return Math.sin(a);
    }
    const results = [
        add(5, 3),
        sin(Math.PI / 2)
    ];
    return (
        <div>
            <h1>Math Results</h1>
            {/**
             * @description This component displays a list of results from an API call, rendering
             * each result as a numbered item in a bullet point list.
             */}
            <ul>
                {results.map((result, index) => (
                    <li key={index}>Result {index + 1}: {result}</li>
                ))}
            </ul>
        </div>
    );
}

export default MathComponent;
