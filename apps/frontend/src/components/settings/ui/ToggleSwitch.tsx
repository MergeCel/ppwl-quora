import { useState } from "react";

export default function ToggleSwitch() {
  const [enabled, setEnabled] =
    useState(false);

  return (
    <button
      className={`toggle-switch ${
        enabled ? "active" : ""
      }`}
      onClick={() =>
        setEnabled(!enabled)
      }
    >
      <div className="toggle-circle" />
    </button>
  );
}