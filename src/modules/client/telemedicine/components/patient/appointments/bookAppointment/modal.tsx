import { X } from "lucide-react";

export const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ isOpen, onClose, children, className = "max-w-md" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div
        className={`relative bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl w-full ${className} transform transition-all scale-100 overflow-hidden max-h-[90vh] flex flex-col`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-zinc-500 hover:text-zinc-100 transition-colors bg-zinc-900/50 rounded-full p-1"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
};
