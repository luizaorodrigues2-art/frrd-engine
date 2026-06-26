/**
 * Inicia o site e abre o navegador quando estiver pronto.
 */
const { spawn } = require("child_process");
const http = require("http");
const path = require("path");

const PORT = 3000;
const URL = `http://localhost:${PORT}`;
const rootDir = path.join(__dirname, "..");

function openBrowser() {
  const cmd =
    process.platform === "win32"
      ? `start "" "${URL}"`
      : process.platform === "darwin"
        ? `open "${URL}"`
        : `xdg-open "${URL}"`;
  require("child_process").exec(cmd);
}

function waitForServer(maxAttempts = 120) {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const check = () => {
      const req = http.get(URL, (res) => {
        res.resume();
        resolve();
      });

      req.on("error", () => {
        attempts++;
        if (attempts >= maxAttempts) {
          reject(new Error("Servidor não respondeu"));
        } else {
          setTimeout(check, 500);
        }
      });

      req.setTimeout(2000, () => {
        req.destroy();
        attempts++;
        if (attempts >= maxAttempts) reject(new Error("Timeout"));
        else setTimeout(check, 500);
      });
    };

    check();
  });
}

console.log("");
console.log("  ========================================");
console.log("    AURYX MEDIA - Iniciando site...");
console.log("  ========================================");
console.log("");
console.log("  Aguarde... o navegador abre quando estiver pronto.");
console.log("  URL: " + URL);
console.log("");
console.log("  Para PARAR: feche esta janela ou pressione Ctrl+C");
console.log("");

const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
const child = spawn(npmCmd, ["run", "dev"], {
  cwd: rootDir,
  shell: true,
  stdio: "inherit",
  env: { ...process.env, FORCE_COLOR: "1" },
});

let browserOpened = false;

waitForServer()
  .then(() => {
    if (!browserOpened) {
      browserOpened = true;
      console.log("");
      console.log("  ✓ Site pronto! Abrindo navegador...");
      console.log("");
      openBrowser();
    }
  })
  .catch(() => {
    console.log("");
    console.log("  Se o navegador não abriu, acesse manualmente:");
    console.log("  " + URL);
    console.log("");
  });

child.on("error", (err) => {
  console.error("Erro ao iniciar:", err.message);
  process.exit(1);
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});

process.on("SIGINT", () => {
  child.kill("SIGINT");
  process.exit(0);
});
