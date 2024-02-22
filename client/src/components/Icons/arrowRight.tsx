interface ArrowRightProps {
  color?: string;
}

const ArrowRight = ({ color = "#1C1B1F" }: ArrowRightProps) => {
  return (
    <>
      <svg
        width="8"
        height="13"
        viewBox="0 0 8 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.68123 12.3333L0.645813 11.2979L5.44373 6.5L0.645813 1.70208L1.68123 0.666667L7.51456 6.5L1.68123 12.3333Z"
          fill={color}
        />
      </svg>
    </>
  );
};

export default ArrowRight;
