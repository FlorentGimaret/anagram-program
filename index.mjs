import fs from "node:fs";
import readline from "node:readline";

try {
  const anagrams = new Map();

  const rl = readline.createInterface({
    input: fs.createReadStream("./liste.de.mots.francais.frgut.txt"),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const sortedWord = Array.from(line)
      .sort(new Intl.Collator("fr").compare)
      .join("")
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");

    if (!anagrams.has(sortedWord)) {
      anagrams.set(sortedWord, [line]);
    } else {
      anagrams.get(sortedWord).push(line);
    }
  }

  let stringAnagrams = "";

  for (const a of anagrams) {
    if (a[1].length > 1) {
      stringAnagrams += a[1].join(" ") + "\n";
    }
  }

  fs.writeFile("./anagrams.txt", stringAnagrams, (err) => {
    if (err) console.error("/!\\ Error : ", err);
    else console.log("Done !");
  });
} catch (err) {
  console.log(err);
}
