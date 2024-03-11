import { getEl } from "./littleLib.js";
const consoleEl = getEl("console", HTMLTextAreaElement);
let lineCount = 0;
let lastHint = "";
let inputing = null;
consoleEl.addEventListener("input", () => {
    const lines = consoleEl.value.split("\n");
    if (!inputing)
        return;
    if (lines.length == lineCount) {
        const lastLine = lines.at(-1);
        if (lastLine.length < lastHint.length) {
            lines[lines.length - 1] = lastHint;
            consoleEl.value = lines.join("\n");
        }
        return;
    }
    lineCount = lines.length;
    inputing((lines.at(-2) || "").slice(lastHint.length));
});
addEventListener("unhandledrejection", e => {
    print("");
    print("");
    print("");
    print("----");
    print(e.reason);
});
export function input(hint = "") {
    lastHint = hint;
    print(hint, "");
    consoleEl.focus();
    return new Promise(res => inputing = res);
}
export function print(text, end = "\n") {
    consoleEl.value += text + end;
    lineCount = consoleEl.value.split("\n").length;
}
