import React from 'react';
import { RecentActivity } from '@/types';

interface RecentActivitiesListProps {
  activities: RecentActivity[] | undefined;
  loading: boolean;
}

export const RecentActivitiesList: React.FC<RecentActivitiesListProps> = ({
  activities,
  loading,
}) => {
  return (
    <div className="lg:col-span-1 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm flex flex-col relative overflow-hidden min-h-[360px]">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="animate-spin material-symbols-outlined text-primary text-[32px]">progress_activity</span>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-md">
            <h2 className="font-headline-md text-headline-md text-on-surface">Atividades Recentes</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-sm max-h-[250px] flex flex-col">
            {!activities || activities.length === 0 ? (
              <div className="text-center py-xl text-on-surface-variant">Nenhuma batida registrada hoje.</div>
            ) : (
              activities.map((act) => (
                <div key={act.id} className="flex items-start gap-md py-sm border-b border-surface-variant last:border-0">
                  <div className={`${act.iconBg} p-sm rounded-full flex-shrink-0 mt-xs`}>
                    <span className="material-symbols-outlined text-[18px]">{act.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-body-sm text-body-sm text-on-surface font-semibold">{act.text}</p>
                    <div className="flex items-center justify-between gap-sm mt-xs">
                      <p className="font-label-caps text-label-caps text-on-surface-variant">
                        {act.time} • {act.role}
                      </p>
                      {act.isLate && (
                        <span className="bg-error-container text-on-error-container font-label-caps text-[9px] px-2 py-0.5 rounded-full font-bold">
                          ATRASO
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <button className="w-full text-center text-primary font-label-caps text-label-caps py-sm mt-sm hover:bg-surface-container-high rounded-md transition-colors">
            VER TODO O HISTÓRICO
          </button>
        </>
      )}
    </div>
  );
};
