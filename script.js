"use strict";

let imperialRadio = document.getElementById("imperial");
let metricRadio = document.getElementById("metric");
let imperialInputs = document.getElementsByClassName("imperial-inputs");
let metricInputs = document.getElementsByClassName("metric-inputs");
let textfields = document.querySelectorAll("input[inputmode=numeric]");
let flexB = document.querySelectorAll(".main__top__flex__calc__inputs>*");
let bmiResult = document.getElementById("bmi-result");
let weightClass = document.getElementById("weight-class");
let suggestedWeight = document.getElementById("suggested-weight");
let isMetric = true;

let welcomeStateDisp = document.getElementById("welcome-state");
let resultStateDisp = document.getElementById("result-state");

let cm = document.getElementById("cm");
let ft = document.getElementById("ft");
let inch = document.getElementById("in");
let kg = document.getElementById("kg");
let st = document.getElementById("st");
let lbs = document.getElementById("lbs");

let height = 0;
let weight = 0;

let breakpoints = [18.5,25,30];

metricRadio.onclick = function() {
    isMetric = true;
    height = 0;
    weight = 0;

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

    calculateBMI();
}

imperialRadio.onclick = function() {
    isMetric = false;
    height = 0;
    weight = 0;

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

    calculateBMI();
}

function setBMICategory(bmi) {
    if(bmi < breakpoints[0]) {
        weightClass.innerHTML = "underweight";
    } else if(bmi >= breakpoints[0] && bmi < breakpoints[1]) {
        weightClass.innerHTML = "healthy weight";
    } else if(bmi >= breakpoints[1] && bmi < breakpoints[2]) {
        weightClass.innerHTML = "overweight";
    } else {
        weightClass.innerHTML = "obese";
    }

    let idealWeightMin = breakpoints[0] * Math.pow(parseFloat(height),2);
    let idealWeightMax = (breakpoints[1]-0.1) * Math.pow(parseFloat(height),2);

    if(isMetric) {
        suggestedWeight.innerHTML = `${idealWeightMin.toFixed(1)}kg - ${idealWeightMax.toFixed(1)}kg`;
    } else {
        let inStMin = Math.floor((idealWeightMin * 2.2046226218)/14);
        let inLbMin = Math.floor((idealWeightMin * 2.2046226218)%14);
        let inStMax = Math.floor((idealWeightMax * 2.2046226218)/14);
        let inLbMax = Math.floor((idealWeightMax * 2.2046226218)%14);
        suggestedWeight.innerHTML = `${inStMin}st ${inLbMin}lb - ${inStMax}st ${inLbMax}lb`;
    }
}

function calculateBMI() {
    if(isMetric) {
        height = cm.value ? cm.value/100 : 0; //should be in meters
        weight = kg.value ? kg.value : 0;
    } else {
        height = ft.value && inch.value ? (parseFloat(ft.value * 12) + parseFloat(inch.value)) / 39.3700787402  : 0;
        weight = st.value && lbs.value ? (parseFloat(st.value * 14) + parseFloat(lbs.value)) / 2.2046226218  : 0;
    }

    if(height && weight) {
        let result = (weight / Math.pow(height,2)).toFixed(1);
        bmiResult.innerHTML = result > 1000 ? parseFloat(result).toExponential() : result;
        setBMICategory(parseFloat(result));
        welcomeStateDisp.style.display = "none";
        resultStateDisp.style.display = "flex";
    } else {
        welcomeStateDisp.style.display = "block";
        resultStateDisp.style.display = "none";
    }
}

function setInputFilter(textbox, inputFilter, errMsg) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function(event) {
        textbox.addEventListener(event, function(e) {
            if (inputFilter(this.value)) {
                // Accepted value
                if (["keydown","mousedown","focusout"].indexOf(e.type) >= 0){
                this.classList.remove("input-error");
                this.setCustomValidity("");
                }
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
                calculateBMI();
            } else if (this.hasOwnProperty("oldValue")) {
                // Rejected value - restore the previous one
                this.classList.add("input-error");
                this.setCustomValidity(errMsg);
                this.reportValidity();
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                // Rejected value - nothing to restore
                this.value = "";
            }
        });
    });
}

setInputFilter(cm, function(value) {return /^-?\d*[.]?\d*$/.test(value); }, "Must be a floating (real) number");
setInputFilter(ft, function(value) {return /^-?\d*$/.test(value); }, "Must be an integer");
setInputFilter(inch, function(value) {return /^-?\d*[.]?\d*$/.test(value) && (value === "" || parseFloat(value) < 12); }, "Must be a floating (real) number and below to 12");
setInputFilter(kg, function(value) {return /^-?\d*[.]?\d*$/.test(value); }, "Must be a floating (real) number");
setInputFilter(st, function(value) {return /^-?\d*$/.test(value); }, "Must be an integer");
setInputFilter(lbs, function(value) {return /^-?\d*[.]?\d*$/.test(value) && (value === "" || parseFloat(value) < 14); }, "Must be a floating (real) number and below to 14");
