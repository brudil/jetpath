const settings = {};

settings.lowdownHost = (() => {
  if (
    process.env.NODE_ENV === 'production' ||
    window.localStorage.getItem('useProductionLowdownEndpoint') === 'true'
  ) {
    return 'https://platform.theprate.com';
  }

  return 'http://localhost:4444';
})();

export default settings;
