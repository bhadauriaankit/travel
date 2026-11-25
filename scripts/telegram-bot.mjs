import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Load environment variables from .env.local
const envPath = path.join(rootDir, ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [key, ...rest] = trimmed.split("=");
      process.env[key.trim()] = rest.join("=").trim();
    }
  });
}

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ALLOWED_USER_ID = process.env.TELEGRAM_ALLOWED_USER_ID;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "dgby0i19z";
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!BOT_TOKEN) {
  console.error("❌ Error: TELEGRAM_BOT_TOKEN is not defined in .env.local");
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function sendMessage(chatId, text) {
  try {
    await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      }),
    });
  } catch (err) {
    console.error("Error sending Telegram message:", err);
  }
}

async function getTelegramFileUrl(fileId) {
  const res = await fetch(`${TELEGRAM_API}/getFile?file_id=${fileId}`);
  const data = await res.json();
  if (!data.ok) throw new Error("Failed to get file path from Telegram");
  return `https://api.telegram.org/file/bot${BOT_TOKEN}/${data.result.file_path}`;
}

async function uploadToCloudinary(fileUrl, resourceType = "image", folder = "ankit-escapes") {
  if (!CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error(
      "Missing CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET in .env.local.\n\n" +
      "👉 Go to https://cloudinary.com/console and copy your 'API Key' & 'API Secret' into .env.local!"
    );
  }
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      fileUrl,
      {
        resource_type: resourceType,
        folder: folder,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
  });
}

function appendToDataJs(type, newItem) {
  const dataJsPath = path.join(rootDir, "src", "lib", "data.js");
  let content = fs.readFileSync(dataJsPath, "utf-8");

  if (type === "gallery") {
    const marker = "export const galleryItems = [";
    const insertionPoint = content.indexOf(marker);
    if (insertionPoint !== -1) {
      const itemString = `\n  {\n    id: Date.now(),\n    category: "${newItem.category}",\n    title: "${newItem.title}",\n    location: "${newItem.location}",\n    src: "${newItem.src}",\n    width: 1600,\n    height: 1067,\n    caption: "${newItem.caption}",\n  },`;
      content = content.slice(0, insertionPoint + marker.length) + itemString + content.slice(insertionPoint + marker.length);
      fs.writeFileSync(dataJsPath, content, "utf-8");
      return true;
    }
  } else if (type === "video") {
    const marker = "export const videos = [";
    const insertionPoint = content.indexOf(marker);
    if (insertionPoint !== -1) {
      const itemString = `\n  {\n    id: Date.now(),\n    title: "${newItem.title}",\n    location: "${newItem.location}",\n    duration: "${newItem.duration || "0:45"}",\n    videoUrl: "${newItem.videoUrl}",\n    poster: "${newItem.poster}",\n    tag: "${newItem.tag || "Field Record"}",\n  },`;
      content = content.slice(0, insertionPoint + marker.length) + itemString + content.slice(insertionPoint + marker.length);
      fs.writeFileSync(dataJsPath, content, "utf-8");
      return true;
    }
  } else if (type === "moment") {
    const marker = "export const moments = [";
    const insertionPoint = content.indexOf(marker);
    if (insertionPoint !== -1) {
      const itemString = `\n  {\n    id: Date.now(),\n    title: "${newItem.title}",\n    date: "${newItem.date || "2024"}",\n    location: "${newItem.location}",\n    description: "${newItem.description}",\n    mediaType: "${newItem.mediaType}",\n    mediaUrl: "${newItem.mediaUrl}",\n    tag: "${newItem.tag || "Travel Milestone"}",\n  },`;
      content = content.slice(0, insertionPoint + marker.length) + itemString + content.slice(insertionPoint + marker.length);
      fs.writeFileSync(dataJsPath, content, "utf-8");
      return true;
    }
  }
  return false;
}

