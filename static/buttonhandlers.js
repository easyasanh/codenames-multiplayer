var socket = io();
var cards;
var redScore = 8;
var blueScore = 9;

socket.on('cards', function(cardColours) {
    cards = cardColours;
});

function handleCardClick(cardNumber) {
    if (cardNumber == 0) redScore--;
    if (cardNumber == 1) blueScore--;
    document.getElementById("redScore").textContent = redScore;
    document.getElementById("blueScore").textContent = blueScore;
}

function clickButton0() {
    console.log("clicked button 0")
    handleCardClick(0);
}

function clickButton1() {
    console.log("clicked button 1")
    handleCardClick(1);
}

function clickButton2() {
    console.log("clicked button 2")
    handleCardClick(2);
}

function clickButton3() {
    console.log("clicked button 3")
    handleCardClick(3);
}

function clickButton4() {
    console.log("clicked button 4")
    handleCardClick(4);
}

function clickButton5() {
    console.log("clicked button 5")
    handleCardClick(5);
}

function clickButton6() {
    console.log("clicked button 6")
    handleCardClick(6);
}

function clickButton7() {
    console.log("clicked button 7")
    handleCardClick(7);
}

function clickButton7() {
    console.log("clicked button 7")
    handleCardClick(7);
}

function clickButton8() {
    console.log("clicked button 8")
    handleCardClick(8);
}

function clickButton9() {
    console.log("clicked button 9")
    handleCardClick(9);
}

function clickButton10() {
    console.log("clicked button 10")
    handleCardClick(10);
}

function clickButton11() {
    console.log("clicked button 11")
    handleCardClick(11);
}

function clickButton12() {
    console.log("clicked button 12")
    handleCardClick(12);
}

function clickButton13() {
    console.log("clicked button 13")
    handleCardClick(13);
}

function clickButton14() {
    console.log("clicked button 14")
    handleCardClick(14);
}

function clickButton15() {
    console.log("clicked button 15")
    handleCardClick(15);
}

function clickButton16() {
    console.log("clicked button 16")
    handleCardClick(16);
}

function clickButton17() {
    console.log("clicked button 17")
    handleCardClick(17);
}

function clickButton18() {
    console.log("clicked button 18")
    handleCardClick(18);
}

function clickButton19() {
    console.log("clicked button 19")
    handleCardClick(19);
}

function clickButton20() {
    console.log("clicked button 20")
    handleCardClick(20);
}

function clickButton21() {
    console.log("clicked button 21")
    handleCardClick(21);
}

function clickButton22() {
    console.log("clicked button 22")
    handleCardClick(22);
}

function clickButton23() {
    console.log("clicked button 23")
    handleCardClick(23);
}

function clickButton24() {
    console.log("clicked button 24")
    handleCardClick(24);
}