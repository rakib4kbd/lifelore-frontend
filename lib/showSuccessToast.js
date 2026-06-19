import toast from "react-hot-toast";

const showSuccessToast = (message) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } bg-black border-2 border-white px-4 py-3 min-w-100 flex items-center gap-3`}
    >
      <span className="bg-green-600 text-white px-2 py-1 text-[10px] font-black">
        [SUCCESS]
      </span>

      <p className="text-xs font-black uppercase tracking-wider text-white">
        {message}
      </p>
    </div>
  ));
};

export default showSuccessToast;
