// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
// import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx"; /////////
import { useEffect } from "react";
import { fetchWebSetting } from "./utils/Handlerfunctions/getdata.ts";
import { BrowserRouter } from "react-router-dom";
import { WebSettingsProvider } from "./context/WebSettingsContext.tsx";
function WebSettingsUpdater() {
  useEffect(() => {
    fetchWebSetting().then((data) => {
      if (data?.Favicon) {
        let link: HTMLLinkElement | null =
          document.querySelector("link[rel~='icon']");
        if (!link) {
          link = document.createElement("link");
          link.rel = "icon";
          document.head.appendChild(link);
        }
        link.href = data.Favicon;
      }

      if (data?.title) {
        document.title = data.title;
      }
    });
  }, []);

  return null;
}

createRoot(document.getElementById("root")!).render(
  <>
    {/* <StrictMode> */}
    <ThemeProvider>
      {/* <AppWrapper> */}
      <BrowserRouter >
        <WebSettingsUpdater />
        <WebSettingsProvider>
          <App />
        </WebSettingsProvider>
      </BrowserRouter>
      {/* </AppWrapper> */}
    </ThemeProvider>
    {/* </StrictMode>, */}
  </>,
);
