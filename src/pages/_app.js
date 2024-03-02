import Layout from "@/components/layout/layout";
import "../styles/globals.css";

function myApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default myApp;
