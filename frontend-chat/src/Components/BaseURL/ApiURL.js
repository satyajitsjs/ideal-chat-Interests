export default function ApiURL() {
  const apiUrl = `http://${process.env.REACT_APP_COMMON_URL}/api/`;
  return apiUrl;
}
