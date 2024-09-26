import { useMediaQuery } from "react-responsive"

export const useDesktopMediaQuery = () => useMediaQuery({
  query: '(min-width: 1224px)'
});
export const usePortraitMediaQuery = () => useMediaQuery({ query: '(orientation: portrait)' });