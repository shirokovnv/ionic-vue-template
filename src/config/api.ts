export default {
  baseURL: 'https://jsonplaceholder.typicode.com/',
  localURL: 'http://localhost:8000',

  authURL() {
    return `${this.localURL}/api/auth`;
  },
};
