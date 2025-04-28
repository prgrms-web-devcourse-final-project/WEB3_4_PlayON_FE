'use client';

import { CoolerCategoryMenu } from '@/app/signup/userdata/component/cooler-category-menu';
import TiltToggle from '@/components/common/tilt-toggle';

export default function CustomReleaseStatus(props: { releaseStatus: boolean[] }) {
  const releaseStatuses = ['발매', '출시예정'] as const;

  return (
    <CoolerCategoryMenu state={props.releaseStatus} className="flex gap-2" type="single">
      {[...releaseStatuses].map((item, item_ind) => (
        <TiltToggle label={item} toggle={props.releaseStatus[item_ind]} key={`releaseStatus_${item}`} />
      ))}
    </CoolerCategoryMenu>
  );
}
