import { input } from "./console.js";
import { MorseCode, MorseDecode } from "./data.js";
import { random } from "./littleLib.js";
export function encode_str(str) {
    let r = "";
    for (const ch of str)
        r += (MorseCode[ch.toUpperCase()] || ch) + " ";
    return r.trim();
}
export function decode_str(str) {
    let r = "";
    for (const ch of str.split(" "))
        r += MorseDecode[ch] || ch;
    return r.trim();
}
const ascii_lowercase = "abcdefghijklmnopqrstuvwxyz";
const ascii_uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ascii_letters = ascii_lowercase + ascii_uppercase;
export async function compress(str, auto) {
    const letters = new Set(ascii_letters);
    for (const ch of new Set(str))
        letters.delete(ch);
    const compress_letters = Array.from(letters.keys());
    random.shuffle(compress_letters);
    const d = { "": "" };
    let autoI = 0;
    let last = "";
    let count = 0;
    for (const ch of str) {
        if (ch == last) {
            count++;
            continue;
        }
        if (count > 1) {
            const seq = last.repeat(count);
            if (d[seq] === undefined) {
                let v = seq;
                if (auto) {
                    v = compress_letters[autoI];
                    autoI++;
                }
                else {
                    v = (await input(seq + ": "))[0];
                }
                d[seq] = v;
            }
        }
        last = ch;
        count = 1;
    }
    if (count > 1) {
        const seq = last.repeat(count);
        if (d[seq] === undefined) {
            let v = seq;
            if (auto) {
                v = compress_letters[autoI];
                autoI++;
            }
            else {
                v = (await input(seq + ": "))[0];
            }
            d[seq] = v;
        }
    }
    delete d[""];
    let compressed = str;
    let ds = "";
    for (const key of Object.keys(d).sort((a, b) => a.length - b.length)) {
        const char = d[key];
        ds += `${char}${key.length}${key[0]}`;
        compressed = compressed.replaceAll(key, char);
    }
    return ds + "|" + compressed;
}
export function decompress(str) {
    const d = {};
    let decompressed = "";
    let decoding = false;
    for (let i = 0; i < str.length; i++) {
        const ch = str[i];
        if (ch == "|")
            decoding = true;
        else if (decoding)
            decompressed += d[ch] || ch;
        else {
            const [key, count, chars] = str.slice(i, i + 3).split("");
            d[key] = chars.repeat(parseInt(count, 10));
            i += 2;
        }
    }
    return decompressed;
}