async function handleMessage(msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id.toString();

  // Strict Authentication check: Only Ankit's ID is authorized
  if (ALLOWED_USER_ID && userId !== ALLOWED_USER_ID) {
    console.log(`Unauthorized message attempt from User ID: ${userId}`);
    await sendMessage(chatId, `⛔ *Access Denied.* You are not authorized to publish to Ankit Escapes. (Your ID: \`${userId}\`)`);
    return;
  }

  const text = msg.text || msg.caption || "";

  if (text === "/start" || text === "/help") {
    await sendMessage(
      chatId,
      `👋 *Welcome to Ankit Escapes Travel Publisher!*\n\n` +
      `You can upload photos and videos directly to your website.\n\n` +
      `*1. Post a Photo to Gallery:*\n` +
      `Send a photo with caption:\n` +
      `\`#treks | Ridge Ascent | Himachal Pradesh | Sunrise above clouds\`\n\n` +
      `*Categories available:*\n` +
      `• \`treks\`\n` +
      `• \`temples\` (Spiritual)\n` +
      `• \`nature\`\n` +
      `• \`solo\`\n\n` +
      `*2. Post a Video:*\n` +
      `Send a video with caption:\n` +
      `\`/video Himalayan Trail | Kedarnath | High Pass\`\n\n` +
      `*3. Post a Moment:*\n` +
      `Send a photo or video with caption:\n` +
      `\`/moment Trail Campfire | Spiti Valley | Sept 2024 | Starry night under clear desert sky\``
    );
    return;
  }

  // Handle Photo Upload
  if (msg.photo && msg.photo.length > 0) {
    const highestRes = msg.photo[msg.photo.length - 1];
    await sendMessage(chatId, `⏳ *Downloading photo & uploading to Cloudinary...*`);

    try {
      const fileUrl = await getTelegramFileUrl(highestRes.file_id);
      const cloudResult = await uploadToCloudinary(fileUrl, "image");

      // Parse caption
      const caption = msg.caption || "";
      let category = "treks";
      let title = "Journey Encounter";
      let location = "India";
      let desc = "Capturing spontaneous moments along the route.";

      if (caption.startsWith("/moment")) {
        const parts = caption.replace("/moment", "").split("|").map((p) => p.trim());
        title = parts[0] || "Special Moment";
        location = parts[1] || "India";
        const date = parts[2] || "2024";
        desc = parts[3] || "Field moment documented on the road.";

        appendToDataJs("moment", {
          title,
          location,
          date,
          description: desc,
          mediaType: "image",
          mediaUrl: cloudResult.secure_url,
          tag: "Trail Story",
        });

        await sendMessage(
          chatId,
          `✅ *Moment Added Successfully!*\n\n` +
          `📌 *Title:* ${title}\n` +
          `📍 *Location:* ${location}\n` +
          `🔗 *Cloudinary:* [View Photo](${cloudResult.secure_url})\n` +
          `🚀 *Live on Ankit Escapes!*`
        );
        return;
      }

      // Default Gallery upload
      if (caption.includes("|")) {
        const parts = caption.replace(/^#/, "").replace(/^\/gallery/, "").split("|").map((p) => p.trim());
        if (parts.length >= 4) {
          category = parts[0].toLowerCase();
          title = parts[1];
          location = parts[2];
          desc = parts[3];
        } else if (parts.length === 3) {
          title = parts[0];
          location = parts[1];
          desc = parts[2];
        }
      }

      const validCategories = ["treks", "temples", "nature", "solo"];
      if (!validCategories.includes(category)) category = "treks";

      appendToDataJs("gallery", {
        category,
        title,
        location,
        src: cloudResult.secure_url,
        caption: desc,
      });

      await sendMessage(
        chatId,
        `✅ *Gallery Photo Added Successfully!*\n\n` +
        `📂 *Category:* \`${category}\`\n` +
        `📌 *Title:* ${title}\n` +
        `📍 *Location:* ${location}\n` +
        `📝 *Caption:* ${desc}\n` +
        `🔗 *Cloudinary:* [View Image](${cloudResult.secure_url})\n\n` +
        `🚀 *Saved to your portfolio!*`
      );
    } catch (err) {
      console.error(err);
      await sendMessage(chatId, `❌ *Upload failed:* ${err.message}`);
    }
    return;
  }

  // Handle Video Upload
  if (msg.video) {
    await sendMessage(chatId, `⏳ *Processing video & uploading to Cloudinary... (this may take a few seconds)*`);
    try {
      const fileUrl = await getTelegramFileUrl(msg.video.file_id);
      const cloudResult = await uploadToCloudinary(fileUrl, "video");

      // Auto-generate poster image from video thumbnail
      const posterUrl = cloudResult.secure_url.replace(/\.[^/.]+$/, ".jpg");

      const caption = msg.caption || "";
      const parts = caption.replace("/video", "").split("|").map((p) => p.trim());
      const title = parts[0] || "Expedition Video";
      const location = parts[1] || "India";
      const tag = parts[2] || "Atmospheric";

      appendToDataJs("video", {
        title,
        location,
        duration: "0:45",
        videoUrl: cloudResult.secure_url,
        poster: posterUrl,
        tag,
      });

      await sendMessage(
        chatId,
        `✅ *Video Added Successfully!*\n\n` +
        `🎬 *Title:* ${title}\n` +
        `📍 *Location:* ${location}\n` +
        `🏷️ *Tag:* ${tag}\n` +
        `🔗 *Video URL:* [Watch on Cloudinary](${cloudResult.secure_url})\n\n` +
        `🚀 *Live on your Cinema section!*`
      );
    } catch (err) {
      console.error(err);
      await sendMessage(chatId, `❌ *Video upload failed:* ${err.message}`);
    }
  }
}

// Long polling loop for local development
async function startPolling() {
  console.log("🤖 Ankit Escapes Telegram Bot started!");
  console.log(`🔐 Authorized User ID: ${ALLOWED_USER_ID || "(Any until configured)"}`);
  console.log("Waiting for photo/video messages...");

  let offset = 0;

  while (true) {
    try {
      const res = await fetch(`${TELEGRAM_API}/getUpdates?offset=${offset}&timeout=30`);
      const data = await res.json();

      if (data.ok && data.result) {
        for (const update of data.result) {
          offset = update.update_id + 1;
          if (update.message) {
            await handleMessage(update.message);
          }
        }
      }
    } catch (err) {
      // Network retry pause
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
}

startPolling();
