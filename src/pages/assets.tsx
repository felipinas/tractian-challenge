import { Tree } from "../components/tree";

export function Assets() {
  return (
    <>
      <header className="flex justify-between mb-3">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-xl">Ativos</h1>

          <span className="text-[#77818C] text-sm">/ Apex Unit</span>
        </div>

        <div className="flex gap-2">
          <button className="py-1.5 px-4 border border-[#D8DFE6] rounded font-medium text-[#77818C] text-sm">
            Sensor de energia
          </button>

          <button className="py-1.5 px-4 border border-[#D8DFE6] rounded font-medium text-[#77818C] text-sm">
            Crítico
          </button>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-2 h-full">
        <div className="col-span-1 overflow-auto">
          <Tree />
        </div>

        <div className="col-span-2">viewer</div>
      </div>
    </>
  );
}
