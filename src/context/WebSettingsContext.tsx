import { createContext, useContext, useEffect, useState } from "react";
import { fetchWebSetting } from "../utils/Handlerfunctions/getdata";

type WebSettings = {
  logo: string | null;
  favicon: string | null;
  title: string | null;
};

const WebSettingsContext = createContext<WebSettings>({
  logo: null,
  favicon: null,
  title: null,
});

export const WebSettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [settings, setSettings] = useState<WebSettings>({
    logo: null,
    favicon: null,
    title: null,
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await fetchWebSetting();

        if (!data) return;

        // ✅ UPDATE CONTEXT STATE
        setSettings({
          logo: data.Logo || null,
          favicon: data.Favicon || null,
          title: data.WebTitle || null,
        });

        // ✅ Update favicon
        if (data.Favicon) {
          let link =
            document.querySelector<HTMLLinkElement>("link[rel~='icon']");

          if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.head.appendChild(link);
          }

          link.href = data.Favicon;
        }

        // ✅ Update title
        if (data.WebTitle) {
          document.title = data.WebTitle;
        }
      } catch (err) {
        console.error("Failed to load web settings", err);
      }
    };

    loadSettings();
  }, []);

  return (
    <WebSettingsContext.Provider value={settings}>
      {children}
    </WebSettingsContext.Provider>
  );
};

export const useWebSettings = () => useContext(WebSettingsContext);
