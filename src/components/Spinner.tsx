import { ProgressBar, TailSpin } from "react-loader-spinner";

export const Spinner = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="mt-9">
        <TailSpin
          height="80"
          width="80"
          color="rgb(63,63,69)"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
};
