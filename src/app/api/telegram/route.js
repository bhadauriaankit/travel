import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dgby0i19z",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ALLOWED_USER_ID = process.env.TELEGRAM_ALLOWED_USER_ID;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function sendTelegramMessage(chatId, text) {
  if (!BOT_TOKEN) return;
  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
    }),
  });
}

async function getTelegramFileUrl(fileId) {
  const res = await fetch(`${TELEGRAM_API}/getFile?file_id=${fileId}`);
  const data = await res.json();
  if (!data.ok) throw new Error("Could not fetch file metadata from Telegram");
  return `https://api.telegram.org/file/bot${BOT_TOKEN}/${data.result.file_path}`;
}

export async function POST(req) {
  try {
    const update = await req.json();
    const msg = update?.message;

    if (!msg) {
      return NextResponse.json({ ok: true });
    }

    const chatId = msg.chat.id;
    const userId = msg.from?.id?.toString();

    // Security Gate: Only Ankit
    if (ALLOWED_USER_ID && userId !== ALLOWED_USER_ID) {
      await sendTelegramMessage(
        chatId,
        `⛔ *Access Denied.* Only Ankit is authorized to publish to this portfolio.`
      );
      return NextResponse.json({ ok: true });
    }

    const text = msg.text || msg.caption || "";

    if (text === "/start" || text === "/help") {
      await sendTelegramMessage(
        chatId,
        `👋 *Ankit Escapes Webhook Active!*\n\n` +
        `Send any photo or video with a formatted caption:\n\n` +
        `*Gallery Photo:*\n` +
        `\`#treks | Ridge Ascent | Himachal Pradesh | Sunrise over clouds\`\n\n` +
        `*Video:*\n` +
        `\`/video High Pass | Kedarnath | Wilderness\``
      );
      return NextResponse.json({ ok: true });
    }

    // Photo received
    if (msg.photo && msg.photo.length > 0) {
      const highestRes = msg.photo[msg.photo.length - 1];
      const fileUrl = await getTelegramFileUrl(highestRes.file_id);

      const result = await cloudinary.uploader.upload(fileUrl, {
        folder: "ankit-escapes",
        resource_type: "image",
      });

      await sendTelegramMessage(
        chatId,
        `✅ *Photo Uploaded to Cloudinary!*\n\n` +
        `🔗 *URL:* ${result.secure_url}\n` +
        `📐 *Dimensions:* ${result.width}x${result.height}\n` +
        `⚡ *Ready to display in your portfolio!*`
      );
      return NextResponse.json({ ok: true });
    }

    // Video received
    if (msg.video) {
      const fileUrl = await getTelegramFileUrl(msg.video.file_id);
      const result = await cloudinary.uploader.upload(fileUrl, {
        folder: "ankit-escapes",
        resource_type: "video",
      });

      await sendTelegramMessage(
        chatId,
        `✅ *Video Uploaded to Cloudinary!*\n\n` +
        `🔗 *URL:* ${result.secure_url}\n` +
        `⚡ *Stream ready!*`
      );
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram Webhook Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
