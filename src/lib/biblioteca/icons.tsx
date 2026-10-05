const ICON_PATHS: Record<string, string> = {
  search: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.2" y2="16.2"/>',
  close: '<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>',
  heart: '<path d="M12 20.5s-7.5-4.6-10-9.3C.5 8 2 4.5 5.6 4c2.1-.3 4 .8 6.4 3.2C14.4 4.8 16.3 3.7 18.4 4c3.6.5 5.1 4 3.6 7.2C19.5 15.9 12 20.5 12 20.5Z"/>',
  chevronLeft: '<polyline points="15 18 9 12 15 6"/>',
  chevronRight: '<polyline points="9 18 15 12 9 6"/>',
  chevronDown: '<polyline points="6 9 12 15 18 9"/>',
  menu: '<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>',
  home: '<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9.5a.5.5 0 0 0 .5.5H10v-6h4v6h3.5a.5.5 0 0 0 .5-.5V10"/>',
  grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>',
  bookmark: '<path d="M6 3.5h12a.5.5 0 0 1 .5.5v16.2c0 .4-.44.63-.77.4L12 16l-5.73 4.6a.5.5 0 0 1-.77-.4V4a.5.5 0 0 1 .5-.5Z"/>',
  user: '<circle cx="12" cy="8" r="3.5"/><path d="M4.5 20c1-4 4-6 7.5-6s6.5 2 7.5 6"/>',
  leaf: '<path d="M20 4.5c.6 7-2.4 12.6-8 15C6 21.6 3.4 16 4.5 9.5 9 7 14.5 5 20 4.5Z"/><path d="M6 18c3-4.5 6-7.5 12-11.5"/>',
  shoppingBag: '<path d="M6.5 8h11l1 12.5h-13L6.5 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
  capsule: '<rect x="3.5" y="9" width="17" height="6" rx="3" transform="rotate(-35 12 12)"/><line x1="10.2" y1="7.2" x2="13.8" y2="16.8" transform="rotate(-35 12 12)"/>',
  compass: '<circle cx="12" cy="12" r="8.5"/><path d="M14.8 9.2 13 13l-3.8 1.8L11 11l3.8-1.8Z"/>',
  chefHat: '<path d="M7 11.5a3.5 3.5 0 0 1 1-6.7 3.9 3.9 0 0 1 7.3-1.7 3.3 3.3 0 0 1 4.2 4.4A3.5 3.5 0 0 1 17 11.5"/><path d="M7 11v6.5h10V11"/><line x1="6.5" y1="20.5" x2="17.5" y2="20.5"/>',
  bookOpen: '<path d="M12 6.2c-1.6-1.2-4.6-1.7-7-1.2v12.5c2.4-.5 5.4 0 7 1.2 1.6-1.2 4.6-1.7 7-1.2V5c-2.4-.5-5.4 0-7 1.2Z"/><line x1="12" y1="6.2" x2="12" y2="18.7"/>',
  checkCircle: '<circle cx="12" cy="12" r="8.5"/><polyline points="8.3 12.3 10.8 14.8 15.7 9.5"/>',
  alertCircle: '<circle cx="12" cy="12" r="8.5"/><line x1="12" y1="7.5" x2="12" y2="13"/><circle cx="12" cy="16.2" r="0.6" fill="currentColor" stroke="none"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><line x1="12" y1="11" x2="12" y2="16.3"/><circle cx="12" cy="8" r="0.6" fill="currentColor" stroke="none"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><polyline points="12 7.3 12 12 15.5 14"/>',
  sparkles: '<path d="M12 3.5 13.4 9 19 10.4 13.4 11.8 12 17.3 10.6 11.8 5 10.4 10.6 9Z"/><path d="M19 15.5 19.6 18 22 18.6 19.6 19.2 19 21.5 18.4 19.2 16 18.6 18.4 18Z"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  pencil: '<path d="M15.2 4.8 19.2 8.8 8 20H4v-4Z"/><line x1="13.5" y1="6.5" x2="17.5" y2="10.5"/>',
  trash: '<polyline points="4.5 7 6 7 19.5 7"/><path d="M9 7V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v2"/><path d="M7.5 7 8.3 19a1.5 1.5 0 0 0 1.5 1.4h4.4a1.5 1.5 0 0 0 1.5-1.4L16.5 7"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.7"/>',
  star: '<path d="M12 4 14.5 9.6 20.5 10.3 16 14.3 17.3 20.3 12 17.1 6.7 20.3 8 14.3 3.5 10.3 9.5 9.6Z"/>',
  arrowRight: '<line x1="4" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/>',
  droplet: '<path d="M12 3.5s6.5 7 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10.5 12 3.5 12 3.5Z"/>',
  scale: '<line x1="12" y1="3.5" x2="12" y2="20.5"/><line x1="5" y1="7" x2="19" y2="7"/><path d="M5 7 2.5 12.5a2.5 2.5 0 0 0 5 0Z"/><path d="M19 7 16.5 12.5a2.5 2.5 0 0 0 5 0Z"/><path d="M9 20.5h6"/>',
  apple: '<path d="M12 8.2c1.6-2.2 5-2 6 .3 1.3 3-1 8.6-3.6 10.9-1 .9-1.8.9-2.4.9s-1.4 0-2.4-.9C7 17 4.7 11.4 6 8.5c1-2.3 4.4-2.5 6-.3Z"/><path d="M12 8.2c-.2-1.6.5-3 1.8-4"/>',
  filter: '<line x1="4" y1="6" x2="20" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>',
  logout: '<path d="M9 20.5H5.5a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1H9"/><line x1="20.5" y1="12" x2="10.5" y2="12"/><polyline points="16.5 8 20.5 12 16.5 16"/>',
  utensils: '<path d="M7 3v7a1.5 1.5 0 0 0 1.5 1.5H8V21"/><line x1="6" y1="3" x2="6" y2="9.5"/><line x1="10" y1="3" x2="10" y2="9.5"/><path d="M16.5 3s-2 1.6-2 5 2 4 2 4v9"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H10a1.7 1.7 0 0 0 1-1.6V4a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V10a1.7 1.7 0 0 0 1.6 1H20a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.6 1Z"/>',
  layers: '<polygon points="12 3.5 21 8 12 12.5 3 8"/><polyline points="3 13 12 17.5 21 13"/><polyline points="3 18 12 22.5 21 18"/>',
  package: '<path d="M4 7.5 12 3.5l8 4v9L12 20.5l-8-4Z"/><polyline points="4 7.5 12 11.5 20 7.5"/><line x1="12" y1="11.5" x2="12" y2="20.5"/>',
  camera: '<path d="M4 8.5a1 1 0 0 1 1-1h2.2l1-1.8a1 1 0 0 1 .9-.5h5.8a1 1 0 0 1 .9.5l1 1.8H19a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"/><circle cx="12" cy="13" r="3.6"/>',
};

export function Icon({
  name,
  size = 20,
  className = '',
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const body = ICON_PATHS[name] || '';
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}
