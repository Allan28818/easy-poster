interface BasicMessageProps {
  showMessage: boolean;
  title: string;
  description: string;
  type: "success" | "warning" | "error" | "info";
  onConfirm: () => void;
}

export default BasicMessageProps;
