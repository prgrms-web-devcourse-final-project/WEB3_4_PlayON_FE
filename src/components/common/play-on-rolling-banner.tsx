import RollingBanner from '@/components/common/rolling-banner';
import ControllerSVG from '@/components/svg/controller_fill';
import PacmanSVG from '@/components/svg/pacman_fill';
import GhostSVG from '@/components/svg/ghost_fill';

export default function PlayOnRollingBanner(props: { speed: number; direction: 'left' | 'right' }) {
  return (
    <RollingBanner
      className="bg-gradient-to-r from-purple-700 to-purple-500 h-16"
      speed={props.speed}
      direction={props.direction}
    >
      <div className="flex items-center gap-5 w-fit">
        <ControllerSVG width={32} fill="#FFFFFF" stroke="" />
        <p className="text-neutral-50 text-3xl font-black">PLAYON</p>
      </div>
      <div className="flex items-center gap-5 w-fit">
        <PacmanSVG width={32} fill="#FFFFFF" stroke="" />
        <p className="text-neutral-50 text-3xl font-black">PLAYON</p>
      </div>
      <div className="flex items-center gap-5 w-fit">
        <GhostSVG width={32} fill="#FFFFFF" stroke="" />
        <p className="text-neutral-50 text-3xl font-black">PLAYON</p>
      </div>
      <div className="flex items-center gap-5 w-fit">
        <ControllerSVG width={32} fill="#FFFFFF" stroke="" />
        <p className="text-neutral-50 text-3xl font-black">PLAYON</p>
      </div>
      <div className="flex items-center gap-5 w-fit">
        <PacmanSVG width={32} fill="#FFFFFF" stroke="" />
        <p className="text-neutral-50 text-3xl font-black">PLAYON</p>
      </div>
      <div className="flex items-center gap-5 w-fit">
        <GhostSVG width={32} fill="#FFFFFF" stroke="" />
        <p className="text-neutral-50 text-3xl font-black">PLAYON</p>
      </div>
      <div className="flex items-center gap-5 w-fit">
        <ControllerSVG width={32} fill="#FFFFFF" stroke="" />
        <p className="text-neutral-50 text-3xl font-black">PLAYON</p>
      </div>
      <div className="flex items-center gap-5 w-fit">
        <PacmanSVG width={32} fill="#FFFFFF" stroke="" />
        <p className="text-neutral-50 text-3xl font-black">PLAYON</p>
      </div>
      <div className="flex items-center gap-5 w-fit">
        <GhostSVG width={32} fill="#FFFFFF" stroke="" />
        <p className="text-neutral-50 text-3xl font-black">PLAYON</p>
      </div>
    </RollingBanner>
  );
}
