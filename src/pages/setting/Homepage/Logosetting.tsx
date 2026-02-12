import { useState, useEffect } from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import FileInput from "../../../components/form/input/FileInput";
import Button from "../../../components/ui/button/Button";
import { updateWebSetting } from "../../../utils/Handlerfunctions/formEditHandlers";
import { fetchWebSetting } from "../../../utils/Handlerfunctions/getdata";
import { toast } from "react-toastify";

const Logosetting = () => {
  const [groupName, setGroupName] = useState("");

  // 🔥 API images
  const [apiLogo, setApiLogo] = useState<string | null>(null);
  const [apiFavicon, setApiFavicon] = useState<string | null>(null);

  // 🔥 Local previews
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

  // 🔥 Files
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    loadWebSetting();
  }, []);

  const loadWebSetting = async () => {
    try {
      const data = await fetchWebSetting();
      setGroupName(data.WebTitle || "");
      setApiLogo(data.Logo || null);
      setApiFavicon(data.Favicon || null);
    } catch {
      toast.error("Failed to load web settings");
    }
  };

  /* ================= HANDLERS ================= */
  const handleLogoChange = (e: any) => {
    const file = e?.target?.files?.[0] || e;
    if (file instanceof File) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleFaviconChange = (e: any) => {
    const file = e?.target?.files?.[0] || e;
    if (file instanceof File) {
      setFaviconFile(file);
      setFaviconPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    if (!groupName.trim()) {
      toast.error("Group name is required");
      return;
    }

    try {
      const res = await updateWebSetting(groupName, logoFile, faviconFile);
      if (res?.success) {
        toast.success("Web setting updated successfully");

        // reload API data
        await loadWebSetting();

        // reset local previews
        setLogoPreview(null);
        setFaviconPreview(null);
        setLogoFile(null);
        setFaviconFile(null);
      }
    } catch {
      toast.error("Update failed");
    }
  };

  /* ================= UI ================= */
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
        <ComponentCard title="Site Logo & Group Name">
          <div className="space-y-6">
            {/* ===== LOGO PREVIEW ===== */}
            <Label>Current Logo preview:</Label>
            {(logoPreview || apiLogo) && (
              <div className="w-50 h-32 border rounded overflow-hidden">
                <img
                  src={logoPreview || apiLogo!}
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            <Label>
              Upload Logo <span className="text-red-500">*</span>
            </Label>
            <FileInput id="logoUpload" onChange={handleLogoChange} />

            {/* ===== GROUP NAME ===== */}
            <Label>
              Group Name <span className="text-red-500">*</span>
            </Label>
            <Input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />

            {/* ===== FAVICON PREVIEW ===== */}
            <Label>Current Favicon:</Label>
            {(faviconPreview || apiFavicon) && (
              <div className="w-50 h-32 border rounded overflow-hidden">
                <img
                  src={faviconPreview || apiFavicon!}
                  alt="Favicon"
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            <Label>
              Upload Favicon <span className="text-red-500">*</span>
            </Label>
            <FileInput id="faviconUpload" onChange={handleFaviconChange} />
          </div>
        </ComponentCard>
      </div>

      <Button
        className="mt-3 bg-green-600 hover:bg-green-700"
        onClick={handleUpdate}
      >
        Update
      </Button>
    </div>
  );
};

export default Logosetting;
