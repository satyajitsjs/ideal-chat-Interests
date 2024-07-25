export default function WsURL() {
  const wsUrl = `ws://${process.env.REACT_APP_COMMON_URL}/ws/`;
  return wsUrl;
}

