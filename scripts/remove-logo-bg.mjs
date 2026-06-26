import sharp from "sharp";

const SRC = "/Users/ramsmac/Downloads/WhatsApp Image 2026-05-06 at 2.47.38 PM.png";
const DST = "/Users/ramsmac/Desktop/sun-prime-energy/public/logo.png";

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

// For each pixel, compute alpha based on "distance from white".
// max(255-r, 255-g, 255-b) is 0 for pure white, 255 for fully saturated colors.
// We use a soft threshold so anti-aliased edges fade cleanly instead of jagging.
const LOW = 8;   // below this = pure white = alpha 0
const HIGH = 28; // above this = solid color = alpha 255

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const t = Math.max(255 - r, 255 - g, 255 - b);

  let alpha;
  if (t < LOW) alpha = 0;
  else if (t > HIGH) alpha = 255;
  else alpha = Math.round(((t - LOW) / (HIGH - LOW)) * 255);

  data[i + 3] = alpha;
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim() // remove transparent borders so the logo fills its frame
  .resize({ width: 600 })
  .png({ compressionLevel: 9 })
  .toFile(DST);

console.log(`Wrote ${DST}`);
