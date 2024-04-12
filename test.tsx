import React from 'react';

interface HelloWorldProps {
  name: string;
}

/**
 * @description returns a React component that displays a header and a paragraph with
 * a greeting and an introduction to the example code.
 * 
 * @param { string } .name - name of the component, which is used to display a
 * personalized greeting at the top of the component.
 * 
 * @returns { HTML element containing an H1 heading and a paragraph of text. } a HTML
 * div element with an h1 header and a paragraph of text.
 * 
 * 		- `h1`: A headline element containing the text "Hello,".
 * 		- `p`: A paragraph element containing the text "Welcome to my TypeScript JSX example.".
 */
const HelloWorld: React.FC<HelloWorldProps> = ({ name }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Welcome to my TypeScript JSX example.</p>
    </div>
  );
};

export default HelloWorld;
