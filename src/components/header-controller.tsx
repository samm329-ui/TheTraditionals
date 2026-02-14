"use client";

type HeaderControllerProps = {
  onHover: () => void;
};

const HeaderController = ({ onHover }: HeaderControllerProps) => {
  return (
    <div
      className="fixed top-0 left-0 right-0 h-8 z-[60]"
      onMouseEnter={onHover}
    />
  );
};

export default HeaderController;
