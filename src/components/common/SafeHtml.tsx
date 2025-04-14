import DOMPurify from 'dompurify';

export default function SafeHtml({ html, className }: { html: string; className?: string }) {
  const safeHtml = DOMPurify.sanitize(html, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
  });
  return <div className={className} dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}
