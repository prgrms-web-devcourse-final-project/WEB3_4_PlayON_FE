'use client';

import { useState } from 'react';

type Props = {
  type: 'header' | 'capsule' | 'background';
  appId: string | number;
  className?: string;
};

export default function ImageWithFallback({ type, appId, className }: Props) {
  let srcList = [''];
  if (type == 'header') {
    srcList = [
      `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appId}/header_koreana.jpg`,
      `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appId}/header.jpg`,
      `/img/dummy_header.jpg`,
    ];
  } else if (type == 'capsule') {
    srcList = [
      `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appId}/capsule_616x353_koreana.jpg`,
      `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appId}/capsule_616x353.jpg`,
      `/img/dummy_capsule.jpg`,
    ];
  }

  const [currentIdx, setCurrentIdx] = useState(0);
  const handleErr = () => {
    if (currentIdx < srcList.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  return (
    <img src={srcList[currentIdx]} className={`object-contain` + className} alt="game image" onError={handleErr} />
  );
}
