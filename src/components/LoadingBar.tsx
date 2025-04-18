import { Skeleton } from "@/components/ui/skeleton";
const LoadingBar = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
};
export default LoadingBar;
