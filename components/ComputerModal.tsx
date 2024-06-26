import Image from "next/image";
import React from "react";

interface ComputerModalProps {
  setOpen: (value: boolean) => void;
}

const ComputerModal: React.FC<ComputerModalProps> = ({ setOpen }) => {
  return (
    <div
      className={` absolute z-50 flex  h-full items-center justify-center top-0 left-0 w-full  `}
    >
      <div
        onClick={() => setOpen(false)}
        style={{ background: "rgba(0,0,0,0.57)" }}
        className="absolute hover:cursor-custom z-20 top left-0 w-full h-full"
      ></div>
      <div
        onClick={() => setOpen(false)}
        className=" absolute top-5 z-50 hover:cursor-custom right-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
            fill="white"
          />
        </svg>
      </div>
      <div className="relative flex justify-center items-center">
        <Image
          alt=""
          className="w-[80%] relative z-30 pt-[26px] object-contain animate_scale"
          src={"/assets/tv_retro.webp"}
          width={2000}
          height={2000}
        />

        <div className="absolute top-[10%] bottom-[10%] left-[20%] right-[20%] animate_scale">
          <video
            autoPlay
            muted
            loop
            className="w-full h-full z-20"
            // width="1000"
            // height="500"
            playsInline
          >
            <source src="/desktop/tv_noise.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default ComputerModal;
