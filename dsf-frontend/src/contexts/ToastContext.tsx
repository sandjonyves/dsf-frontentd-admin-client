import { createContext, useContext, useRef, ReactNode } from 'react';
import { Toast } from 'primereact/toast';


interface ToastContextType {
  showToast: ShowToastFunction;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Créer un hook pour utiliser le contexte
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

interface ToastParams {
  message:string
  summary:string,
  severity?:string,
  life?:number
}

type ShowToastFunction = (params:ToastParams) => void;


export const ToastProvider = ({ children }: ToastProviderProps) => {
  const toast = useRef<Toast | null>(null);

  const showToast: ShowToastFunction = ({message, summary, severity = 'success', life = 3000}) => {
    // @ts-ignore
    toast.current?.show({ severity, summary, detail: message, life });
  };

  const contextValue: ToastContextType = {
    showToast,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Toast ref={toast} />
    </ToastContext.Provider>
  );
};
