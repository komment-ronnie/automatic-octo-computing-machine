/**
 * @description This function simply returns a greeting message with the user's name
 * included.
 * 
 * @param { string } sayHello - The `sayHello` input parameter passes a string
 * representing the person's name to the function for inclusion in the greeting message.
 * 
 * @returns { string } The output returned by this function is "Hello World! I'm <user_name>".
 */
const sayHello = (sayHello) => {
    return "Hello World! I'm " + name;
}

let user = "Ronnie";

document.body.innerHTML = sayHello(user);
