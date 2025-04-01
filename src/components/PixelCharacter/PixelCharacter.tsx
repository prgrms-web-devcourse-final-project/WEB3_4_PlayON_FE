import style from './PixelCharacter.module.css';
interface Props {
  char: 'archer' | 'mage' | 'warrior';
  motion: 'run' | 'walk' | 'jump' | 'attack' | 'defence' | 'attacked' | 'dying' | 'ulti';
}
function PixelCharacter({ char, motion }: Props) {
  return <div className={`w-[144px] h-[96px] ${style[char]} ${style[motion]}`}></div>;
}
export default PixelCharacter;
