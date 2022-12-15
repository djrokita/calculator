import { Processor } from "./Processor";

const INIT_OUTPUT = "";
const NUMBER_REGEX = /^[+|-]?\d+([.]?\d+)$/;

export class Device {
    #output = INIT_OUTPUT;
    #isOperationCompleted = false;
    #shouldResetDisplay = false;

    constructor() {
        this.calculator = new Processor();
        this.inputKeysContainer = document.querySelector(".in");
        this.outContainer = document.getElementById("out");
        this.#attachClickListener();
        this.#resetDisplay();
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

    get isOperationCompleted() {
        return this.#isOperationCompleted;
    }

    set isOperationCompleted(value) {
        return (this.#isOperationCompleted = value);
    }

    #resetOutput() {
        this.output = INIT_OUTPUT;
    }

    #attachClickListener() {
        this.inputKeysContainer?.addEventListener("click", this.#clickHandler.bind(this));
    }

    #clickHandler(event) {
        const value = event.target.dataset.key;

        if (value === "equal") {
            const calculate = this.calculator.calculate.bind(this.calculator);
            return this.getResult(calculate);
        }

        if (value === "percent") {
            const calculate = this.calculator.calculatePercent.bind(this.calculator);
            return this.getResult(calculate);
        }

        if (value === "reset") {
            return this.reset();
        }

        if (event.target.classList.contains("number")) {
            return this.#clickNumberHandler(value);
        }

        if (event.target.classList.contains("unary")) {
            return this.#clickUnaryFuncHandler(value);
        }

        if (event.target.classList.contains("func")) {
            return this.#clickFuncHandler(value);
        }
    }

    #clickNumberHandler(value) {
        if (/[.]/.test(value) && /[.]/.test(this.output)) {
            return;
        }

        this.isOperationCompleted = false;

        if (this.#shouldResetDisplay) {
            this.#resetOutput();
            this.#resetDisplay();
            this.shouldResetDisplay = false;
        }

        this.output = this.output + value;
        this.#displayOutput();
    }

    #resetDisplay() {
        const displayCells = this.outContainer.children;

        for (let cell of displayCells) {
            cell.innerText = "";
        }

        const firstCell = this.outContainer.lastElementChild;
        firstCell.innerText = "0";
    }

    displayResult() {
        this.#resetDisplay();
        const result = this.calculator.result;
        this.output = result.toString();
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
            this.shouldResetDisplay = true;

            if (this.calculator.result !== null && !this.isOperationCompleted) {
                this.calculator.calculate();
                this.isOperationCompleted = true;
            }

            this.calculator.operator = value;

            this.displayResult();
        }
    }

    #clickUnaryFuncHandler(value) {
        if (this.output) {
            this.calculator.operator = value;
            this.calculator.input = this.output;
            this.calculator.calculate();
            this.isOperationCompleted = true;
            this.displayResult();
        }
    }

    getResult(calculate) {
        this.isOperationCompleted = true;
        this.calculator.input = this.output;
        calculate();
        this.displayResult();
    }

    reset() {
        this.isOperationCompleted = false;
        this.calculator.reset();
        this.#resetOutput();
        this.#resetDisplay();
    }
}
