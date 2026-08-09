import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const script = "scripts/generate_brochure.py";
const candidates = [
  process.env.PDF_PYTHON,
  "python",
  "python3",
  process.platform === "win32" ? "py" : null,
  process.env.USERPROFILE
    ? join(
        process.env.USERPROFILE,
        ".cache",
        "codex-runtimes",
        "codex-primary-runtime",
        "dependencies",
        "python",
        "python.exe",
      )
    : null,
].filter(Boolean);

let lastStatus = 1;

for (const command of candidates) {
  const isPath = command.includes("\\") || command.includes("/");
  if (isPath && !existsSync(command)) continue;

  const args = command === "py" ? ["-3", script] : [script];
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: false,
  });

  if (result.status === 0) {
    process.exit(0);
  }

  if (result.error?.code === "ENOENT") {
    lastStatus = 1;
    continue;
  }

  lastStatus = result.status || 1;
  break;
}

console.error(
  "PDF үүсгэх Python орчин олдсонгүй. Python суулгах эсвэл PDF_PYTHON утгаар python executable зааж өгнө үү.",
);
process.exit(lastStatus);
