// HACKER TEXT
// Author: Michael Perks
// Website: http://www.simplehacker.co.uk

// Free for Commerical and Non Commercial Use.

// A javascript plugin that animates text to make it look like it's decoding.
// Simply add the class .hacker-text to any element with innerHTML
// For more information visit docs at http://www.simplehacker.co.uk/hacker-text
// Or visit the Github Repository https://github.com/simple-hacker/hacker-text


const eChars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"," ",",",".","-","'"];
allowedTags = ["div", "span", "h1", "h2", "h3", "h4", "h5", "p", "br", "a", "strong", "em", "li", "b", "i", "u", "pre", "q", "s", "strike", "blockquote", "sub", "sup"];


const qSA  = document.querySelectorAll('.hacker-text'); //qSA is QuerySelectorAll
let hackerTexts = [];
let decodeInterval = [];
let pageDecoded;

qSA.forEach(function(el, index){ //el is the element


    if (allowedTags.indexOf(el.tagName.toLowerCase()) != -1) {

        const originalText = el.innerHTML.toUpperCase(); 
        let hackerText = ''; //This is the endcoded text.
        let speed; // The decoding speed, determined by classList hacker-text-slow, hacker-text-medium, hacker-text-fast.
        let mode = 'default';
        

        if (el.classList.contains('hacker-text-slow')) {
            speed = 20;
        } else if (el.classList.contains('hacker-text-medium')) {
            speed = 10;
        } else if (el.classList.contains('hacker-text-fast')) {
            speed = 5;
        } else {
            speed = 10; //Default speed is 10;
        }

        if (el.classList.contains('hacker-text-type')) {
            mode = 'type';
        } else if (el.classList.contains('hacker-text-stars')) {
            mode = 'stars';
            for (i = 0; i < originalText.length; i++) {
                hackerText += "*"; //Add *'s for originalText length
            }
        } else {
            hackerText = encodeText(originalText); // Encode the text
        }

        // Create Object to keep track of the originalTexts and encoded hackerTexts
        const hackerTextObj = {
            element : el,
            originalText : originalText, //This is the original text value.
            hackerText : hackerText,
            decoded : false, //To keep track if it has been decoded.
            speed : speed,
            mode : mode
        }

        hackerTexts.push(hackerTextObj);

    }

});


// Loop through array of objects and decode.
hackerTexts.forEach(function(obj, index) { // obj is the object in the array of objects

    // Change innerHTML to the encoded Hacker Text.
    obj['element'].innerHTML = obj['hackerText'];

    // This runs the decoding.
    decodeInterval.push(setInterval(runDecoding, obj['speed'], obj));

});


function runDecoding(obj) {

    pageDecoded = allDecoded();

    if (pageDecoded === true) {
        // Clear all the decodeIntervals
        // Note:  This can be further optimised by clearInterval when each hackerTextObj is completed.
        decodeInterval.forEach(function (dI) {
            clearInterval(dI);
        });
        console.log("All Hacker-Texts have been decoded.")
    } else {
        if (obj['decoded'] == false) {

            if (obj['mode'] === 'type') {
                decodeType(obj);
            } else if (obj['mode'] === 'stars') {
                decodeStars(obj);
            } else {
                decode(obj);
            }
        }
    }
}

// Default decoding style.
// ================================================================

function decode(obj) {
    // Decode...
    let randChar;
    let randCharNum;

    // Chose a random position in string to decode, do while that character is not correct.
    do {
        randPos = Math.floor((Math.random() * obj['hackerText'].length));
    } while (obj['hackerText'][randPos] == obj['originalText'][randPos])

    // Get random Character
    randChar = getRandChar()

    obj['hackerText'] = decodeCharacter(obj['hackerText'], randPos, randChar);
    obj['element'].innerHTML = obj['hackerText'];

    // If hackerText and OriginalText are the same then finished decoding so set value to true.
    if (obj['hackerText'] === obj['originalText']) {
        obj['decoded'] = true;
        console.log(`${obj['originalText']} has finished decoding.`);
    }
}


// Decode as it types.
// ================================================================

function decodeType(obj) {

    const typingChar = "|";
    let sliceNum = typingChar.length + 1;

    // Get random Character
    randChar = getRandChar();

    // Get the current str length for hackerText, this is to check indexes of originalText to compare.
    strLength = obj['hackerText'].length - sliceNum;

    // Firstly remove the previous character + the | char.
    // If randChar is equal to the character at current hackerText length pos of originalText then append the correct randChar to hackerText and another randChar
    // so that the second gets spliced the next time round.
    // Else just add one randChar
    // This gives the illusion of decoding and the string only increases if randChar is equal to the current index of originalText.
    obj['hackerText'] = obj['hackerText'].slice(0, (sliceNum * -1));

    if (randChar === obj['originalText'][strLength]) {
        obj['hackerText'] += randChar;

        // Only add the extra character if it hasn't fully decoded yet.
        if (obj['hackerText'] != obj['originalText']) {
            obj['hackerText'] += randChar;
        }

    } else {
        obj['hackerText'] += randChar;
    }

        // If hackerText and OriginalText are the same then finished decoding so set value to true.
    if (obj['hackerText'] === obj['originalText']) {
        obj['decoded'] = true;
        console.log(`${obj['originalText']} has finished decoding.`);
    } else {
        obj['hackerText'] += typingChar;
    }

    // Display current hackerText in element.
    obj['element'].innerHTML = obj['hackerText'];
}



// Decode with stars
// ================================================================

function decodeStars(obj) {
    
    // Get randChar
    randChar = getRandChar();

    // Loop through length of original text.
    for (i = 0; i < obj['originalText'].length; i++) {

        // If character at i on both hackerText and originalText not the same then
        // replace */randChar with another randChar and break out of loop.
        if (obj['hackerText'][i] != obj['originalText'][i]) {
            obj['hackerText'] = decodeCharacter(obj['hackerText'], i, randChar);
            obj['element'].innerHTML = obj['hackerText'];
            break;
        }
    }

    // If hackerText and OriginalText are the same then finished decoding so set value to true.
    if (obj['hackerText'] === obj['originalText']) {
        obj['decoded'] = true;
        console.log(`${obj['originalText']} has finished decoding.`);
    }
    
}


// Check to see if all texts have been decoded.
function allDecoded() {

    let allDecoded = true; // Assume all are decoded and set to false if any of them are false.

    hackerTexts.forEach(function(obj, index) {
        if (obj['decoded'] === false) {
            allDecoded = false;
        }
    });

    return allDecoded;
}


function decodeCharacter(str, n, t) {
    return str.substring(0, n) + t + str.substring(n + 1);
}

function getRandChar() {
    // Get random Character
    randCharNum = Math.floor((Math.random() * (eChars.length)));
    return eChars[randCharNum];
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