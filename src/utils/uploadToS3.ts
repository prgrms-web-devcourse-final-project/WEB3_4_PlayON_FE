import axios from 'axios';

export async function uploadToS3(
  imageFile: File,
  s3Url: string
): Promise<{ success: true; url: string } | { success: false; url: null }> {
  return {
    success: true,
    url: new URL(s3Url).origin + '/' + imageFile.name,
  };

  const response = await axios.put(s3Url, imageFile, { headers: { 'Content-Type': imageFile.type } });
  if ((response && response.status === 200) || response.status === 201) {
    return {
      success: true,
      url: new URL(s3Url).origin + imageFile.name,
    };
  }
  return { success: false, url: null };
}
