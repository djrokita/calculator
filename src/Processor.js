export class Processor {
    #input = 0;
    #result = null;
    #operator = null;
    #calcMethod = null;
    #counter = 0;

    get input() {
        return this.#input;
    }

    set input(value) {
        if (value === null) {
            return (this.#input = value);
        }

        const number = parseFloat(value);

        if (!Number.isNaN(number)) {
            this.#input = number;

            return this.#input;
        }

        throw new Error("Input value is not a number");
    }

    get counter() {
        return this.#counter;
    }

    #setCalcMethod(operator, value) {
        switch (operator) {
            case "add":
                return () => this.result + value;
            case "subtract":
                return () => this.result - value;
            case "multiply":
                return () => this.result * value;
            case "divide":
                return () => this.result / value;
            case "square":
                return () => Math.pow(this.input, 2);
            case "root":
                return () => Math.sqrt(this.input);
            default:
                return;
        }
    }

    calculate() {
        if (this.operator) {
            this.#calcMethod = this.#setCalcMethod(this.operator, this.input);

            this.result = this.#calcMethod();
            this.input = null;
            this.#counter += 1;
            return;
        }

        throw new Error("There is no opetator set");
    }

    calculatePercent() {
        this.calculate();

        if (this.operator === "multiply") {
            return (this.result /= 100);
        }

        if (this.operator === "divide") {
            return (this.result *= 100);
        }
    }

    reset() {
        this.input = 0;
        this.operator = null;
        this.result = null;
        this.calcMethod = null;
        this.#counter = 0;
    }

    set operator(id) {
        if (id === null) {
            return (this.#operator = null);
        }

        if (this.input !== null) {
            this.result = this.input;
        }

        if (Operations[id]) {
            this.#operator = Operations[id];

            return this.#operator;
        }

        throw new Error("Wrong operator");
    }

    get operator() {
        return this.#operator;
    }

    get result() {
        return this.#result;
    }

    set result(value) {
        return (this.#result = value);
    }
}

const Operations = {
    add: "add",
    subtract: "subtract",
    multiply: "multiply",
    divide: "divide",
    square: "square",
    root: "root",
    percent: "percent",
};
