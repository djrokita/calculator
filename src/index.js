class Processor {
    #input = null;
    #result = 0;
    #output = 0;
    #operator = "";
    #calcMethod;
    #shouldCalculate = false;

    set input(value) {
        this.#input = value;

        if (this.#operator) {
            this.#calcMethod = this.#setCalcMethod(this.#operator)(value);
        }
    }

    #setCalcMethod(id) {
        switch (id) {
            case "add":
                return (value) => () => this.result + value;
            case "subtract":
                return (value) => () => this.result - value;
            case "multiply":
                return (value) => () => this.result * value;
            case "divide":
                return (value) => () => this.result / value;
        }
    }

    get shouldCalculate() {
        return this.#shouldCalculate;
    }

    set shouldCalculate(value) {
        return (this.#shouldCalculate = value);
    }

    calculate() {
        this.#result = this.#calcMethod();
        this.#input = null;
    }

    set operator(id) {
        if (this.shouldCalculate) {
            this.calculate();
        } else {
            this.#result = this.#input;
        }

        if (Operations[id]) {
            this.#operator = Operations[id];
        } else {
            throw new Error("Wrong operator");
        }

        this.shouldCalculate = !this.shouldCalculate;
    }

    get operator() {
        return this.#operator;
    }

    get result() {
        return this.#result;
    }

    get output() {
        return this.#output;
    }
}

const divide = (val1, val2) => val1 / val2;

const Operations = {
    add: "add",
    subtract: "subtract",
    multiply: "multiply",
    divide: "divide",
};

// const calc = new Processor();
// calc.input = 5;
// calc.operator = "add";
// const result1 = calc.result;
// console.log("🚀 ~ file: index.js:46 ~ result1", result1);
// calc.input = 2;

// const result2 = calc.result;
// console.log("🚀 ~ file: index.js:52 ~ result2", result2);

// debugger;
// calc.operator = "add";
// calc.calculate();
// const result3 = calc.result;
// console.log("🚀 ~ file: index.js:56 ~ result3", result3);
// console.log("should", calc.shouldCalculate);
// calc.setOperator("add");

// calc.calculate();
// const result4 = calc.getResult();
// console.log("🚀 ~ file: index.js:60 ~ result4", result4);

class Device {
    #output = "";
    #shouldResetDisplay = false;

    constructor() {
        this.usedKey = "";
        this.calculator = new Processor();
        this.inputKeysContainer = document.querySelector(".in");
        this.outContainer = document.getElementById("out");
        this.#attachClickListener();
    }

    get output() {
        return this.#output;
    }

    set output(value) {
        return (this.#output = value);
    }

    get shouldResetDisplay() {
        return this.#shouldResetDisplay;
    }

    set shouldResetDisplay(value) {
        return (this.#shouldResetDisplay = value);
    }

    #resetOutput() {
        this.output = "";
    }

    #attachClickListener() {
        this.inputKeysContainer?.addEventListener("click", this.#clickHandler.bind(this));
    }

    #clickHandler(event) {
        const value = event.target.dataset.key;

        if (event.target.classList.contains("number")) {
            return this.#clickNumberHandler(value);
        }

        if (event.target.classList.contains("func")) {
            return this.#clickFuncHandler(value);
        }
    }

    #clickNumberHandler(value) {
        if (this.#shouldResetDisplay) {
            this.#resetOutput();
            this.#resetDisplay();
        }

        this.#output = this.#output + value;
        this.#displayOutput();
    }

    #resetDisplay() {
        const displayCells = this.outContainer.children;

        for (let cell of displayCells) {
            cell.innerText = "";
        }

        this.shouldResetDisplay = false;
    }

    #displayOutput() {
        const text = this.#output.split("").reverse();

        text.forEach((value, index) => {
            const cell = this.outContainer?.querySelector(`#out-${index}`);
            cell.innerText = value;
        });
    }

    #clickFuncHandler(value) {
        if (this.#output) {
            this.calculator.input = this.#output;
            this.calculator.operator = value;
            this.shouldResetDisplay = true;
        }
        console.log("func", value);
    }
}

new Device();
