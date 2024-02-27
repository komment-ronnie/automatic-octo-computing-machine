import React from 'react';

interface HelloWorldProps {
  name: string;
}

/**
 * @description This function creates a React component that displays a greeting and
 * a paragraph of text when the component is rendered.
 * 
 * @param { string } .name - The `.name` input parameter represents the name of the
 * person being greeted in the function. It is used to personalize the greeting message.
 * 
 * @returns { Component } The function returns a JSX element with an `<h1>` tag
 * displaying the name of the user, and a `<p>` tag stating "Welcome to my TypeScript
 * JSX example."
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
