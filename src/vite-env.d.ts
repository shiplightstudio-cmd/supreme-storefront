/// <reference types="vite/client" />

interface MidtransSnapResult {
  order_id?: string;
  transaction_status?: string;
  [key: string]: unknown;
}

interface MidtransSnapCallbacks {
  onSuccess?: (result: MidtransSnapResult) => void;
  onPending?: (result: MidtransSnapResult) => void;
  onError?: (result: MidtransSnapResult) => void;
  onClose?: () => void;
}

interface Window {
  snap?: {
    pay: (token: string, callbacks?: MidtransSnapCallbacks) => void;
  };
}
