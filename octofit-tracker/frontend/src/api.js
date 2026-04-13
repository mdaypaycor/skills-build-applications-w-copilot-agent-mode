const resolveApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location;

    if (hostname.endsWith('-3000.app.github.dev')) {
      return `${protocol}//${hostname.replace('-3000.app.github.dev', '-8000.app.github.dev')}`;
    }

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:8000';
    }
  }

  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  return codespace ? `https://${codespace}-8000.app.github.dev` : 'http://localhost:8000';
};

export const apiBaseUrl = resolveApiBaseUrl();

export const getApiEndpoint = (path) => `${apiBaseUrl}${path}`;