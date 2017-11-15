function getHost(): string {
  if (
    process.env.NODE_ENV === 'production' ||
    window.localStorage.getItem('useProductionLowdownEndpoint') === 'true'
  ) {
    return 'https://platform.thedrab.co';
  }

  return 'http://localhost:8000';
}

const settings = {
  lowdownHost: getHost(),
};

export default settings;
