type PacmanSVGProps = {
  stroke: string;
  fill: string;
};

export default function PacmanSVG(props: PacmanSVGProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={props.stroke}
    >
      <g clipPath="url(#clip0_500_3573)">
        <path
          d="M15.9278 16.0001L30.2078 8.91351C27.3499 3.10193 21.2455 -0.415894 14.8092 0.0394624C6.09435 0.655351 -0.573941 8.36708 0.0391117 17.1223C0.652165 25.8775 8.32839 32.5766 17.0448 31.9607C23.5779 31.4992 29.1906 27.0336 31.1358 20.7512L15.9278 15.9985V16.0001ZM15.4346 7.60301C15.4346 6.70156 16.1629 5.9699 17.0602 5.9699C17.9575 5.9699 18.6858 6.70156 18.6858 7.60301C18.6858 8.50446 17.9575 9.23611 17.0602 9.23611C16.1629 9.23611 15.4346 8.50446 15.4346 7.60301Z"
          fill={props.fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_500_3573">
          <rect width="33" height="32" fill={props.fill} />
        </clipPath>
      </defs>
    </svg>
  );
}
