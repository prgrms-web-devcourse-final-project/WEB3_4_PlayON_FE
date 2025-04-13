export default function removeHtmlTags(content: string) {
  if (!content) return;

  // HTML 태그 제거 (줄바꿈 태그는 공백으로 변환)
  let plainText = content
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/p>/gi, ' ')
    .replace(/<\/div>/gi, ' ')
    .replace(/<\/li>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' '); // HTML 엔티티도 처리

  // 연속된 공백을 하나로 줄이기
  plainText = plainText.replace(/\s+/g, ' ').trim();

  return plainText;
  // return plainText.substring(0, 100);
}
