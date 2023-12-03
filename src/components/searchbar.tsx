"use client";

import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { DbItem } from "~/pages/inventory";
import Fuse from "fuse.js";

function useFuzzySearch(items: DbItem[]) {
  // The Fuse.js options
  const options = {
    keys: ["name"],
    includeScore: true,
  };

  // Create the Fuse.js instance
  return new Fuse(items, options);
}

export default function SearchBar(props: {
  input: DbItem[];
  output: (items: DbItem[]) => void;
}) {
  const [input, setInput] = useState<string>("");
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const engine = useFuzzySearch(props.input);

  useEffect(() => {
    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [typingTimeout]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        const res = engine.search(e.target.value);
        const out = res.map((v) => v.item);

        props.output(out);
      }, 1000),
    );
  };

  return (
    <Input
      type="text"
      placeholder="Search"
      value={input}
      onChange={handleInputChange}
    />
  );
}
