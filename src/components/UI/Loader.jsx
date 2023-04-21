import React from "react";

export default function Skeleton() {
  return (
    <div className="w-full bg-transparent rounded-full h-3 my-4 overflow-x-hidden">
      <div
        className="bg-my-violet h-3 rounded-full animate-loading"
        style={{ width: `50%` }}
      />
    </div>
  );
}
// Add to tailwind.config
// theme: {
//   extend: {
//     animation: {
//       loading: "loading 0.5s linear infinite",
//     },
//     keyframes: {
//       loading: {
//         "0%": {
//           transform: "translateX(-100%)",
//         },

//         "60%": {
//           transform: "",
//         },
//         "100%": {
//           transform: "translateX(220%)",
//         },
//       },
//     },
//   },
// },
