export type Dict = { [key: string]: string }
const MorseCodeEnOnly: Dict = {
	"A": ".-",
	"B": "-...",
	"C": "-.-.",
	"D": "-..",
	"E": ".",
	"F": "..-.",
	"G": "--.",
	"H": "....",
	"I": "..",
	"J": ".---",
	"K": "-.-",
	"L": ".-..",
	"M": "--",
	"N": "-.",
	"O": "---",
	"P": ".--.",
	"Q": "--.-",
	"R": ".-.",
	"S": "...",
	"T": "-",
	"U": "..-",
	"V": "...-",
	"W": ".--",
	"X": "-..-",
	"Y": "-.--",
	"Z": "--..",
}
const MorseCodeRuOnly: Dict = {
	"А": ".-",
	"Б": "-...",
	"В": ".--",
	"Г": "--.",
	"Д": "-..",
	"Ё": ".",
	"Е": ".",
	"Ж": "...-",
	"З": "--..",
	"И": "..",
	"Й": ".---",
	"К": "-.-",
	"Л": ".-..",
	"М": "--",
	"Н": "-.",
	"О": "---",
	"П": ".--.",
	"Р": ".-.",
	"С": "...",
	"Т": "-",
	"У": "..-",
	"Ф": "..-.",
	"Х": "....",
	"Ц": "-.-.",
	"Ч": "---.",
	"Ш": "----",
	"Щ": "--.-",
	"Ъ": "--.--",
	"Ы": "-.--",
	"Ь": "-..-",
	"Э": "..-..",
	"Ю": "..--",
	"Я": ".-.-",
}
const MorseCodeOther: Dict = {
	"1": ".----",
	"2": "..---",
	"3": "...--",
	"4": "....-",
	"5": ".....",
	"6": "-....",
	"7": "--...",
	"8": "---..",
	"9": "----.",
	"0": "-----",
	"?": "..--..",
	".": ".-.-.-",
	",": "--..--",
	"'": ".----.",
	"!": "-.-.--",
	"/": "-..-.",
	"(": "-.--.",
	")": "-.--.-",
	":": "---...",
	";": "-.-.-.",
	"=": "-...-",
	"+": ".-.-.",
	"-": "-....-",
	"_": "..--.-",
	'"': ".-..-.",
	"&": ".-...",
	"$": "...-..-",
	"@": ".--.-.",
	"#": "........",
	" ": " ",
}
export const MorseCode: Dict = {
	...MorseCodeEnOnly,
	...MorseCodeRuOnly,
	...MorseCodeOther,
}
export const MorseDecode: Dict = {
	"": " ",
}
export const MorseDecodeEn: Dict = {
	"": " ",
}
export const MorseDecodeRu: Dict = {
	"": " ",
}

for (let key in MorseCode)
	MorseDecode[MorseCode[key]] = key;

for (let key in { ...MorseCodeRuOnly, ...MorseCodeEnOnly, ...MorseCodeOther })
	MorseDecodeEn[MorseCode[key]] = key;

for (let key in { ...MorseCodeEnOnly, ...MorseCodeRuOnly, ...MorseCodeOther })
	MorseDecodeRu[MorseCode[key]] = key;

console.log(MorseDecode);
