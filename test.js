import { arr } from "./var/arr.js";
import { getProto } from "./var/getProto.js";
import { slice } from "./var/slice.js";
import { flat } from "./var/flat.js";
import { push } from "./var/push.js";
import { indexOf } from "./var/indexOf.js";
import { class2type } from "./var/class2type.js";
import { toString } from "./var/toString.js";
import { hasOwn } from "./var/hasOwn.js";
import { fnToString } from "./var/fnToString.js";
import { ObjectFunctionString } from "./var/ObjectFunctionString.js";
import { support } from "./var/support.js";
import { isArrayLike } from "./core/isArrayLike.js";
import { DOMEval } from "./core/DOMEval.js";

var version = "@VERSION",
	rhtmlSuffix = /HTML$/i,
	/**
	 * @description This function creates a new instance of the jQuery object using the
	 * specified selector and context. It returns the newly initialized jQuery object.
	 * 
	 * @param { string } selector - The `selector` input parameter in the `function(
	 * selector, context )` defines the element or elements to be selected and manipulated
	 * by the jQuery object. It is the input that determines the specific elements the
	 * function will act upon.
	 * 
	 * @param { object } context - In this function, `context` provides additional
	 * information to the initialization process of the selected elements. It allows for
	 * the modification of various options and behaviors, such as the document or window
	 * context, which can affect how the jQuery object is manipulated and interacted with.
	 * 
	 * @returns { object } The function returns a new instance of jQuery's `fn.init`
	 * method, which takes the selector and context as input and creates a new jQuery
	 * object based on those inputs. In other words, it " initializes" a new jQuery object
	 * using the given selector and context.
	 */
	jQuery = function( selector, context ) {
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {
	jquery: version,
	constructor: jQuery,
	length: 0,
	/**
	 * @description This function takes the `this` object and returns a new array created
	 * by calling the `slice()` method on it, which recursively extracts a subset of
	 * elements from the original array.
	 * 
	 * @returns { array } The function `slice.call(this)` returns an array of objects
	 * containing the same properties and methods as the original object. In other words,
	 * it creates a shallow copy of the object.
	 */
	toArray: function() {
		return slice.call( this );
	},
	/**
	 * @description This function takes a number `num` and returns an array of elements
	 * from an object or set, depending on the value of `num`. If `num` is null, it returns
	 * all the elements in a clean array. If `num` is a negative integer, it returns just
	 * the one element at the specified position. Otherwise, it returns all the elements
	 * from the set.
	 * 
	 * @param { number } num - The `num` input parameter determines whether the function
	 * returns an entire array or a single element from a set. If `num` is null, the
	 * function returns all elements in an array using `slice.call()`. If `num` is a
	 * negative number, the function returns the specified element from the set. Otherwise,
	 * it returns the entire set.
	 * 
	 * @returns { array } The output of this function depends on the input `num`. If `num`
	 * is `null`, the function returns a clean array containing all elements in the set.
	 * If `num` is a negative integer, the function returns the element at the specified
	 * index plus the length of the set, wrapping around to the beginning of the set if
	 * necessary. Otherwise, the function returns the single element at the specified index.
	 */
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},
	/**
	 * @description This function takes an array of elements and merges them with the
	 * existing objects of a constructor, returning a new object that combines both. It
	 * also retains the previous object as the "prevObject" property.
	 * 
	 * @param { object } elems - The `elems` input parameter merges an array of elements
	 * with the current object, creating a new object that combines the properties and
	 * methods of both.
	 * 
	 * @returns { object } The function merges the elements in `elems` with the existing
	 * elements in the current object, creating a new object that combines both sets of
	 * elements. The resulting object returns the merged elements and keeps track of the
	 * original object as its "prevObject". In summary, the output is a new object
	 * containing a mix of elements from both the current object and `elems`.
	 */
	pushStack: function( elems ) {
		var ret = jQuery.merge( this.constructor(), elems );
		ret.prevObject = this;
		return ret;
	},
	/**
	 * @description This function is a jQuery method for executing a callback function
	 * on each element in an array or object passed to it. It returns the result of the
	 * callback function for each element.
	 * 
	 * @param {  } callback - The `callback` input parameter in the provided code is a
	 * function that is passed to the `jQuery.each()` method as an argument. The `callback`
	 * function is then executed for each element in the `this` object, which is the
	 * collection of elements being iterated over by the `jQuery.each()` method.
	 * 
	 * @returns { object } The `function` returns a wrapped version of the `jQuery.each`
	 * method, which iterates over an array or object and calls a provided callback
	 * function for each item. The callback function is passed two arguments: the current
	 * item and the index of the item in the array.
	 */
	each: function( callback ) {
		return jQuery.each( this, callback );
	},
	/**
	 * @description This function takes a callback function as an argument and applies
	 * it to each element in the collection, pushing the results back onto the stack.
	 * 
	 * @param {  } callback - The `callback` input parameter is a function that takes two
	 * arguments: `i` and `elem`. It is called for each element in the jQuery collection
	 * being processed, and it returns a value that is then pushed onto the stack using
	 * the `return` statement. The `callback` function can be used to perform any action
	 * on each element, such as modifying its properties or adding additional content.
	 * 
	 * @returns { object } The function returns a new array containing the results of
	 * applying the `callback` function to each element in the original array, using the
	 * `pushStack` method to accumulate the results in a new stack. The output is an array
	 * of elements, where each element is the result of applying the `callback` function
	 * to the corresponding element in the original array.
	 */
	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},
	/**
	 * @description This function takes an array of arguments and pushes them onto the
	 * stack of a given object using the `slice()` method and the `pushStack()` method.
	 * 
	 * @returns { object } The output of this function is a new array that contains the
	 * same elements as the original array passed to `slice()`, along with any additional
	 * elements pushed onto the stack using `pushStack()`.
	 */
	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},
	/**
	 * @description This function returns the first element of an array-like object `this`.
	 * 
	 * @returns { object } The function returns the first element of an array-like object
	 * `this`. In other words, it returns the value of `this[0]`.
	 */
	first: function() {
		return this.eq( 0 );
	},
	/**
	 * @description This function returns the negative of the value of the `this` object
	 * at the specified index (-1).
	 * 
	 * @returns { number } The output of this function is `undefined`. The return statement
	 * inside the function reference the property `eq` on the `this` object, which is not
	 * defined. Therefore, the function returns the value of `undefined`.
	 */
	last: function() {
		return this.eq( -1 );
	},
	/**
	 * @description This function takes an array of elements from the `this` context and
	 * returns a new array with only every other element. It uses the `pushStack()` method
	 * to add the filtered elements to the stack, and then returns the result.
	 * 
	 * @returns { array } The output of this function is an array of odd-indexed elements
	 * from the input array, with the indices incremented by 1.
	 */
	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},
	/**
	 * @description This function creates a new array by filtering the elements of the
	 * current array based on a condition. It takes the current array as input, applies
	 * a callback function to each element, and then pushes the filtered elements onto a
	 * new stack. The callback function returns true for even-indexed elements and false
	 * for odd-indexed elements, which is why only half of the original array is pushed
	 * onto the new stack.
	 * 
	 * @returns { array } The output of this function is an array of odd elements from
	 * the original array.
	 */
	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},
	/**
	 * @description This function adds an element to the end of an array-like object's
	 * stack, handling edge cases for negative indices and empty arrays. It returns a new
	 * array with the added element.
	 * 
	 * @param { number } i - The `i` input parameter represents the index of the element
	 * to be pushed onto the stack. It determines the position of the new element in the
	 * stack, with values less than zero indicating negative indices and values greater
	 * than or equal to the length of the stack indicating positive indices.
	 * 
	 * @returns { array } The function returns a new array containing the element at
	 * position `j` of the original array, based on its index `i`. If `i` is positive and
	 * less than the length of the array, the function returns the element at that position.
	 * If `i` is negative or greater than the length of the array, the function returns
	 * an empty array.
	 */
	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},
	/**
	 * @description This function returns the previous object or instances of the constructor
	 * function if none exists.
	 * 
	 * @returns { object } The function returns the `this.prevObject` or the `this.constructor()`
	 * if it's not available. In other words, it returns the previous object reference
	 * or falls back to the constructor function if none is provided.
	 */
	end: function() {
		return this.prevObject || this.constructor();
	}
};

