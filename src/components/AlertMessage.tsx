import { useState, useEffect } from "react";
import { CategoryType } from "../types/category";

type AlertMessageProps = {
  message: string | null;
  category: CategoryType;
  flashMessage: (message: string | null, category: CategoryType) => void;
};

export const AlertMessage = ({
  message,
  category,
  flashMessage,
}: AlertMessageProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const getAlertStyle = (category: CategoryType) => {
    switch (category) {
      case "primary":
        return "bg-blue-500 text-white";
      case "secondary":
        return "bg-gray-500 text-white";
      case "success":
        return "bg-green-500 text-white";
      case "danger":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-yellow-500 text-black";
      case "info":
        return "bg-indigo-500 text-white";
      case "light":
        return "bg-gray-200 text-black";
      case "dark":
        return "bg-gray-800 text-white";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleClose = () => {
    setIsVisible(false);
    flashMessage(null, null);
  };

  return isVisible ? (
    <div
      className={`w-fit rounded-full px-8 py-4 ${getAlertStyle(
        category
      )} absolute bottom-10 left-0.5 right-0.5 mx-auto flex items-center justify-center`}
      role="alert"
    >
      <span>{message}</span>
      <button
        onClick={handleClose}
        className="ml-4 rounded-full border border-transparent bg-transparent px-4 py-2 font-semibold text-white duration-200 hover:border-green-950 hover:text-green-950"
      >
        X
      </button>
    </div>
  ) : null;
};