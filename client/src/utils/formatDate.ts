export default function formatDate(date: Date): string {
  // Simple ISO fallback — replace with localized formatting as needed
  return date.toISOString();
}
