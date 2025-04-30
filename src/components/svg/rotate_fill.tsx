type RotateFillSVG = {
  stroke?: string;
  fill?: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function RotateFillSVG(props: RotateFillSVG) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? '100%'}
      height={props.height ?? '100%'}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-rotate-ccw-icon lucide-rotate-ccw ` + props.className}
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}
