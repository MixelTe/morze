import { input, print } from "./console.js";
import { compress, decode_str, decompress, encode_str } from "./morze.js";

run()
async function run()
{
	const m = await input("[1-encode, 2-decode]: ");
	const c = ["y", "н", "у"].includes((await input("use compress [y/N]: ")).toLowerCase());
	if (m == "1")
	{
		const ca = !c ? false : !["n", "т"].includes((await input("auto compress [Y/n]: ")).toLowerCase());
		let char = (await input("char: ")).toLowerCase();
		let char2 = char;
		if (char.length == 1)
		{
			char2 = char.toUpperCase();
		}
		else
		{
			char2 = char[1];
			char = char[0];
		}
		let encoded = encode_str(await input("text: "));
		print("")
		print(encoded);
		encoded = encoded.replaceAll(".", char).replaceAll("-", char2).replaceAll(" ", "-");
		print("")
		print(encoded);
		if (c)
		{
			const compressed = await compress(encoded, ca);
			print("")
			print(compressed);
		}
	}
	else if (m == "2")
	{
		let text = await input("text: ");
		if (c)
		{
			text = decompress(text);
			print(text);
		}
		const charset = new Set(text);
		charset.delete("-");
		const chars = Array.from(charset.keys());
		const char1 = chars[0];
		const char2 = chars[1];
		text = text.replaceAll("-", " ").replaceAll("   ", "  ");
		const text1 = text.replaceAll(char1, ".").replaceAll(char2, "-");
		const text2 = text.replaceAll(char2, ".").replaceAll(char1, "-");
		print("")
		print(text1)
		print("")
		print(decode_str(text1))
		print("")
		print(decode_str(text1, true))
		print("")
		print(text2)
		print("")
		print(decode_str(text2))
		print("")
		print(decode_str(text2, true))
	}
	else
	{
		print("Wrong mode")
	}
	print("")
	print("-----")
	print("End of program!")
}
