export function EstadoVazio() {
  return (
    <div className="col-span-full bg-white dark:bg-slate-800 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-8 sm:p-10 text-center">
      <h3 className="text-base font-bold text-gray-900 dark:text-slate-100">Você ainda não possui solicitações</h3>
      <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
        Quando você abrir uma demanda, ela aparecerá aqui para acompanhamento.
      </p>
    </div>
  );
}
