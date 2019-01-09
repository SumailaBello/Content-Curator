//adding the proper event listeners for the text area
document.getElementById('userInput').addEventListener('keyup', wrdCount);
document.getElementById('userInput').addEventListener('change', wrdCount);

//foulwrds array contains disallowed words. You can add/remove words to be detected here or use the external foulWrd.js file but doing so will slightly reduce performance.
let foulWrds = ['hate', 'fuck', 'nigger', 'nigga', 'pussy', 'pussies', 'bitch', 'bitches', 'bastard', 'prick', 'cock', 'hoe', 'dick', 'asshole', 'ass', 'cunt', 'piss', 'shit', 'wank', 'wanker', 'bollocks', 'motherfucker'];


//you can put some possible alternatives to disallowed/foul words here
//let synonyms = ['dislike', 'copulate', 'hump', 'person', 'lady parts', 'lady', 'women', 'dude', 'privates', 'bum', 'unpleasant person', 'urine', 'poop']


//sorting foulWrds array alphabetically so the flagged words are displayed in that order
foulWrds.sort();

//this function takes care of displaying the number of words
function wrdCount() {
    //getting and splitting user input into an array anywhere space in detected in order to separate words, the split method returns an array
    let inputArr = document.getElementById('userInput').value.split(" ");

    let wrdCount = document.getElementById("wrdCount");
    if (inputArr == "") {
        wrdCount.innerHTML = "0";
    } else {
        wrdCount.innerHTML = inputArr.length;
    }

}

//adding event listener to the 'check' button to execute the loader function which will display the spinner and then execute the actual chkContent function after a 5 millisecond delay. You can remove this and start the chkContent directly as this is just for visuals. Performance will improve
document.getElementById('check').addEventListener('click', loader);

function loader() {
    document.getElementById('loader').classList.toggle("hidden");

    //Delays execution of chkContent function by 5 millisecond so the spinner can be displayed. Just for visual appeal
    setTimeout(chkContent, 5);
}

//storing the col that displays actual detected words in a constant
const dispFlagged = document.getElementById('dispFlagged');

//THIS FUNCTION DOES THE ACTUAL USER CONTENT/TEXT CHECKING
function chkContent() {
    dispFlagged.innerHTML = "";
    //getting and splitting user input into an array anywhere space is detected in order to separate words, the split method returns an array 
    let inputArr = document.getElementById('userInput').value.split(" ");

    foulWrds.forEach(words => {
        inputArr.forEach(uInput => {

            //checking if each user entered words contains foul words
            if (uInput.toLowerCase().includes(words)) {
                dispFlagged.innerHTML += uInput + '<br>';
            }

        });

    });

//it is impossible to style text in a textarea by default so a jquery plug-in had to be used to highlight the flagged words. Remove it to gain more performance
    $('#userInput').highlightWithinTextarea({
        highlight: foulWrds, // string, regexp, array, function, custom object
        className: 'red'
    });

    //    if removing spinner loader function remove this as well
    document.getElementById('loader').classList.toggle("hidden");

    //    displays/hides alert depending on the content of dispFlagged
    if (dispFlagged.innerHTML == "") {
        document.getElementById('alert').classList.remove("hidden");
    } else {
        document.getElementById('alert').classList.add("hidden");
    }

}


////storing the col that displays the synonyms in a constant. This feature is still under development. To test it, you can remove the comments from the function here and also the synonyms array at the top

//const dispSyn = document.getElementById('syn');
//function syn(){
//    synonyms.forEach(syn => {
//        
//        dispSyn.innerHTML += syn + '<br>';
//        
//    })
//}



// the below allows users to enable spell check in the text area. This is disabled by default
document.getElementById('splchk').addEventListener('click', splchk);
let wrds = document.getElementById('userInput');
wrds.spellcheck = false;

function splchk() {
    if (wrds.spellcheck == false) {
        wrds.spellcheck = true;
    } else {
        wrds.spellcheck = false
    }
}

//this resets/reloads the page
document.getElementById('reset').addEventListener('click', reset);

function reset() {
    document.location.reload(true);
}

//this removes highlight
document.getElementById('remHigh').addEventListener('click', remHigh);

function remHigh() {
    $('#userInput').highlightWithinTextarea('destroy');
}

document.getElementById('clsAlrt').addEventListener('click', clsAlrt);

function clsAlrt() {
    document.getElementById('alert').classList.toggle("hidden");
}