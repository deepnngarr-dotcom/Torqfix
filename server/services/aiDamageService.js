import { ssim } from 'ssim.js';
import { createCanvas, loadImage } from 'canvas';

export const analyzeToolDamage = async (preImagePath, postImageData) => {
  // 1. Load the pre-rental baseline and the new return photo
  const img1 = await loadImage(preImagePath);
  const img2 = await loadImage(postImageData);

  // 2. Normalization: Ensure both images are compared at the same scale
  const canvas = createCanvas(img1.width, img1.height);
  const ctx = canvas.getContext('2d');
  
  ctx.drawImage(img1, 0, 0);
  const data1 = ctx.getImageData(0, 0, img1.width, img1.height);
  
  ctx.clearRect(0, 0, img1.width, img1.height);
  ctx.drawImage(img2, 0, 0, img1.width, img1.height);
  const data2 = ctx.getImageData(0, 0, img1.width, img1.height);

  // 3. Compute Structural Similarity Index
  const { mssim } = ssim(data1, data2);
  
  // Threshold Logic: SSIM > 0.90 typically indicates no significant change
  return {
    score: mssim,
    isDamaged: mssim < 0.92 // 92% similarity threshold for engineering tools
  };
};