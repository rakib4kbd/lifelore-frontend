import toast from "react-hot-toast";

const showAlertToast = (message) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } bg-black border-2 border-white px-4 py-3 min-w-100 flex items-center gap-3`}
    >
      <span className="bg-pink-600 text-white px-2 py-1 text-[10px] font-black">
        [ALERT]
      </span>

      <p className="text-xs font-black uppercase tracking-wider text-white">
        {message}
      </p>
    </div>
  ));
};

export default showAlertToast;
