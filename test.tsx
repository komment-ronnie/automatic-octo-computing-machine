import React from 'react';

interface HelloWorldProps {
  name: string;
}


/**
 * @description returns a react element containing an h1 heading and a paragraph of
 * text welcoming the user to an example of TypeScript and JSX code.
 * 
 * @param { string } .name - name of the component, which is used to display a
 * personalized greeting in the HTML output.
 * 
 * @returns { `HTMLDivElement`. } a HTML element containing an `<h1>` tag with the
 * value "Hello, {name}!" and a `<p>` tag with the value "Welcome to my TypeScript
 * JSX example."
 * 
 * 	1/ `h1`: The `<h1>` tag contains the text "Hello, {name}!".
 * 	2/ `p`: The `<p>` tag contains the text "Welcome to my TypeScript JSX example.".
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
