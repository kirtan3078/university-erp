import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Go back"
      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-slate-800/75 hover:text-white hover:shadow-[0_10px_35px_rgba(34,211,238,0.16)]"
    >
      <span className="text-base transition-transform duration-300 group-hover:-translate-x-1">←</span>
      <span>Back</span>
    </button>
  );
}
