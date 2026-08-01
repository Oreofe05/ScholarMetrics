function GoogleButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        w-full
        h-16
        border
        border-slate-300
        rounded-2xl
        flex
        items-center
        justify-center
        gap-4
        bg-white
        hover:bg-slate-50
        hover:shadow-md
        transition-all
        duration-300
        font-semibold
      "
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-7 h-7"
      />

      {text}
    </button>
  );
}

export default GoogleButton;