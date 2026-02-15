import { useRef, useState } from "react";

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("id-ID", options);
  return formattedDate;
}

export function isoToWIB(isoTime) {
  const date = new Date(isoTime);

  date.setUTCHours(date.getUTCHours() + 7);

  const hour = date.getUTCHours().toString().padStart(2, "0");
  const minute = date.getUTCMinutes().toString().padStart(2, "0");
  const second = date.getUTCSeconds().toString().padStart(2, "0");

  const options = { timeZoneName: "short" };
  const timeZone = date.toLocaleString("id-ID", options).split(" ")[2];

  return `${hour}:${minute}:${second} ${timeZone}`;
}

export function getOverview(body) {
  if (!body || typeof body !== "string") {
    return "-";
  }

  const strippedText = body.replace(/<[^>]+>/g, "");

  const strippedTextWithoutLineBreaks = strippedText.replace(
    /(\r\n|\n|\r)/gm,
    "",
  );

  if (strippedTextWithoutLineBreaks.length >= 30) {
    return `${strippedTextWithoutLineBreaks.substring(0, 65)} ....`;
  } else {
    return strippedTextWithoutLineBreaks;
  }
}

export const useTextarea = () => {
  const textareaRef = useRef(null);
  const [textareaValue, setTextareaValue] = useState("");

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    const updatedHeight = textarea.scrollHeight + "px";
    textarea.style.height = updatedHeight;
  };

  return {
    textareaRef,
    textareaValue,
    setTextareaValue,
    handleTextareaChange,
    adjustTextareaHeight,
  };
};
