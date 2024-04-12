/**
 * @description computes the factorial of a given integer value `n`. It uses a recursive
 * approach to compute the result, starting from `n - 1` and multiplying it by `n`
 * at each step.
 * 
 * @param { integer } n - integer value for which the factorial is calculated in the
 * function.
 * 
 * @returns { integer } the value of the factorial of a given integer `n`.
 */
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

/**
 * @description verifies whether a given number is prime by iteratively testing whether
 * it has any integer factors other than itself and 1.
 * 
 * @param { integer } num - 1-based integer value that is tested for primality by
 * recursively examining it for divisors from 2 to the square root of its value without
 * finding any factors.
 * 
 * @returns { boolean } a boolean value indicating whether the input number is prime
 * or not.
 */
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

/**
 * @description This function converts a temperature in Celsius to its equivalent in
 * Fahrenheit.
 * 
 * @param { number } celsius - The `celsius` input parameter represents the temperature
 * in Celsius that needs to be converted to Fahrenheit.
 * 
 * @returns { number } The function returns the temperature in Fahrenheit equivalent
 * to a given Celsius temperature. The output is the temperature in Fahrenheit, which
 * is calculated as (celsius x 9 / 5) + 32.
 */
function celsiusToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

/**
 * @description This function finds the maximum value in an array by iterating over
 * the elements and comparing each one to the current maximum value, updating the
 * maximum as needed. It returns the final maximum value found.
 * 
 * @param { array } arr - The `arr` input parameter represents the array of values
 * that the function will operate on to find the maximum value.
 * 
 * @returns { number } The function `findMax` returns the maximum value in an array
 * `arr`. It iterates through the array, comparing each element to the current maximum
 * value. If a larger value is found, the maximum value is updated to that element.
 * The output is the final maximum value found in the array.
 */
function findMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

/**
 * @description This function reverses a given string by splitting it into individual
 * characters, then reversing the order of those characters, and finally joining them
 * back into a string.
 * 
 * @param { string } str - The `str` input parameter represents the string to be
 * reversed. It is used to split the string into individual characters, reverse the
 * order of those characters, and then join them back into a single string.
 * 
 * @returns { string } The function `reverseString` returns a reversed version of the
 * input string. The original characters are split into individual letters, then
 * reversed, and finally joined back into a single string. The result is the original
 * string spelled backwards.
 */
function reverseString(str) {
    return str.split('').reverse().join('');
}

/**
 * @description This function checks if a given string is a palindrome by comparing
 * it to its reverse. If the original string and its reverse are the same, the function
 * returns `true`, otherwise it returns `false`.
 * 
 * @param { string } str - The `str` input parameter represents the string to be
 * tested for palindromicity. It serves as the basis for determining if the string
 * is a palindrome by comparing it to its reverse using the `reverseString()` function
 * call.
 * 
 * @returns { boolean } The function `isPalindrome` returns `true` if the input string
 * is a palindrome (i.e., its mirror image), and `false` otherwise.
 */
function isPalindrome(str) {
    return str === reverseString(str);
}

/**
 * @description This function generates a random number between `min` and `max`,
 * inclusive of `min`. It returns the generated number as an integer.
 * 
 * @param { number } min - The `min` input parameter in the `getRandomNumber()`
 * function sets the minimum value that the random number can take. It acts as a floor
 * for the range of values returned by the function, ensuring that the random number
 * is never less than the specified minimum value.
 * 
 * @param { integer } max - The `max` input parameter in the `getRandomNumber()`
 * function sets the upper bound for the random number generated. It determines the
 * highest value that the function will return, and it must be greater than or equal
 * to the `min` parameter.
 * 
 * @returns { number } The function `getRandomNumber` returns a random number between
 * the provided min and max values, inclusive of the minimum value but exclusive of
 * the maximum value. In other words, it generates a number that can be any value
 * within the range [min, max].
 */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @description This function calculates the area of a circle, using the formula A =
 * πr^2 where A is the area and r is the radius.
 * 
 * @param { number } radius - The `radius` input parameter determines the area of a
 * circle calculated by the function.
 * 
 * @returns { number } The output of the `calculateCircleArea()` function is the area
 * of a circle, which is calculated as `Math.PI * radius ** 2`.
 */
function calculateCircleArea(radius) {
    return Math.PI * radius ** 2;
}

/**
 * @description This function counts the number of occurrences of each value in an
 * array using a reduce() method. It returns an object with the count of each value
 * as its property.
 * 
 * @param { array } arr - The `arr` input parameter represents the array whose
 * occurrences are to be counted. The function processes the array by applying a
 * reduction operation, accumulating the number of occurrences of each element in an
 * object. Without `arr`, the function would not have any input to operate on.
 * 
 * @returns { object } The function `countOccurrences` returns an object with the
 * values of each element in the input array as keys, and the number of occurrences
 * of that value in the input array as values. For example, if the input array is
 * `[1, 2, 3, 4, 5]`, the output object would be `{{1: 2, 2: 1, 3: 1, 4: 1, 5: 1}}`.
 */
function countOccurrences(arr) {
    return arr.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
    }, {});
}

/**
 * @description This function takes a string as input and returns a capitalized version
 * of it by breaking the words into individual letters, capitalizing the first letter
 * of each word, and then joining them back together with spaces.
 * 
 * @param { string } sentence - The `sentence` input parameter in this function takes
 * a string of text as input and returns a capitalized version of that text.
 * 
 * @returns { string } The output of this function is a capitalized version of the
 * input sentence. It splits the sentence into individual words, converts the first
 * letter of each word to uppercase, and then joins them back together with a space
 * between each word.
 */
function capitalizeWords(sentence) {
    return sentence.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
