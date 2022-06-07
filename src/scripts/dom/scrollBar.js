const _getWidth = () => {
  const documentWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
};

const getScrollTop = () => {
  return window.scrollY;
};

const hide = (width = _getWidth()) => {
  _disableOverFlow();
  document.body.style.paddingRight = width;
};

const reset = () => {
  document.body.style.overflow = 'auto';
  document.body.style.paddingRight = 0;
};
const _disableOverFlow = () => {
  document.body.style.overflow = 'hidden';
};

export { hide, reset, getScrollTop };
