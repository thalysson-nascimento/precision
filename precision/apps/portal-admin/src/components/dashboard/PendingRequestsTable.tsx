import React from 'react';
import { PendingRequest } from '@/types';

interface PendingRequestsTableProps {
  requests: PendingRequest[];
  searchTerm: string;
  onSearchClear: () => void;
  actionLoading: string | null;
  bulkLoading: boolean;
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
  onBulkApprove: () => void;
  loading: boolean;
}

const getInitials = (name: string) => {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export const PendingRequestsTable: React.FC<PendingRequestsTableProps> = ({
  requests,
  searchTerm,
  onSearchClear,
  actionLoading,
  bulkLoading,
  onApprove,
  onReject,
  onBulkApprove,
  loading,
}) => {
  return (
    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm flex flex-col mb-xl relative overflow-hidden min-h-[300px]">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="animate-spin material-symbols-outlined text-primary text-[32px]">progress_activity</span>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-md mb-md">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">Colaboradores com Pendências</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Ajustes manuais e justificativas aguardando validação do RH.</p>
            </div>
            <button 
              onClick={onBulkApprove}
              disabled={bulkLoading || requests.length === 0}
              className="bg-primary text-on-primary font-label-caps text-label-caps px-md py-sm rounded-lg hover:bg-primary/95 disabled:bg-outline-variant disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-xs shadow-sm"
            >
              {bulkLoading ? (
                <>
                  <span className="animate-spin material-symbols-outlined text-[18px]">progress_activity</span>
                  <span>PROCESSANDO...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">done_all</span>
                  <span>RESOLVER EM MASSA</span>
                </>
              )}
            </button>
          </div>

          {/* Table search filter warning/status */}
          {searchTerm && (
            <div className="text-body-sm text-on-surface-variant mb-sm flex items-center gap-xs">
              <span className="material-symbols-outlined text-[18px]">filter_alt</span>
              <span>Filtrando por &quot;{searchTerm}&quot; ({requests.length} resultados)</span>
              <button onClick={onSearchClear} className="text-primary hover:underline ml-xs">Limpar</button>
            </div>
          )}

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low text-on-surface-variant font-label-caps text-label-caps">
                  <th className="py-sm px-md font-semibold">COLABORADOR</th>
                  <th className="py-sm px-md font-semibold">DATA</th>
                  <th className="py-sm px-md font-semibold">TIPO DE PENDÊNCIA</th>
                  <th className="py-sm px-md font-semibold">JUSTIFICATIVA</th>
                  <th className="py-sm px-md font-semibold text-right">AÇÕES</th>
                </tr>
              </thead>
              <tbody className="font-body-sm text-body-sm text-on-surface">
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-xl text-on-surface-variant">
                      {searchTerm ? 'Nenhum colaborador encontrado com esta busca.' : 'Nenhuma pendência aguardando validação.'}
                    </td>
                  </tr>
                ) : (
                  requests.map((req) => (
                    <tr key={req.id} className="border-b border-surface-variant hover:bg-surface-bright transition-colors">
                      <td className="py-md px-md flex items-center gap-sm">
                        {req.employee.email === 'luciana@example.com' ? (
                          <img 
                            className="w-8 h-8 rounded-full object-cover bg-surface-variant border border-outline-variant" 
                            alt="Avatar" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ0bZ_-2Jgk-9IIZ-MSl2JzcfECAZTzfxycpBHQiAjoGdJMKGWDQT9eYDWlcSNwAWkX3fMZEJW8Uc-XDQ90dyGzfv8KZ2e36XnL-n4icqOajQ04e--AmNnBSuOA6tf_B4GsIwDyeQ6Uco11Hf9HPFOcagiCTw9flxbzsTv2KQyh-yyQEX5Gre9eUlJLG-pPREVUncQjYjXjg22c_ekTCokuCQ9enpkEI_U2YvUg_Gzz8LQUls70VJ8xQ"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20">
                            {getInitials(req.employee.name)}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-semibold">{req.employee.name}</span>
                          <span className="text-[10px] text-on-surface-variant">{req.employee.role}</span>
                        </div>
                      </td>
                      
                      <td className="py-md px-md">
                        {req.date.split('-').reverse().join('/')}
                      </td>
                      
                      <td className="py-md px-md">
                        {req.type === 'ESQUECIMENTO DE SAÍDA' && (
                          <span className="bg-error-container text-on-error-container font-label-caps text-[11px] px-2 py-1 rounded-md font-bold">ESQUECIMENTO DE SAÍDA</span>
                        )}
                        {req.type === 'ATESTADO MÉDICO' && (
                          <span className="bg-surface-variant text-on-surface font-label-caps text-[11px] px-2 py-1 rounded-md font-bold">ATESTADO MÉDICO</span>
                        )}
                        {req.type.includes('AJUSTE') && (
                          <span className="bg-tertiary-container/20 text-tertiary font-label-caps text-[11px] px-2 py-1 rounded-md font-bold">{req.type}</span>
                        )}
                      </td>
                      
                      <td className="py-md px-md text-on-surface-variant max-w-[250px] truncate" title={req.justification}>
                        {req.attachment ? (
                          <button 
                            onClick={() => alert(`Visualizando anexo: ${req.attachment}\nJustificativa: ${req.justification}`)}
                            className="text-primary hover:underline font-semibold flex items-center gap-xs"
                          >
                            <span className="material-symbols-outlined text-[16px]">attachment</span> {req.attachment}
                          </button>
                        ) : (
                          req.justification
                        )}
                      </td>
                      
                      <td className="py-md px-md text-right">
                        {actionLoading === req.id ? (
                          <span className="animate-spin material-symbols-outlined text-primary text-[20px] mr-sm">progress_activity</span>
                        ) : (
                          <>
                            <button 
                              onClick={() => onApprove(req.id)}
                              className="text-secondary hover:bg-secondary/10 p-xs rounded-md transition-colors mr-xs" 
                              title="Aprovar"
                            >
                              <span className="material-symbols-outlined text-[22px]">check_circle</span>
                            </button>
                            <button 
                              onClick={() => onReject(req.id)}
                              className="text-error hover:bg-error-container/30 p-xs rounded-md transition-colors" 
                              title="Rejeitar"
                            >
                              <span className="material-symbols-outlined text-[22px]">cancel</span>
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};
