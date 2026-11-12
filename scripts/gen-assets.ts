import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT_DIR = '/home/z/my-project/public/images';

const ASSETS: Array<{ file: string; size: string; prompt: string }> = [
  {
    file: 'portrait.png',
    size: '768x1344',
    prompt:
      'Stylized 3D rendered character portrait of a confident young creative director, waist-up shot, arms crossed, wearing dark streetwear jacket with glowing neon purple accents and headphones around neck, dramatic neon purple and cyan rim lighting, isolated on pure solid black background, glossy cinematic 3D render, centered composition, high quality, detailed',
  },
  {
    file: 'ad-sneaker.png',
    size: '1024x1024',
    prompt:
      'Bold advertising poster visual for a neon sneaker launch, floating sneaker with purple and cyan neon light trails, splashes of glowing paint, dark background, energetic ad campaign visual, commercial photography, absolutely no text, no words, no letters, no typography, no labels, pure visual only, high quality, detailed',
  },
  {
    file: 'ad-perfume.png',
    size: '1024x1024',
    prompt:
      'Luxury perfume bottle advertising visual, floating glass bottle with magenta and purple neon glow, swirling smoke, gold accents, dark background, premium ad campaign photography, high quality, detailed',
  },
  {
    file: 'ad-energy.png',
    size: '1024x1024',
    prompt:
      'Energy drink can advertising poster, can with lime green neon label, liquid splashing frozen in motion, lime green and purple neon lighting, dark background, dynamic commercial photography, high quality',
  },
  {
    file: 'ad-fintech.png',
    size: '1024x1024',
    prompt:
      'Fintech mobile app advertisement visual, floating smartphone with holographic financial charts and coins rising from screen, cyan and purple neon glow, dark background, futuristic tech ad campaign, absolutely no text, no words, no letters, no numbers, no typography, pure visual only, high quality',
  },
  {
    file: 'ad-headphones.png',
    size: '1024x1024',
    prompt:
      'Wireless headphones product advertisement, floating headphones surrounded by glowing circular sound waves, purple and cyan neon light, dark background, premium commercial product visual, high quality',
  },
  {
    file: 'case-volt.png',
    size: '1344x768',
    prompt:
      'Advertising campaign case study cover for sneaker brand, dynamic sneaker exploding with neon purple light trails and lime energy sparks, dark background, bold commercial key visual, wide composition, high quality',
  },
  {
    file: 'case-aurea.png',
    size: '1344x768',
    prompt:
      'Advertising campaign case study cover for luxury perfume brand, elegant glass bottle in dramatic magenta and gold neon smoke, floating silk ribbons, dark background, cinematic commercial key visual, wide composition, high quality',
  },
  {
    file: 'case-orbit.png',
    size: '1344x768',
    prompt:
      'Advertising campaign case study cover for fintech app, futuristic 3D glowing rings orbiting around a smartphone, cyan and purple neon, floating data particles, dark background, tech commercial key visual, wide composition, high quality',
  },
  {
    file: 'float-star.png',
    size: '1024x1024',
    prompt:
      '3D chrome star burst shape with purple and lime neon rim glow, floating centered on pure solid black background, glossy render, high quality',
  },
  {
    file: 'float-sphere.png',
    size: '1024x1024',
    prompt:
      '3D glass sphere with swirling purple and cyan nebula inside, floating centered on pure solid black background, glossy render, high quality',
  },
  {
    file: 'float-bolt.png',
    size: '1024x1024',
    prompt:
      '3D chrome lightning bolt with lime neon glow, floating centered on pure solid black background, glossy render, high quality',
  },
  {
    file: 'float-ring.png',
    size: '1024x1024',
    prompt:
      '3D iridescent torus ring with purple cyan gradient reflections, floating centered on pure solid black background, glossy render, high quality',
  },
  {
    file: 'logo-3d.png',
    size: '1024x1024',
    prompt:
      'Giant 3D letter N logo emblem made of glowing neon purple glass with bright cyan core light and intense bloom glow, floating centered on pure solid black background, glossy cinematic render, high quality',
  },
  {
    file: 'noise-wide.png',
    size: '1440x720',
    prompt:
      'Conceptual advertising visual, crowd of identical gray matte silhouettes standing in rows, one single figure glowing with vibrant purple and lime neon light standing out from the crowd, dark background, cinematic wide shot, high quality',
  },
  {
    file: 'about-wide.png',
    size: '1344x768',
    prompt:
      'Abstract 3D scene of colorful megaphones, floating play buttons and social hearts with neon purple cyan and lime glow, confetti particles, dark background, playful creative agency visual, wide composition, high quality',
  },
];

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const zai = await ZAI.create();

  for (const asset of ASSETS) {
    const outPath = path.join(OUT_DIR, asset.file);
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 20000) {
      console.log(`skip (exists): ${asset.file}`);
      continue;
    }
    let done = false;
    for (let attempt = 1; attempt <= 3 && !done; attempt++) {
      try {
        const res = await zai.images.generations.create({
          prompt: asset.prompt,
          size: asset.size,
        });
        const b64 = res?.data?.[0]?.base64;
        if (!b64) throw new Error('empty base64');
        fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
        console.log(`ok: ${asset.file} (${Math.round(fs.statSync(outPath).size / 1024)} KB)`);
        done = true;
      } catch (e) {
        console.error(`attempt ${attempt} failed for ${asset.file}: ${e instanceof Error ? e.message : e}`);
        if (attempt < 3) await new Promise((r) => setTimeout(r, 2000 * attempt));
      }
    }
    if (!done) console.error(`FAILED: ${asset.file}`);
  }
  console.log('done');
}

main();
