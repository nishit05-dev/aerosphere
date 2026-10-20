import { CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { useFlight } from '../context/useFlight';

export function Toast() {
  const { toast } = useFlight();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isWarning = toast.type === 'warning';

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 1000,
      background: '#172D46',
      border: `1px solid ${isSuccess ? '#39796B' : isWarning ? '#B98245' : '#234368'}`,
      boxShadow: '0 8px 24px rgba(23, 45, 70, 0.25)',
      borderRadius: '8px',
      padding: '12px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      maxWidth: '380px',
      animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      {isSuccess && <CheckCircle size={18} color="#39796B" />}
      {isWarning && <AlertTriangle size={18} color="#B98245" />}
      {!isSuccess && !isWarning && <Info size={18} color="#CBD5E1" />}

      <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.4 }}>
        {toast.message}
      </span>
    </div>
  );
}
