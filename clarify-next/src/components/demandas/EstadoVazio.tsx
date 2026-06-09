export function EstadoVazio() {
  return (
    <div className="col-span-full bg-white border-2 border-dashed border-gray-300 rounded-xl p-8 sm:p-10 text-center">
      <h3 className="text-base font-bold text-gray-900">Você ainda não possui solicitações</h3>
      <p className="text-sm text-gray-500 mt-1">
        Quando você abrir uma demanda, ela aparecerá aqui para acompanhamento.
      </p>
    </div>
  );
}
