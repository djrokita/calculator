console.log("test");
class Device {
    input = 0;
    result = 0;
    output = 0;
    operation = "";
    calcMethod;

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

    calculate() {
        this.result = this.calcMethod(this.input);
        this.input = 0;
    }

    setOperator(id) {
        this.result = this.input;

        if (Operations[id]) {
            this.operation = Operations[id];
        } else {
            throw new Error("Wrong operator");
        }
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

const calc = new Device();
calc.setInput(5);
calc.setOperator("divide");
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

// calc.setOperator("add");

calc.calculate();
const result4 = calc.getResult();
console.log("🚀 ~ file: index.js:60 ~ result4", result4);
