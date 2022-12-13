console.log("test");
class Processor {
    input = null;
    result = 0;
    output = 0;
    operation = "";
    #calcMethod;
    #shouldCalculate = false;

    setInput(value) {
        this.input = value;

        if (this.operation) {
            this.calcMethod = this.#setCalcMethod(this.operation)(value);
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
        this.result = this.calcMethod();
        this.input = null;
    }

    setOperator(id) {
        if (this.shouldCalculate) {
            this.calculate();
            // this.input = 0;
        } else {
            this.result = this.input;
        }

        if (Operations[id]) {
            this.operation = Operations[id];
        } else {
            throw new Error("Wrong operator");
        }

        this.shouldCalculate = !this.shouldCalculate;
    }

    getResult() {
        return this.result;
    }

    getOutput() {
        return this.output;
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
calc.setInput(5);
calc.setOperator("add");
const result1 = calc.getResult();
console.log("🚀 ~ file: index.js:46 ~ result1", result1);
calc.setInput(2);

// const result2 = calc.getResult();
// console.log("🚀 ~ file: index.js:52 ~ result2", result2);

// debugger;
// calc.setOperator("add");
calc.calculate();
const result3 = calc.getResult();
console.log("🚀 ~ file: index.js:56 ~ result3", result3);
console.log("should", calc.shouldCalculate);
// calc.setOperator("add");

calc.calculate();
const result4 = calc.getResult();
console.log("🚀 ~ file: index.js:60 ~ result4", result4);

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
        if (event.target.classList.contains("number")) {
            const value = event.target.dataset.key;
            this.#clickNumberHandler(value);
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
}

new Device();
