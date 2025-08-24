import React, { useState, type ChangeEvent } from "react";

function MirrorInput() {
  const [text, setText] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <p>입력한 내용: {text}</p>
    </div>
  );
}

export default MirrorInput;
