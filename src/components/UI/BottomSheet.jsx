import React, { useEffect, useRef, useState } from "react";

export default function BottomSheet({
  active,
  setActive,
  onSubmit,
  placeholder,
}) {
  return (
    <div
      onClick={() => setActive(!active)}
      className={`${
        active ? "-translate-y-0" : "translate-y-[460px]"
      } fixed bottom-0 left-0 right-0 min-h-[50%] max-h-[500px] h-full max-w-md mx-auto bg-white rounded-2xl flex flex-col items-center cursor-pointer transition-all z-20 duration-300`}
    >
      <div className="mt-4 flex justify-center">
        <div
          className={`${
            active ? "rotate-12" : "-rotate-12"
          } h-[3px] w-4 -mr-[1px] rounded-full bg-gray-500 transition-all`}
        />
        <div
          className={`${
            active ? "-rotate-12" : "rotate-12"
          } h-[3px] w-4 rounded-full bg-gray-500 transition-all`}
        />
      </div>

      <Actions onSubmit={onSubmit} placeholder={placeholder} active={active} />
    </div>
  );
}

function Actions({ onSubmit, placeholder, active }) {
  const [input, setInput] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [active]);

  return (
    <form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ delay: 1 }}
      onSubmit={(e) => {
        e.preventDefault(e);
        onSubmit(input);
        setInput("");
      }}
      className="h-full p-6 flex flex-col justify-between"
    >
      <input
        ref={inputRef}
        value={input}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => setInput(e.target.value)}
        className="w-full px-2 bg-transparent text-gray-900 text-3xl placeholder:text-gray-600 outline-none focus:placeholder-transparent transition-all"
        type="text"
        placeholder={placeholder}
      />
      <button className="bg-my-violet py-2 flex justify-center items-center text-white hover:brightness-105 transition-all rounded-full">
        <Plus />
      </button>
    </form>
  );
}

function Plus() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}
