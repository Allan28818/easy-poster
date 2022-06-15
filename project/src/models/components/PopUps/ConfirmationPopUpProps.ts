import React, { ReactNode } from "react";

interface ConfirmationPopUpProps {
  title: string;
  description?: string;
  type: "warning" | "error" | "success" | "info";
  showMessage: boolean;
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
  buttonsText: {
    confirmation: string;
    cancel: string;
  };
  onConfirm: () => Promise<void>;
}

export default ConfirmationPopUpProps;
