import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import puppeteer from "puppeteer-core"; // Use puppeteer-core
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';

// Define __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to encode SVG file to base64
const encodeToBase64 = (filePath) => {
  const file = fs.readFileSync(filePath);
  return `data:image/svg+xml;base64,${file.toString('base64')}`;
};

const voteIconBase64 = encodeToBase64(path.join(__dirname, 'public', 'voteIcon.svg'));
const commentIconBase64 = encodeToBase64(path.join(__dirname, 'public', 'commentIcon.svg'));

const app = express();

app.use(cookieParser());
app.use(cors()); // Allow all origins

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Media Assignment");
});

app.get('/api/generate-image', async (req, res) => {
  const { avatar, title, description, media, username, category, updatedAt, voteCount, commentsCount } = req.query;
  const truncateDescription = (description, maxLength = 50) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  const htmlContent = `
    <html>
<body style="font-family: Arial, sans-serif; text-align: center; margin: 0; padding: 0; height: 630px; width: 1200px; overflow: hidden;">
    <div style="position: relative; background-color: #13181d; color: white; padding: 20px; height: 630px; width: 1200px; box-sizing: border-box;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center;">
                <img src="${avatar}" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 20px;" />
                <div style="text-align: left;">
                    <span style="font-size: 24px; font-weight: bold;">${username}</span>
                    <p style="font-size: 16px;">${new Date(updatedAt).toLocaleDateString()}</p>
                </div>
            </div>
            <p style="font-size: 16px;">${category}</p>
        </div>
        <h1 style="margin-top: 20px; font-size: 32px; font-weight: bold; text-align: left;">${title}</h1>
        <p style="font-size: 24px; color: #9bb7b8; text-align: left;">${truncateDescription(description)}</p>
        <div style="margin-top: 20px; border: 1px solid #ccc; padding: 10px; ">
            <img src="${media}" style=" height: auto;" />
        </div>
        <div style="display: flex;  margin-top: 20px; font-size: 20px;">
        <div style="display: flex; align-items: center; margin-right: 20px">
            <img src="${voteIconBase64}" style="width: 24px; height: 24px; margin-right: 5px;" />
            ${voteCount}
        </div>
            <div style="display: flex; align-items: center; margin-right: 20px;">
                <img src="${commentIconBase64}" style="width: 24px; height: 24px; margin-right: 5px;" />
                ${commentsCount}
            </div>
        </div>
    </div>
</body>
</html>
  `;

  // Ensure the public directory exists
  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome-stable',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  // Set viewport to the desired image size
  await page.setViewport({ width: 1200, height: 630 });

  await page.setContent(htmlContent);

  const screenshotPath = path.join(publicDir, 'og-image.png');
  await page.screenshot({ path: screenshotPath });

  await browser.close();

  res.json({ imageUrl: `http://localhost:3000/og-image.png` });
});

export { app };
