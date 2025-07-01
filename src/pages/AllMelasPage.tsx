import MelaCard from "@/components/customComponents/MelaCard";
import useMelas from "@/hooks/useMelas";

const AllMelasPage = () => {
  const { melas } = useMelas();

  return (
    <section className="px-4 py-12 flex-grow flex">
      <div className="max-w-7xl w-full mx-auto px-4 flex gap-6">
        <div className="flex flex-col flex-grow">
          <h1 className="text-3xl font-medium mb-5 ms-5">All Melas</h1>
          <div className="grid gap-6 lg:grid-cols-3">
            {melas.map((mela) => (
              <MelaCard key={mela.sl_no} mela={mela} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllMelasPage;

