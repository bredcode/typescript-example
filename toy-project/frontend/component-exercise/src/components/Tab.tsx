import { useState } from "react";

interface Tab {
  id: number;
  label: string;
  content: string;
}

const tabs: Tab[] = [
  { id: 1, label: "탭 1", content: "첫 번째 탭 내용" },
  { id: 2, label: "탭 2", content: "두 번째 탭 내용" },
  { id: 3, label: "탭 3", content: "세 번째 탭 내용" },
];

function Tab() {
  const [activeTab, setActiveTab] = useState<number>(1);

  return (
    <div>
      <div>
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs.find((tab) => tab.id === activeTab)?.content}</div>
    </div>
  );
}

export default Tab;
