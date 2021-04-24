const DEBOUNCE_INTERVAL = 300;

export const debounce = (callback, wait = DEBOUNCE_INTERVAL) => {
  let timeout = null;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), wait);
  };
};

export const valueWindowWidth = () => {
  const windowWidth = document.documentElement.clientWidth;

  if (windowWidth >= 320 && windowWidth < 480) return 'phone';
  if (windowWidth >= 480 && windowWidth < 768) return 'bigPhone';
  if (windowWidth >= 768 && windowWidth < 980) return 'tablet';
  if (windowWidth >= 980) return 'desktop';
};