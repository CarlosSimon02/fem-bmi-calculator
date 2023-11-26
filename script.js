"use strict";

let imperialRadio = document.getElementById("imperial");
let metricRadio = document.getElementById("metric");
let imperialInputs = document.getElementsByClassName("imperial-inputs");
let metricInputs = document.getElementsByClassName("metric-inputs");
let textfields = document.querySelectorAll("input[type=number]");
let flexB = document.querySelectorAll(".main__top__flex__calc__inputs>*")

let height;
let weight;

metricRadio.onclick = function() {
    for (var i = 0; i < textfields.length; i++) {
        textfields.item(i).value = "";
    }

    for (var i = 0; i < flexB.length; i++) {
        flexB.item(i).style.flexBasis = "9.375rem";
    }

    for (var i = 0; i < imperialInputs.length; i++) {
        imperialInputs.item(i).style.display = "none";
    }

    for (var i = 0; i < metricInputs.length; i++) {
        metricInputs.item(i).style.display = "block";
    }
}

imperialRadio.onclick = function() {
    for (var i = 0; i < textfields.length; i++) {
        textfields.item(i).value = "";
    }

    for (var i = 0; i < flexB.length; i++) {
        flexB.item(i).style.flexBasis = "100rem";
    }

    for (var i = 0; i < metricInputs.length; i++) {
        metricInputs.item(i).style.display = "none";
    }

    for (var i = 0; i < imperialInputs.length; i++) {
        imperialInputs.item(i).style.display = "flex";
    }
}

function calculateBMI() {
    
}