/**
 * @description This function is a deep-level merging and cloning mechanism for
 * objects, arrays or plain JSON data. It takes an object as its first argument
 * (target), and recursively iterates over the remaining arguments (options) to merge
 * or clone them into the target object. The function checks for possible conflicts
 * by comparing the source values with the existing values in the target object, and
 * then decides whether to move the source value directly or to create a clone of it
 * before merging.
 * 
 * @returns { object } The function returns a modified version of the input object,
 * where deep copies of objects are made if the `deep` parameter is set to true. The
 * function iterates through the input arguments and makes copies of objects or assigns
 * values to existing properties in the target object. If no value is provided for a
 * property, it will leave the property unchanged.
 */
jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[ i ] || {};
		i++;
	}

	if ( typeof target !== "object" && typeof target !== "function" ) {
		target = {};
	}

	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		if ( ( options = arguments[ i ] ) != null ) {
			for ( name in options ) {
				copy = options[ name ];
				if ( name === "__proto__" || target === copy ) {
					continue;
				}


				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	/**
	 * @description The function throws an error with the specified message.
	 * 
	 * @param { string } msg - THE FUNCTION THROWS AN ERROR MESSAGE WHICH IS SPECIFIED
	 * AS THE INPUT PARAMETER MSG
	 */
	error: function( msg ) {
		throw new Error( msg );
	},

	/**
	 * @description The given function does not specify any behavior or implementation.
	 * Please provide the actual code and details about the expected input/output pairs
	 * for accurate documentation.
	 */
	noop: function() {},

	/**
	 * @description This function checks if a given object is plain (not an instance of
	 * a constructor function) and returns true or false based on the object's properties.
	 * 
	 * @param { object } obj - The input parameter obj is tested for type and prototype
	 * to determine whether it is an object created by a global object constructor.
	 * 
	 * @returns { boolean } Output: a boolean value indicating whether an object is plain
	 * or not based on whether it has a constructor property and strings "Object Function"
	 * when toString-called.
	 */
	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	/**
	 * @description The function checks if an object is empty. It iterates through all
	 * the properties of the object using a "for...in" loop and returns "false" if any
	 * property exists. If no property exists. it returns "true".
	 * 
	 * @param { object } obj - The function accepts an object as input through the parameter
	 * 'obj'.
	 * 
	 * @returns { boolean } Function takes an object as input and returns boolean value.
	 * It loops through each key-value pair of the object and returns "false" for all of
	 * them.
	 * The final output is a collection of false values.
	 */
	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	/**
	 * @description The function DOM Evaluate. It evaluates the DOME and produces
	 * high-quality documentation for the given code.
	 * 
	 * @param { string } code - CODE IS EVALUATED.
	 * 
	 * @param { object } options - The `options` input parameter provides a nonce for DOMEval().
	 * 
	 * @param {  } doc - The `doc` input parameter provides documentation metadata to the
	 * DOMEval function within this anonymous function given here.
	 */
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	/**
	 * @description processes an array-like object or a non-array object with a callback
	 * function applied to each element
	 * 
	 * @param { object } obj - Here is your answer:
	 * 
	 * The obj input parameter supplies an array or object to search through calling
	 * callback on its elements.
	 * 
	 * @param { any } callback - Certainly. Here is my concise response to your question:
	 * 
	 * The `callback` function executes on every element of `obj`, and can decide at any
	 * moment to end loop execution by returning false.
	 * 
	 * @returns { object } The output returned by this function is the input object.
	 */
	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},


	// Retrieve the text value of an array of DOM nodes
	/**
	 * @description Here is the concise answer to your question:
	 * 
	 * This function extracts text from a DOM node or array of nodes. Depending on the
	 * type of node passed as an argument and processed from top down through deepest
	 * first level.
	 * 
	 * @param { array } elem - Okay. Here you go:
	 * 
	 * The `elem` input parameter provides access to a jQuery element that contains text
	 * content that needs to be extracted and returns a string with just the content.
	 * 
	 * @returns { string } The function returns a string concatenation of all child text
	 * node values of an HTML element or array of elements if no elements are provided
	 * as an argument to the function.
	 */
	text: function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {

			// If no nodeType, this is expected to be an array
			while ( ( node = elem[ i++ ] ) ) {

				// Do not traverse comment nodes
				ret += jQuery.text( node );
			}
		}
		if ( nodeType === 1 || nodeType === 11 ) {
			return elem.textContent;
		}
		if ( nodeType === 9 ) {
			return elem.documentElement.textContent;
		}
		if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}

		// Do not include comment or processing instruction nodes

		return ret;
	},


	// results is for internal usage only
	/**
	 * @description Accepts an array or array-like object and appends its elements to a
	 * new array if it is not null and is an array or string.
	 * 
	 * @param { object } arr - Arr provides an array-like object to be added or concatenated
	 * with another array "ret".
	 * 
	 * @param { array } results - Results is an optional input parameter and is initialized
	 * to an empty array if not provided. It will be concatenated with any arrays or
	 * string value returned from function call
	 * 
	 * @returns { array } The output returned by this function is an array of values that
	 * have been pushed onto it or merged into it from multiple sources. If a non-array
	 * like object is passed to the function as 'arr', then its contents are first converted
	 * into an array and added to ret. If an array-like object (string) is passed then
	 * the value inside is added to the output array without any changes. Finally returns
	 * 'ret'
	 */
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
						[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	/**
	 * @description Finds the index of the first occurrence of an array element or -1 if
	 * no such element is found.
	 * 
	 * @param {  } elem - Here's your response.
	 * 
	 * Element to search for within an array.
	 * 
	 * @param { array } arr - arr provides the elements to search for the input `elem`.
	 * 
	 * @param { integer } i - Searches the array for a given element from the specified
	 * position.
	 * 
	 * @returns { number } The function returns -1 if the specified element is not found
	 * within the array or returns its position index (zero-based indexing) if it is present.
	 */
	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	/**
	 * @description Verbs:
	 * returns
	 * assumes
	 * tests
	 * 
	 * @param { object } elem - Provides an HTML element to be checked for HTML context.
	 * 
	 * @returns { boolean } The function returns a boolean value indicating whether the
	 * provided element object is not an HTML element or does not have a namespace.
	 */
	isXMLDoc: function( elem ) {
		var namespace = elem && elem.namespaceURI,
			docElem = elem && ( elem.ownerDocument || elem ).documentElement;

		// Assume HTML when documentElement doesn't yet exist, such as inside
		// document fragments.
		return !rhtmlSuffix.test( namespace || docElem && docElem.nodeName || "HTML" );
	},

	// Note: an element does not contain itself
	/**
	 * @description The function compares two nodes `a` and `b`, determining whether `a`
	 * contains or is equal to the parent node of `b`.
	 * 
	 * @param {  } a - OF COURSE.
	 * The input parameter a is compared to the node's parent element of the object
	 * parameter b.
	 * 
	 * @param {  } b - The function's b parameter receives the Node object to check if
	 * it is contained within or equal to a.
	 * 
	 * @returns { boolean } Here's a crisp and concise answer based on your request:
	 * 
	 * Return value - The given function will return either 'a' is the parentNode of 'b',
	 * or both nodes are siblings (based on contains or compareDocumentPosition).
	 */
	contains: function( a, b ) {
		var bup = b && b.parentNode;

		return a === bup || !!( bup && bup.nodeType === 1 && (

			// Support: IE 9 - 11+
			// IE doesn't have `contains` on SVG.
			a.contains ?
				a.contains( bup ) :
				a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
		) );
	},

	/**
	 * @description Copies elements of an array to another.
	 * 
	 * @param { array } first - The first input parameter is assigned to an array and
	 * then has its length updated.
	 * 
	 * @param { array } second - second is being assigned to the "i" index of the "first"
	 * array during runtime
	 * 
	 * @returns { array } The function takes two arrays as input and combines them into
	 * the first array. The function returns the modified first array.
	 */
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	/**
	 * @description The function takes three arguments: an array of elements ("elems"),
	 * a callback function to apply to each element ("callback"), and a boolean invert
	 * parameter. It then iterates over the array using the provided callback function.
	 * It pushes any element for which the callback function returns a falsey value (i.e.,
	 * if it doesn't pass the test) onto an array of matched elements that is returned
	 * at the end.
	 * 
	 * @param { array } elems - The function takes an array of elements as input through
	 * the `elems` parameter and processes each element.
	 * 
	 * @param {  } callback - The `callback` input parameter takes a functional argument
	 * that gets evaluated for each array element. It determines if the element passes
	 * the test and is added to the resulting array.
	 * 
	 * @param { boolean } invert - The `invert` parameter causes the callback function
	 * to operate with an inverse expectation.
	 * 
	 * @returns { array } The function returns an array of elements that pass the validation
	 * check. The array is created by iterating through the input elements and only adding
	 * those that do not satisfy the callback function's condition.
	 */
	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	/**
	 * @description This function applies a callback to each element of an array or object
	 * and collects the return values into an array.
	 * 
	 * @param { object } elems - The `elems` parameter is an array-like object passed
	 * into the `function`.
	 * 
	 * @param {  } callback - In this function given here's what the `callaback` paramter
	 * does -
	 * 
	 * The callback receives each of these array items as its two arguments and returns
	 * a new value (of the item). This value (returned by the callback) is appended to
	 * an overall resulting array called `ret`, if it's not null.
	 * 
	 * @param { any } arg - Here is the function's documentation with your requests:
	 * 
	 * The function's arg input parameter provides a value to pass as a second argument
	 * for each callback execution.
	 * 
	 * @returns { array } The output is an array of values that result from applying the
	 * provided callback function to each element of the input array or object.
	 */
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
/**
 * @description This function adds a new property to the `class2type` object, mapping
 * strings to their lowercase versions.
 * 
 * @param { string } _i - `_i` is an implicit parameter in JavaScript functions that
 * represents the current execution context. It provides access to information about
 * the currently executing code, such as the current scope, closures, and other
 * contextual information. In this case, `_i` is not used directly but rather serves
 * as a placeholder for the `name` parameter.
 * 
 * @param { string } name - The `name` input parameter is used to assign a type to
 * an object based on its string representation. The type is stored in the `class2type`
 * cache, which is used by JavaScript to determine the type of an object at runtime.
 */
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( _i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

export { jQuery, jQuery as $ };
