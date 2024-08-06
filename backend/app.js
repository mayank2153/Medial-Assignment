import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';

// Define __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cookieParser());
app.use(cors()); // Allow all origins

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Media Assignment");
});

app.get('/api/generate-html', async (req, res) => {
  const { avatar, title, description, media, username, category, updatedAt } = req.query;
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
          <h1 style="margin-top: 20px; font-size: 32px; font-weight: bold;">${title}</h1>
          <p style="font-size: 24px; color: #9bb7b8;">${truncateDescription(description)}</p>
          <div style="margin-top: 20px; border: 1px solid #ccc; padding: 10px;">
            <img src="${media}" style="max-width: 160px; height: auto;" />
          </div>
        </div>
      </body>
    </html>
  `;

  res.set('Content-Type', 'text/html');
  res.send(htmlContent);
});

app.get('/api/generate-image', async (req, res) => {
  const { avatar, title, description, media, username, category, updatedAt } = req.query;
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
          <h1 style="margin-top: 20px; font-size: 32px; font-weight: bold;">${title}</h1>
          <p style="font-size: 24px; color: #9bb7b8;">${truncateDescription(description)}</p>
          <div style="margin-top: 20px; border: 1px solid #ccc; padding: 10px;">
            <img src="${media}" style="max-width: 160px; height: auto;" />
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
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: '/path/to/chrome' // Replace with the logged path
  });
  const page = await browser.newPage();

  // Set viewport to the desired image size
  await page.setViewport({ width: 1200, height: 630 });

  await page.setContent(htmlContent);

  const screenshotPath = path.join(publicDir, 'og-image.png');
  await page.screenshot({ path: screenshotPath });

  await browser.close();

  res.json({ imageUrl: `https://medial-assignment.onrender.com/og-image.png` });
});

app.listen(process.env.PORT, () => {
  console.log('listening on port ' + process.env.PORT);
});

export { app };
