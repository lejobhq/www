const config = {
  api: window.location.href.startsWith("http://localhost")
    ? "http://localhost:3001"
    : "https://lejobhq.appspot.com"
};

export default config;
