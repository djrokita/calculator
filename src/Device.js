import { Processor } from "./Processor";

export class Device {
    #output = "";
    #isOperationComplited = false;
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

    get isOperationComplited() {
        return this.#isOperationComplited;
    }

    set isOperationComplited(value) {
        return (this.#isOperationComplited = value);
    }

    #resetOutput() {
        this.output = "";
    }

    #attachClickListener() {
        this.inputKeysContainer?.addEventListener("click", this.#clickHandler.bind(this));
    }

    #clickHandler(event) {
        const value = event.target.dataset.key;

        if (value === "equal") {
            return this.#clickEquasionHandler();
        }

        if (event.target.classList.contains("number")) {
            return this.#clickNumberHandler(value);
        }

        if (event.target.classList.contains("func")) {
            return this.#clickFuncHandler(value);
        }
    }

    #clickNumberHandler(value) {
        this.isOperationComplited = false;

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

    displayResult() {
        const result = this.calculator.result;
        this.output = result.toString();
        this.#displayOutput();
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
            this.shouldResetDisplay = true;

            if (this.calculator.result !== null && !this.isOperationComplited) {
                this.calculator.calculate();
                this.isOperationComplited = true;
            } else {
                this.calculator.operator = value;
            }

            this.displayResult();
        }
    }

    #clickEquasionHandler() {
        this.isOperationComplited = true;
        this.calculator.input = this.#output;
        this.calculator.calculate();
        this.displayResult();
    }
}
