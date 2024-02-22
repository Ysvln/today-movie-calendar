interface ArrowLeftProps {
  color?: string;
}

const ArrowLeft = ({ color = "#1C1B1F" }: ArrowLeftProps) => {
  return (
    <svg
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.83439 11.7771L0 5.88857L5.83439 0L6.87 1.04522L2.07121 5.88857L6.87 10.7319L5.83439 11.7771Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowLeft;
