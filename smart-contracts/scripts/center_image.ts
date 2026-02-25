import Jimp from "jimp";
import path from "path";

async function centerImage() {
    console.log("Reading the original image...");
    const imagePath = path.join(__dirname, "../../logos/xls_logo.png");
    const outPath = path.join(__dirname, "../../logos/xls_logo_centered.png");

    const image = await Jimp.read(imagePath);
    console.log(`Original Size: ${image.bitmap.width}x${image.bitmap.height}`);

    // Autocrop trims transparent borders to get the precise logo bounds
    image.autocrop();
    console.log(`Cropped Size: ${image.bitmap.width}x${image.bitmap.height}`);

    // Create a square background to center it
    const maxDim = Math.max(image.bitmap.width, image.bitmap.height);
    // Give it a tiny bit of uniform padding (5%)
    const canvasSize = Math.floor(maxDim * 1.05);

    const bg = new Jimp(canvasSize, canvasSize, 0x00000000); // Fully transparent

    // Calculate offsets to center 
    const x = Math.floor((canvasSize - image.bitmap.width) / 2);
    const y = Math.floor((canvasSize - image.bitmap.height) / 2);

    bg.composite(image, x, y);

    await bg.writeAsync(outPath);
    console.log(`Centered and saved as ${canvasSize}x${canvasSize} at ${outPath}`);
}

centerImage().catch(console.error);
