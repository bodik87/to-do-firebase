import React from "react";

export default function Skeleton({ loading, text = "Loading..." }) {
  return (
    <>
      {loading && (
        <div className="input mt-4 animate-pulse text-center">{text}</div>
      )}
    </>
  );
}
