import axios from 'axios';

export async function uploadToS3(
  imageFile: File,
  s3Url: string
): Promise<{ success: true; url: string } | { success: false; url: null }> {
  const response = await axios.put(s3Url, imageFile, { headers: { 'Content-Type': imageFile.type } });

  if (response.config.url && (response.status === 200 || response.status === 201)) {
    // console.log(response.config.url.split('?')[0]);
    return {
      success: true,
      url: response.config.url?.split('?')[0],
    };
  }
  return { success: false, url: null };
}
