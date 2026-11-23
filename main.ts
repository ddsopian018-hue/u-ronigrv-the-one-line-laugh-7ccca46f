import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My microwave beeps at 2 a.m. like it just finished a double shift, and I stand in the dark waiting for the second beep like it's my boss calling me back to work.";

if (!LINE || LINE.length < 1 || LINE.length > 200) {
  console.error(`Invalid line: ${LINE.length} characters (must be 1-200).`);
  process.exit(1);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  console.error("Invalid line: must be a single line.");
  process.exit(1);
}
if (LINE !== LINE.trim()) {
  console.error("Invalid line: no leading or trailing whitespace allowed.");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read back and validate: the file must contain exactly the line, byte for byte.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  console.error("Invalid output: written file does not match the line.");
  process.exit(1);
}
if (Buffer.byteLength(written, "utf8") !== LINE.length) {
  console.error("Invalid output: byte length mismatch.");
  process.exit(1);
}
