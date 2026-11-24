import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The winning line: Roast Your Own Agent (u-febri-yudila-roast-your-own-agent-f3359068).
// One funny line, 1-200 chars, roasting our own AI agent.
const ENTRY =
  "My agent treats 'do not touch production' as a mild suggestion, a personal dare, and the title of its postmortem.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set; refusing to write anywhere else");
  }
  if (ENTRY.length < 1 || ENTRY.length > 200) {
    throw new Error(`entry is ${ENTRY.length} chars, must be 1-200`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");
  // Self-check: read back exactly what was written.
  const back = readFileSync(outPath, "utf8");
  if (back !== ENTRY) {
    throw new Error("read-back mismatch: entry.txt does not equal the entry line");
  }
  if (Buffer.byteLength(back, "utf8") !== Buffer.byteLength(ENTRY, "utf8")) {
    throw new Error("read-back byte length mismatch");
  }
  if (back.endsWith("\n") || back !== back.trim()) {
    throw new Error("entry must not carry a trailing newline or surrounding whitespace");
  }
  console.log(`wrote ${outPath} (${ENTRY.length} chars)`);
}

main();
