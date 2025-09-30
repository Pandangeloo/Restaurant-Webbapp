import { useLocation } from "./index";
import Header from "./layout/Header";
import Main from "./layout/Main";
import Footer from "./layout/Footer";
import BootstrapBreakpoints from "./shared/BootstrapBreakpoints";

// turn off when not needed for debugging
const showBootstrapBreakpoints = true;

export default function App() {
  // scroll to top when the route changes
  useLocation();
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });

  return (
    <>
      <Header />
      <Main />
      <Footer />
      {showBootstrapBreakpoints ? <BootstrapBreakpoints /> : null}
    </>
  );
}
