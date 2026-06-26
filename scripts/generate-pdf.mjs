import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

const htmlPath = join(rootDir, "docs", "documentacao-executiva.html");
const pdfPath = join(rootDir, "docs", "AURYX-MEDIA-Documentacao-Executiva.pdf");

if (!existsSync(htmlPath)) {
  console.error(`HTML file not found: ${htmlPath}`);
  process.exit(1);
}

const fileUrl = `file://${htmlPath.replace(/\\/g, "/")}`;

const CHROME_PATHS = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  join(process.env.LOCALAPPDATA || "", "Google", "Chrome", "Application", "chrome.exe"),
].filter(Boolean);

async function launchBrowser() {
  const launchArgs = {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  };

  try {
    return await puppeteer.launch({ ...launchArgs, channel: "chrome" });
  } catch {
  }

  for (const path of CHROME_PATHS) {
    if (existsSync(path)) {
      try {
        return await puppeteer.launch({ ...launchArgs, executablePath: path });
      } catch {
      }
    }
  }

  return await puppeteer.launch(launchArgs);
}

console.log("Generating PDF from:", htmlPath);
console.log("Output:", pdfPath);

const browser = await launchBrowser();

try {
  const page = await browser.newPage();

  await page.goto(fileUrl, {
    waitUntil: "networkidle0",
    timeout: 60000,
  });

  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    margin: {
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
    },
    preferCSSPageSize: true,
  });

  console.log("PDF generated successfully:", pdfPath);
} catch (error) {
  console.error("Failed to generate PDF:", error.message);
  process.exit(1);
} finally {
  await browser.close();
}
