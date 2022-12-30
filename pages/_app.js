import { RecoilRoot } from "recoil";
import { AuthProvider } from "../hooks/useAuth";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </RecoilRoot>
  );
}
