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

const calc = new Processor();
calc.input = 5;
calc.operator = "add";
const result1 = calc.result;
console.log("🚀 ~ file: index.js:46 ~ result1", result1);
calc.input = 2;

// const result2 = calc.result;
// console.log("🚀 ~ file: index.js:52 ~ result2", result2);

// debugger;
calc.operator = "add";
// calc.calculate();
const result3 = calc.result;
console.log("🚀 ~ file: index.js:56 ~ result3", result3);
// console.log("should", calc.shouldCalculate);
// calc.setOperator("add");

// calc.calculate();
// const result4 = calc.getResult();
// console.log("🚀 ~ file: index.js:60 ~ result4", result4);

class Device {
    constructor() {
        this.usedKey = "";
        this.output = "";
        this.calculator = new Processor();
        this.inputKeysContainer = document.querySelector(".in");
        this.outContainer = document.getElementById("out");
        this.#attachClickListener();
    }

    #attachClickListener() {
        this.inputKeysContainer?.addEventListener("click", this.#clickHandler.bind(this), true);
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
        this.output = this.output + value;
        this.#displayOutput();
    }

    #displayOutput() {
        const text = this.output.split("").reverse();

        text.forEach((value, index) => {
            const cell = this.outContainer?.querySelector(`#out-${index}`);
            cell.innerText = value;
        });
    }

    #clickFuncHandler(value) {
        if (this.output) {
            this.calculator.input = this.output;
            // this.calculator.
        }
        console.log("func", value);
    }
}

new Device();
