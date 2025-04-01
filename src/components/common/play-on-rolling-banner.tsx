import RollingBanner from '@/components/common/rolling-banner';
import ControllerSVG from '@/components/svg/controller_fill';
import PacmanSVG from '@/components/svg/pacman_fill';
import GhostSVG from '@/components/svg/ghost_fill';

export default function PlayOnRollingBanner() {
  return (
    <RollingBanner className="min-w-[1920px] flex-shrink-0 h-16 bg-gradient-to-r from-purple-700 to-purple-500">
      <div className="flex items-center w-52">
        <div className="h-8 mr-5 min-w-11">
          <ControllerSVG fill="#FFFFFF" stroke="" />
        </div>
        <p className="text-white text-3xl font-suit font-black mr-5">PLAYON</p>
      </div>
      <div className="flex items-center w-52">
        <div className="h-8 mr-5 min-w-11">
          <PacmanSVG fill="#FFFFFF" stroke="" />
        </div>
        <p className="text-white text-3xl font-suit font-black mr-5">PLAYON</p>
      </div>
      <div className="flex items-center w-52">
        <div className="h-8 mr-5 min-w-11">
          <GhostSVG fill="#FFFFFF" stroke="" />
        </div>
        <p className="text-white text-3xl font-suit font-black mr-5">PLAYON</p>
      </div>
      <div className="flex items-center w-52">
        <div className="h-8 mr-5 min-w-11">
          <ControllerSVG fill="#FFFFFF" stroke="" />
        </div>
        <p className="text-white text-3xl font-suit font-black mr-5">PLAYON</p>
      </div>
      <div className="flex items-center w-52">
        <div className="h-8 mr-5 min-w-11">
          <PacmanSVG fill="#FFFFFF" stroke="" />
        </div>
        <p className="text-white text-3xl font-suit font-black mr-5">PLAYON</p>
      </div>
      <div className="flex items-center w-52">
        <div className="h-8 mr-5 min-w-11">
          <GhostSVG fill="#FFFFFF" stroke="" />
        </div>
        <p className="text-white text-3xl font-suit font-black mr-5">PLAYON</p>
      </div>
      <div className="flex items-center w-52">
        <div className="h-8 mr-5 min-w-11">
          <ControllerSVG fill="#FFFFFF" stroke="" />
        </div>
        <p className="text-white text-3xl font-suit font-black mr-5">PLAYON</p>
      </div>
      <div className="flex items-center w-52">
        <div className="h-8 mr-5 min-w-11">
          <PacmanSVG fill="#FFFFFF" stroke="" />
        </div>
        <p className="text-white text-3xl font-suit font-black mr-5">PLAYON</p>
      </div>
      <div className="flex items-center w-52">
        <div className="h-8 mr-5 min-w-11">
          <GhostSVG fill="#FFFFFF" stroke="" />
        </div>
        <p className="text-white text-3xl font-suit font-black mr-5">PLAYON</p>
      </div>
    </RollingBanner>
  );
}
