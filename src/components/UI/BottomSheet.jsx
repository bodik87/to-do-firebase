import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";

export default function BottomSheet({
  active,
  setActive,
  onSubmit,
  placeholder,
}) {
  const handlers = useSwipeable({
    onSwipedDown: (eventData) => setActive(false),
  });

  return (
    <div
      {...handlers}
      onClick={() => setActive(!active)}
      className={`${
        active ? "translate-y-full" : "-translate-y-0"
      } min-h-[50%] fixed max-w-md mx-auto bg-white bottom-0 left-0 right-0 rounded-2xl flex justify-center cursor-pointer transition-all z-20`}
    >
      <Actions onSubmit={onSubmit} placeholder={placeholder} />
    </div>
  );
}

function Actions({ onSubmit, placeholder }) {
  const [input, setInput] = useState("");
  return (
    <div className="w-full pt-4">
      <h2 className="text-center text-gray-900">Add todo</h2>
      <form
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        transition={{ delay: 1 }}
        onSubmit={onSubmit}
        className="flex flex-col justify-between gap-2 mb-4"
      >
        <input
          value={input}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-2 bg-transparent text-gray-900 text-xl placeholder:text-gray-600 outline-none focus:placeholder-transparent transition-all"
          type="text"
          placeholder={placeholder}
        />
        <button className="absolute right-0 bottom-0 bg-my-violet w-fit px-4 py-2 text-white hover:brightness-105 transition-all rounded-md">
          <Plus />
        </button>
      </form>
    </div>
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
