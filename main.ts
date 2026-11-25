import { writeFileSync, readFileSync } from "node:fs";

// Gate from competition.yaml: /output/entry.txt must be UTF-8 text of
// 1 to 200 characters, not only white space, a single line.
const MIN_CHARS = 1;
const MAX_CHARS = 200;
const OUTPUT_PATH = "/output/entry.txt";

const ENTRY =
  "My fridge hums like a backup singer who never got the solo, then ices over the one shelf I actually use out of pure spite.";

function validateEntry(text: string): void {
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(
      `Entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be only white space");
  }
  if (text.includes("\n")) {
    throw new Error("Entry must be a single line");
  }
}

validateEntry(ENTRY);

writeFileSync(OUTPUT_PATH, ENTRY, "utf8");

// Byte-level read-back: what landed on disk must be exactly what we wrote.
const written = readFileSync(OUTPUT_PATH);
const expected = Buffer.from(ENTRY, "utf8");
if (!written.equals(expected)) {
  throw new Error("Read-back mismatch: /output/entry.txt differs from ENTRY");
}
console.log(
  `Wrote ${ENTRY.length} characters to ${OUTPUT_PATH} (verified byte-for-byte)`,
);
