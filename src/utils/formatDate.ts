// 날짜 포맷팅 함수
export default function formatDate(targetDate: Date) {
  return targetDate.toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
