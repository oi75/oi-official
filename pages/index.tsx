import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import ComputerModal from "@/components/ComputerModal";
import TabletModal from "@/components/TabletModal";
import Modal from "@mui/joy/Modal";
import { ModalDialog } from "@mui/joy";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const hours = new Date().getHours();
  const isDayTime = hours > 6 && hours < 20;
  const [walking, setWalking] = useState<Number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [backgrondLoad, setBackgrondLoad] = useState(false);
  const [videoLoad, setVideoLoad] = useState(false);

  const [loadingGift, setLoadingGift] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoadingGift(false);
    }, 3000);
  }, []);

  useEffect(() => {
    console.log("video load", videoLoad);
    if (backgrondLoad && videoLoad) {
      setTimeout(() => {
        console.log("walking", walking);
        setWalking(100);
      }, 5000);
    }
  }, [backgrondLoad, videoLoad]);

  useEffect(() => {
    // Play the video when the component mounts
    if (videoRef.current) {
      setVideoLoad(true);
      videoRef.current.play().catch((error) => {
        // Autoplay might be blocked, handle the error here
        console.error("Autoplay blocked:", error);
      });
    }

    const slider = document.querySelector(".items") as HTMLElement;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    slider.addEventListener("mousedown", (e: MouseEvent) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mousemove", (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; // scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    });
  }, []);
  const [openTV, setOpenTV] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [computerHoverDay, setComputerHoverDay] = useState(0);
  const [tabHoverDay, setTabHoverDay] = useState(0);

  return (
    <div className="relative  w-full ">
      {walking === null && (
        <div className=" fixed flex-col  lg:hidden top-[300px] left-[100px]  z-50  justify-center">
          <Image
            alt=""
            onClick={() => setOpenTV(true)}
            className="w-[140px]"
            src={"/assets/swipe.gif"}
            width={600}
            height={600}
          />
          <h1 className=" text-[20px] w-[150px] text-black font-bold">
            Swipe to move in any direction
          </h1>
        </div>
      )}
      <div className="items">
        {/* {isDayTime ? ( */}
        <div className="item relative">
          <Image
            alt=""
            className="background_image  relative z-10"
            src={"/desktop/d_background_3.webp"}
            width={2560}
            height={1200}
            onLoad={() => {
              setBackgrondLoad(true);
              console.log("background loaded");
            }}
          />

          <Image
            alt=""
            onClick={() => setOpenTV(true)}
            className="absolute computer z-30"
            src={"/desktop/d_TV_cut_outline.webp"}
            width={650}
            height={604}
            style={{ opacity: computerHoverDay }}
            onMouseEnter={() => setComputerHoverDay(1)}
            onMouseLeave={() => setComputerHoverDay(0)}
          />
          <div
            onMouseEnter={() => setComputerHoverDay(1)}
            onClick={() => setOpenTV(true)}
            className="absolute  computer_top  z-40"
          >
            <div className="w-10 h-10 animate-ping duration-300 ease-linear absolute top-0 rounded-full left-0 bg-[#ffffff61]"></div>
            <div className="w-10 h-10 relative z-10 cursor-pointer rounded-full bg-[#0000006f]"></div>
          </div>
          <Image
            alt=""
            onClick={() => setOpen2(true)}
            className="absolute tablet z-30"
            src={"/desktop/d_tablet_cut_outline.webp"}
            width={600}
            style={{ opacity: tabHoverDay }}
            onMouseEnter={() => setTabHoverDay(1)}
            onMouseLeave={() => setTabHoverDay(0)}
            height={600}
          />
          <div
            onMouseEnter={() => setTabHoverDay(1)}
            onClick={() => setOpen2(true)}
            className="absolute  tab_top  z-40"
          >
            <div className="w-5 h-5 animate-ping duration-300 ease-linear absolute top-0 rounded-full left-0 bg-[#ffffffad]"></div>
            <div className="w-5 h-5 relative z-10 cursor-pointer rounded-full bg-[#0000006f]"></div>
          </div>
          <video
            autoPlay
            muted
            loop
            ref={videoRef}
            className=" absolute z-[5] space_vid"
            width="640"
            height="360"
            playsInline
          >
            <source src="/assets/space_background_2.mp4" type="video/mp4" />
          </video>
        </div>
        {/* ) : (
          <div className="item relative">
            {open && <ComputerModal setOpen={setOpen} />}
            {open2 && <TabletModal setOpen={setOpen2} />}
            <Image
              alt=""
              className="background_image  relative z-10"
              src={"/desktop/n_background_2.webp"}
              width={2560}
              height={1200}
            />

            <div onClick={() => setOpen(true)} className="n_computer">
              <Image
                alt=""
                className="absolute n_computer_de z-30"
                src={"/desktop/n_TV_cut_outline.webp"}
                width={600}
                height={600}
              />
              <Image
                alt=""
                className="absolute n_light z-30"
                src={"/desktop/n_light_2.webp"}
                width={600}
                height={600}
              />
            </div>
            <div className="absolute  computer_top  z-40">
              <div className="w-10 h-10 animate-ping duration-300 ease-linear absolute top-0 rounded-full left-0 bg-[#ffffff61]"></div>
              <div className="w-10 h-10 relative z-10 cursor-pointer rounded-full bg-[#0000006f]"></div>
            </div>
            <div onClick={() => setOpen2(true)} className="n_tablet">
              <Image
                alt=""
                className="absolute n_tablet_de z-30"
                src={"/desktop/n_tablet_cut_outline.webp"}
                width={600}
                height={600}
              />
              <Image
                alt=""
                className="absolute n_tablet_light z-30"
                src={"/desktop/n_light_1.webp"}
                width={600}
                height={600}
              />
            </div>
            <div
              onMouseEnter={() => setTabHoverDay(1)}
              onClick={() => setOpen2(true)}
              className="absolute  tab_top  z-40"
            >
              <div className="w-5 h-5 animate-ping duration-300 ease-linear absolute top-0 rounded-full left-0 bg-[#ffffffad]"></div>
              <div className="w-5 h-5 relative z-10 cursor-pointer rounded-full bg-[#0000006f]"></div>
            </div>
            <video
              autoPlay
              muted
              loop
              ref={videoRef}
              className=" absolute z-[5] space_vid"
              width="640"
              height="360"
              playsInline
            >
              <source src="/assets/space_background_2.mp4" type="video/mp4" />
            </video>
          </div>
        )} */}
      </div>
      {(!videoLoad || !backgrondLoad || loadingGift) && (
        <div className=" fixed bg-[#111] flex items-center justify-center top-0 left-0 w-full h-full z-[100]">
          <Image
            alt=""
            className="z-10 object-cover"
            fill
            src={"/assets/space.webp"}
          />
          <video
            autoPlay
            muted
            loop
            className=" z-50"
            width="300"
            height="360"
            playsInline
          >
            <source src="/assets/loading.webm" type="video/webm" />
          </video>
          {/* <Image
              alt=""
              className="z-50"
              src={"/loading.gif"}
              width={200}
              height={200}
            /> */}
        </div>
      )}

      {/* {openTV && <ComputerModal setOpen={setOpenTV} />} */}
      {/* {open2 && <TabletModal setOpen={setOpen2} />} */}
      <Modal
        open={openTV}
        onClose={() => {
          setOpenTV(false);
        }}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <div
          className="w-full h-full p-16 flex justify-center items-center"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpenTV(false);
          }}
        >
          <div className="relative select-none object-contain">
            <Image
              alt=""
              className="select-none h-full w-full relative z-30 object-contain animate_scale"
              src={"/assets/tv_retro.webp"}
              width={2000}
              height={2000}
            />
            <div className="absolute top-[0%] bottom-[0%] left-[10%] right-[10%] animate_scale">
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
      </Modal>

      <Modal
        open={open2}
        onClose={() => {
          setOpen2(false);
        }}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <div
          className="w-full h-full p-16 flex justify-center items-center select-none"
          onClick={(e) => {}}
        >
          <div className="w-full max-w-[90%] h-auto max-h-[90%] relative select-none object-contain">
            <Image
              alt=""
              className="w-full h-full object-contain relative z-30 animate_scale"
              src={"/assets/tablet_11.webp"}
              width={2000}
              height={2000}
            />

            <div className="z-40 absolute top-[15%] bottom-[10%] left-[20%] right-[20%] h-full animate_scale">
              <div className="pl-[10%] pr-[15%] py-[3%] w-full flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <a
                    href="https://www.discord.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      alt=""
                      className=" cursor-pointer "
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
                      className=" cursor-pointer "
                      src={"/assets/twitter.png"}
                      width={40}
                      height={40}
                    />
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <Image
                    alt=""
                    className="  "
                    src={"/assets/fixed_1.png"}
                    width={70}
                    height={70}
                  />
                </div>
                <div className="">
                  <Image
                    alt=""
                    className="  "
                    src={"/assets/fixed_2.png"}
                    width={70}
                    height={70}
                  />
                </div>
                <div className="">
                  <Image
                    alt=""
                    className="  "
                    src={"/assets/fixed_3.png"}
                    width={70}
                    height={70}
                  />
                </div>
                <div className="">
                  <Image
                    alt=""
                    className="  "
                    src={"/assets/fixed_4.png"}
                    width={70}
                    height={70}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div className="hidden">
        <Image
          alt="TV"
          className=""
          width={2000}
          height={2000}
          src={"/assets/tv_retro.webp"}
        />
        <video muted loop playsInline>
          <source src="/desktop/tv_noise.webm" type="video/webm" />
        </video>
      </div>
    </div>
  );
}
