export function ScrollButton() {
  return (
    <div className="fixed bottom-2 right-2 z-10">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="grid h-10 w-10 place-items-center rounded bg-black text-white opacity-40"
      >
        <span className="mt-2 h-4 w-4 -rotate-45 border-r-2 border-t-2" />
      </button>
    </div>
  );
}
