import { Processor } from "./Processor";

export class Device {
    #output = "";
    #isOperationCompleted = false;
    #shouldResetDisplay = false;

    constructor() {
        this.calculator = new Processor();
        this.inputKeysContainer = document.querySelector(".in");
        this.outContainer = document.getElementById("out");
        this.#attachClickListener();
        // this.#displayOutput();
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

        if (value === "reset") {
            return this.reset();
        }

        if (event.target.classList.contains("number")) {
            return this.#clickNumberHandler(value);
        }

        if (event.target.classList.contains("func")) {
            return this.#clickFuncHandler(value);
        }
    }

    #clickNumberHandler(value) {
        this.isOperationCompleted = false;

        if (this.#shouldResetDisplay) {
            this.#resetOutput();
            this.#resetDisplay();
        }

        this.output = this.output + value;
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
            } else {
                this.calculator.operator = value;
            }

            this.displayResult();
        }
    }

    #clickEquasionHandler() {
        this.isOperationCompleted = true;
        this.calculator.input = this.output;
        this.calculator.calculate();
        this.displayResult();
    }

    reset() {
        this.isOperationCompleted = false;
        this.calculator.reset();
        this.#resetOutput();
        this.#resetDisplay();
    }
}
