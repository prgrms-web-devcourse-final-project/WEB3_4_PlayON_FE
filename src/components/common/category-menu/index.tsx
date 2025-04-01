'use client';

import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type CategoryMenuProps = {
  data: string[];
};

export default function CategoryMenu() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div>
      <ToggleGroup type="multiple" onValueChange={(e) => setSelected(e)}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
        <ToggleGroupItem value="c">C</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
