import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My microwave beeps at 2 a.m. like it just finished a double shift, and I stand there in the dark waiting for the second beep like it is my boss calling me back in.";

if (!LINE || LINE.length < 1 || LINE.length > 200) {
  console.error(`Invalid line: ${LINE.length} characters (must be 1-200).`);
  process.exit(1);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  console.error("Invalid line: must be a single line.");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
