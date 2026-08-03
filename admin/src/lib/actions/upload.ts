"use server";

import crypto from 'crypto';

export async function uploadCoverImage(formData: FormData) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
    const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
    const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error("Cloudinary credentials are not fully configured.");
    }

    const file = formData.get('file') as File;
    if (!file) {
      throw new Error("No file provided");
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error("File must be smaller than 5MB");
    }

    // 1. Generate Cloudinary Signature
    const timestamp = Math.round(new Date().getTime() / 1000).toString();
    const signatureString = `timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(signatureString).digest('hex');

    // 2. Prepare FormData for direct REST API call
    const cloudinaryForm = new FormData();
    cloudinaryForm.append("file", file);
    cloudinaryForm.append("api_key", apiKey);
    cloudinaryForm.append("timestamp", timestamp);
    cloudinaryForm.append("signature", signature);

    // 3. Upload via Native Fetch
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    
    const response = await fetch(url, {
      method: "POST",
      body: cloudinaryForm,
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Cloudinary API Error Response:", result);
      throw new Error(result.error?.message || `Cloudinary rejected the upload: ${response.status}`);
    }

    return { success: true, url: result.secure_url };
  } catch (error: any) {
    console.error("Upload Action Error:", error);
    return { success: false, error: error.message || "Upload failed. Check your Cloudinary credentials." };
  }
}
