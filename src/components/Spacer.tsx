export const HorizontalSpacer = ({ size }: { size: number }) => {
  return (
    <span
      style={{
        width: size,
        height: "auto",
        display: "inline-block",
        flexShrink: 0,
      }}
    />
  );
};
