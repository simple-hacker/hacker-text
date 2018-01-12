// HACKER TEXT
// Author: Michael Perks
// Website: http://www.simplehacker.co.uk

// Free for Commerical and Non Commercial Use.

// A javascript plugin that animates text to make it look like it's decoding.
// Simply add the class .hacker-text to any element with textContent
// For more information visit docs at http://www.simplehacker.co.uk/hacker-text
// Or visit the Github Repository


const eChars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"," ",",",".","-","'"];


const qSA  = document.querySelectorAll('.hacker-text'); //qSA is QuerySelectorAll
let hackerTexts = [];
let decodeInterval;
let pageDecoded;

qSA.forEach(function(el, index){ //el is the element

    const originalText = el.textContent.toUpperCase(); 
    let hackerText; //This is the endcoded text.
    hackerText = encodeText(originalText); // Encode the text

    // Create Object to keep track of the originalTexts and encoded hackerTexts
    const hackerTextObj = {
        element : el,
        originalText : originalText, //This is the original text value.
        hackerText : hackerText,
        decoded : false //To keep track if it has been decoded.
    }

    hackerTexts.push(hackerTextObj);
});


// Loop through array of objects and decode.
hackerTexts.forEach(function(obj, index) { // obj is the object in the array of objects

    // Change textContent to the encoded Hacker Text.
    obj['element'].textContent = obj['hackerText'];

    // This runs the decoding.
    decodeInterval = setInterval(decode, 5, obj);

});


function decode(obj) {

    pageDecoded = allDecoded();

    if (pageDecoded === true) {
        clearInterval(decodeInterval); // Stop the interval loop
    } else {
        if (obj['decoded'] == false) {
            // Decode...
            let randChar;
            let randCharNum;

            do {
                randPos = Math.floor((Math.random() * obj['hackerText'].length));
            } while (obj['hackerText'][randPos] == obj['originalText'][randPos])

            randCharNum = Math.floor((Math.random() * (eChars.length)));
            randChar = eChars[randCharNum];

            obj['hackerText'] = decodeCharacter(obj['hackerText'], randPos, randChar);
            obj['element'].textContent = obj['hackerText'];

            // Has finished decoding so set value to true.
            if (obj['hackerText'] === obj['originalText']) {
                obj['decoded'] = true;
            }
        }
    }
}


function allDecoded() {

    hackerTexts.forEach(function(obj, index) {
        if (obj['decoded'] === false) {
            return false;
        }
    });

    return false;
}


// const decodeInterval = setInterval(decode, 20);


// const el = document.querySelector('.hacker-text');
// const originalText = el.textContent.toUpperCase(); //This is the original text value.
// let hackerText; //This is the endcoded text.

// console.log(originalText);
// hackerText = encodeText(originalText);
// console.log(hackerText);
// // Change textContent to the encoded Hacker Text.
// el.textContent = hackerText;

// const decodeInterval = setInterval(decode, 20);

// function decode(obj) {
//     let randChar;
//     let randCharNum;

//     if (obj['hackerText'] == obj['originalText']) {
//         clearInterval(decodeInterval);
//     } else {
//         console.log ("Hello");
//         do {
//             randPos = Math.floor((Math.random() * obj['hackerText'].length));
//         } while (obj['hackerText'][randPos] == obj['hackerText'][randPos])

//         randCharNum = Math.floor((Math.random() * (eChars.length)));
//         randChar = eChars[randCharNum];

//         obj['hackerText'] = decodeCharacter(obj['hackerText'], randPos, randChar);
//         el.textContent = obj['hackerText'];
//     }
// }


function decodeCharacter(str, n, t) {
    return str.substring(0, n) + t + str.substring(n + 1);
}

function encodeText(str) {
    let encodedText = '';
    const strLength = str.length;
    let randCharNum;

    for (i = 0; i < strLength; i++) {
        // Get a random number between 0 and eChars array length
        randCharNum = Math.floor((Math.random() * (eChars.length)));
        // Add the character at index randCharNum.
        encodedText += eChars[randCharNum];
    }

    return encodedText;
}