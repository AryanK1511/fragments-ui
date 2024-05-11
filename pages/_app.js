import "@/styles/globals.css";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import '../aws_config';

export default function App({ Component, pageProps }) {
  return (
    <Theme
    appearance="dark"
  >
  <Component {...pageProps} />
  </Theme>);
}
