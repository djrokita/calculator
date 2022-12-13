import { Processor } from "./Processor";

export class Device {
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
            debugger;
            this.calculator.input = this.#output;

            if (this.calculator.operator) {
                this.calculator.calculate();
                this.displayResult();
            }

            this.calculator.operator = value;
            this.shouldResetDisplay = true;
            this.displayResult();
        }
    }

    #clickEquasionHandler() {
        debugger;
        this.calculator.input = this.#output;
        this.calculator.calculate();
        this.displayResult();
    }
}
