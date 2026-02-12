import  { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import FileInput from "../../components/form/input/FileInput";
import Button from "../../components/ui/button/Button";
import { getHero } from "../../utils/Handlerfunctions/getdata";
import { updateherosection } from "../../utils/Handlerfunctions/formEditHandlers";
import { toast } from "react-toastify";

const Herosection = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonLink, setButtonLink] = useState("");

  const [apiImage, setApiImage] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
    image: "",
  });

  useEffect(() => {
    loadHero();
  }, []);

  const loadHero = async () => {
    try {
      const res = await getHero();
      if (res?.success && res.data) {
        setTitle(res.data.title || "");
        setSubtitle(res.data.subtitle || "");
        setButtonText(res.data.button_text || "");
        setButtonLink(res.data.button_link || "");
        setApiImage(res.data.background_image || null);
        setFilePreview(null);
      }
    } catch (err) {
      toast.error("Failed to load hero data");
    }
  };

  const validateFields = () => {
    const newErrors: any = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!subtitle.trim()) newErrors.subtitle = "Subtitle is required";
    if (!buttonText.trim()) newErrors.buttonText = "Button text is required";
    if (!buttonLink.trim()) newErrors.buttonLink = "Button link is required";
    if (!filePreview && !apiImage) newErrors.image = "Background image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReceiptChange = (e: any) => {
    const selectedFile = e?.target?.files?.[0] || e;
    if (selectedFile instanceof File) {
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
      setErrors({ ...errors, image: "" });
    }
  };

  const handleUpdate = async () => {
    if (!validateFields()) return;

    try {
      setLoading(true);

      const res = await updateherosection({
        title,
        subtitle,
        button_text: buttonText,
        button_link: buttonLink,
        background_image: file,
      });

      if (res?.success) {
        toast.success(res.message || "Hero updated successfully");
        loadHero();
        setFile(null);
      }
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
        <div className="space-y-6">
          <ComponentCard title="Hero Section">
            <div className="space-y-6">

              {/* Title */}
              <div>
                <Label>
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setErrors({ ...errors, title: "" });
                  }}
                />
                {errors.title && (
                  <span className="text-xs text-red-500 mt-1 block">
                    {errors.title}
                  </span>
                )}
              </div>

              {/* Subtitle */}
              <div>
                <Label>
                  Subtitle <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={subtitle}
                  onChange={(e) => {
                    setSubtitle(e.target.value);
                    setErrors({ ...errors, subtitle: "" });
                  }}
                />
                {errors.subtitle && (
                  <span className="text-xs text-red-500 mt-1 block">
                    {errors.subtitle}
                  </span>
                )}
              </div>

              {/* Button Text */}
              <div>
                <Label>
                  Button Text <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={buttonText}
                  onChange={(e) => {
                    setButtonText(e.target.value);
                    setErrors({ ...errors, buttonText: "" });
                  }}
                />
                {errors.buttonText && (
                  <span className="text-xs text-red-500 mt-1 block">
                    {errors.buttonText}
                  </span>
                )}
              </div>

              {/* Button Link */}
              <div>
                <Label>
                  Button Link <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={buttonLink}
                  onChange={(e) => {
                    setButtonLink(e.target.value);
                    setErrors({ ...errors, buttonLink: "" });
                  }}
                />
                {errors.buttonLink && (
                  <span className="text-xs text-red-500 mt-1 block">
                    {errors.buttonLink}
                  </span>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <Label>
                  Upload Background Image <span className="text-red-500">*</span>
                </Label>

                <FileInput id="fileUpload" onChange={handleReceiptChange} />

                {(filePreview || apiImage) && (
                  <div className="mt-2 w-40 h-40 border rounded overflow-hidden">
                    <img
                      src={filePreview || apiImage!}
                      alt="Hero Preview"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/no-image.png";
                      }}
                    />
                  </div>
                )}

                {errors.image && (
                  <span className="text-xs text-red-500 mt-1 block">
                    {errors.image}
                  </span>
                )}
              </div>

            </div>
          </ComponentCard>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Button onClick={handleUpdate} disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </div>
    </div>
  );
};

export default Herosection;
