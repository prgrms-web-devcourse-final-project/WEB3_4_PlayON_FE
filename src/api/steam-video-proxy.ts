import fetch from 'node-fetch';

export default async function handler(req, res) {
  const videoUrl = req.query.url;

  if (!videoUrl || typeof videoUrl !== 'string' || !videoUrl.startsWith('http://')) {
    return res.status(400).json({ error: '유효한 비디오 URL이 필요합니다' });
  }

  try {
    const response = await fetch(videoUrl);

    if (!response.ok || !response.body) {
      throw new Error('비디오 요청 실패');
    }

    res.setHeader('Content-Type', 'video/mp4');

    response.body.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '프록시 처리 중 에러 발생' });
  }
}
