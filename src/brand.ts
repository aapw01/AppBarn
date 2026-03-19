function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function getBrandIconSvg(options?: {
  size?: number;
  title?: string;
  idPrefix?: string;
}): string {
  const size = options?.size ?? 64;
  const title = options?.title;
  const idPrefix = options?.idPrefix ?? 'appbarn-brand';
  const bgId = `${idPrefix}-bg`;
  const barnId = `${idPrefix}-barn`;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64" fill="none">
      ${title ? `<title>${escapeXml(title)}</title>` : ''}
      <defs>
        <linearGradient id="${bgId}" x1="11" y1="9" x2="53" y2="55" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FCFBF6" />
          <stop offset="1" stop-color="#E7F0E5" />
        </linearGradient>
        <linearGradient id="${barnId}" x1="18" y1="16" x2="46" y2="54" gradientUnits="userSpaceOnUse">
          <stop stop-color="#3C7740" />
          <stop offset="1" stop-color="#1D3420" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="52" height="52" rx="17" fill="url(#${bgId})" />
      <rect x="6.75" y="6.75" width="50.5" height="50.5" rx="16.25" stroke="#D7E1D3" stroke-width="1.5" />
      <path d="M18 28.5 32 16l14 12.5v19.25A5.25 5.25 0 0 1 40.75 53H23.25A5.25 5.25 0 0 1 18 47.75V28.5Z" fill="url(#${barnId})" />
      <path d="M18 28.5 32 16l14 12.5h-4.8L32 20.6l-9.2 7.9H18Z" fill="#4B8650" />
      <path d="M21 30.75h9.25V53h-4.6A4.65 4.65 0 0 1 21 48.35V30.75Z" fill="#2A4C2D" />
      <path d="M33.75 30.75H43v17.6A4.65 4.65 0 0 1 38.35 53h-4.6V30.75Z" fill="#35683A" />
      <path d="M32 30.75V53" stroke="#FBF8EF" stroke-width="2.5" stroke-linecap="round" />
      <rect x="23.35" y="23.15" width="4.6" height="4.6" rx="1.15" fill="#ECC56C" />
      <rect x="23.35" y="30.1" width="4.6" height="4.6" rx="1.15" fill="#ECC56C" />
      <rect x="36.05" y="23.15" width="4.6" height="4.6" rx="1.15" fill="#ECC56C" />
      <rect x="36.05" y="30.1" width="4.6" height="4.6" rx="1.15" fill="#ECC56C" />
      <path d="M24 40.25 29 45.25" stroke="#F6F0E4" stroke-width="2.25" stroke-linecap="round" />
      <path d="M29 40.25 24 45.25" stroke="#F6F0E4" stroke-width="2.25" stroke-linecap="round" opacity="0.92" />
      <path d="M40 40.25 35 45.25" stroke="#F6F0E4" stroke-width="2.25" stroke-linecap="round" />
      <path d="M35 40.25 40 45.25" stroke="#F6F0E4" stroke-width="2.25" stroke-linecap="round" opacity="0.92" />
      <circle cx="49.5" cy="18.5" r="4.5" fill="#F0D287" />
      <path d="M49.5 16v5" stroke="#7B5A16" stroke-width="1.2" stroke-linecap="round" />
      <path d="M47 18.5h5" stroke="#7B5A16" stroke-width="1.2" stroke-linecap="round" />
    </svg>
  `.trim();
}
