import { LoaderCircle } from "lucide-react";

const Loading = ({item}: {item?: string}) => {
  return (
    <div className="w-full min-h-screen -top-30 relative flex items-center justify-center gap-2 text-xl">
      <LoaderCircle className="animate-spin" />
      <span>Loading {item} ...</span>
    </div>
  );
};

export default Loading;
