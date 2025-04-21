import React, { useState, useRef } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [uploadMethod, setUploadMethod] = useState<"upload" | "github">("upload");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      toast({
        title: "File selected",
        description: `Selected: ${e.target.files[0].name}`,
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would handle the project creation logic
    console.log({
      projectName,
      description,
      uploadMethod,
      selectedFile,
    });
    
    toast({
      title: "Project analysis started",
      description: "Your code is being analyzed...",
    });
    
    onClose();
  };

  const handleCancel = () => {
    // Reset form state
    setProjectName("");
    setDescription("");
    setSelectedFile(null);
    // Close modal
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[822px] flex flex-col gap-[30px] bg-white p-[30px] rounded-lg border-none max-md:w-[90%] max-md:p-5 max-sm:w-[95%] max-sm:p-[15px]">
        <DialogTitle className="text-lg font-semibold text-[#15AE88]">
          Add New Project
        </DialogTitle>
        
        <DialogDescription className="sr-only">
          Add a new project by uploading code or linking to GitHub
        </DialogDescription>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10 max-md:gap-5 max-sm:gap-[15px]">
          <div className="flex flex-col gap-1.5 max-md:gap-1 max-sm:gap-[3px]">
            <label className="text-sm text-[#1C1C1C]">Project Name</label>
            <input
              type="text"
              placeholder="Eg. IRCTC"
              className="text-sm text-[rgba(81,77,77,0.64)] w-full h-[50px] border shadow-[0_1px_2px_rgba(228,229,231,0.24)] bg-white p-3 rounded-[10px] border-solid border-[#D4D5D7]"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5 max-md:gap-1 max-sm:gap-[3px]">
            <label className="text-sm text-[#1C1C1C]">Description</label>
            <textarea
              placeholder="Tell about the project"
              className="text-sm text-[rgba(81,77,77,0.64)] w-full h-[100px] border shadow-[0_1px_2px_rgba(228,229,231,0.24)] bg-white p-3 rounded-[10px] border-solid border-[#D4D5D7]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5 max-md:gap-1 max-sm:gap-[3px]">
            <label className="text-sm text-[#1C1C1C]">Source Code</label>
            <div className="flex flex-col gap-[17px]">
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="sourceCode"
                  checked={uploadMethod === "upload"}
                  onChange={() => setUploadMethod("upload")}
                  className="hidden"
                  id="upload"
                />
                <label
                  htmlFor="upload"
                  className="flex items-center gap-2.5 w-full cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect
                      x="0.75"
                      y="0.75"
                      width="16.5"
                      height="16.5"
                      rx="8.25"
                      fill="white"
                      stroke="#00C487"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="9"
                      cy="9"
                      r="4"
                      fill={
                        uploadMethod === "upload" ? "#15AE88" : "transparent"
                      }
                    />
                  </svg>
                  <div
                    onClick={uploadMethod === "upload" ? triggerFileInput : undefined}
                    className={`text-sm font-medium flex items-center justify-center ${uploadMethod === "upload" ? "text-[#00C487] cursor-pointer" : "text-[rgba(81,77,77,0.64)]"} w-full h-[50px] border shadow-[0_1px_2px_rgba(228,229,231,0.24)] bg-white p-3 rounded-[10px] border-solid ${uploadMethod === "upload" ? "border-[#15AE88]" : "border-[#D4D5D7]"}`}
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    {selectedFile ? selectedFile.name : "Upload or Drop Source Code"}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".zip,.rar,.tar.gz,.7z"
                    />
                  </div>
                </label>
              </div>

              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="sourceCode"
                  checked={uploadMethod === "github"}
                  onChange={() => setUploadMethod("github")}
                  className="hidden"
                  id="github"
                />
                <label
                  htmlFor="github"
                  className="flex items-center gap-2.5 w-full cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle
                      cx="9"
                      cy="9"
                      r="8.25"
                      fill="white"
                      stroke="#00C487"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="9"
                      cy="9"
                      r="4"
                      fill={
                        uploadMethod === "github" ? "#15AE88" : "transparent"
                      }
                    />
                  </svg>
                  <div
                    className={`w-full h-[50px] border shadow-[0_1px_2px_rgba(228,229,231,0.24)] flex items-center ${uploadMethod === "github" ? "" : "opacity-50"} bg-white p-3 rounded-[10px] border-solid ${uploadMethod === "github" ? "border-[#15AE88]" : "border-[#D4D5D7]"}`}
                  >
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/717e2c02e279c11f71d776706810348df492f843?placeholderIfAbsent=true" alt="" className="w-[34px] h-[46px]" />
                    <span className="text-sm text-[rgba(81,77,77,0.64)]">
                      Paste Github link
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end max-md:flex-col max-md:gap-2.5 max-sm:flex-col max-sm:gap-2">
            <Button
              type="button"
              onClick={handleCancel}
              className="text-base font-semibold text-[#797979] w-[200px] h-14 shadow-[0_1px_2px_rgba(82,88,102,0.06)] border rounded-lg border-solid border-[#797979]"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={`text-base font-semibold text-white w-[200px] h-14 shadow-[0_1px_2px_rgba(82,88,102,0.06)] ${projectName.trim() ? "bg-[#15AE88]" : "bg-[rgba(21,174,136,0.4)]"} rounded-lg`}
              disabled={!projectName.trim()}
            >
              Analyse Code
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
