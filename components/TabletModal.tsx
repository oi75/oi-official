import Image from "next/image";
import React from "react";

interface ComputerModalProps {
  setOpen: (value: boolean) => void;
}

const TabletModal: React.FC<ComputerModalProps> = ({ setOpen }) => {
  return (
    <div
      className={` absolute z-50 flex  items-center justify-center top-0 left-0 w-full h-full  `}
    >
      <div
        onClick={() => setOpen(false)}
        style={{ background: "rgba(0,0,0,0.57)" }}
        className="absolute hover:cursor-custom z-10 top left-0 w-full h-full"
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
          className="w-[80%] py-[26px] object-contain relative z-30 animate_scale"
          src={"/assets/tablet_11.webp"}
          width={2000}
          height={2000}
        />
        <div className="z-10 flex items-center justify-center absolute top-[20%] bottom-[10%] left-[20%] right-[20%] h-full">
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#038081]"></div>
        </div>
        <div className="z-40 flex items-center justify-center absolute top-0 bottom-0 left-0 right-0 h-full">
          <div className="pl-[10%] pr-[15%] py-[3%] w-full flex items-center justify-between">
            <Image
              alt=""
              className="  "
              src={"/assets/fixed_1.png"}
              width={70}
              height={70}
            />
            <div className="flex items-center gap-5">
              <a
                href="https://www.discord.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  alt=""
                  className=" hover:cursor-custom "
                  src={"/assets/discord.png"}
                  width={40}
                  height={40}
                />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  alt=""
                  className=" hover:cursor-custom "
                  src={"/assets/twitter.png"}
                  width={40}
                  height={40}
                />
              </a>
            </div>
          </div>
          <div className="pl-[15%] pr-[15%] pt-[6%] w-full flex items-center justify-around">
            <div className="flex hover:cursor-custom flex-col  items-center">
              <Image
                alt=""
                className="  "
                src={"/assets/fixed_2.png"}
                width={70}
                height={70}
              />
              <p className="text-[25px] text-white font-medium">Partner</p>
            </div>
            <div className="flex hover:cursor-custom flex-col  items-center">
              <Image
                alt=""
                className="  "
                src={"/assets/fixed_3.png"}
                width={70}
                height={70}
              />
              <p className="text-[25px] text-white font-medium">Space Kyoto</p>
            </div>
            <div className="flex hover:cursor-custom flex-col  items-center">
              <Image
                alt=""
                className="  "
                src={"/assets/fixed_4.png"}
                width={70}
                height={70}
              />
              <p className="text-[25px] text-white font-medium">Team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabletModal;
