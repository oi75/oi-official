import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Modal from "@mui/joy/Modal";
import { PageLoader } from '@/components/PageLoader';
import { DirectionIndicator } from '@/components/DirectionIndicator';
import { SwipeIndicator } from '@/components/SwipeIndicator';
import "remixicon/fonts/remixicon.css";

export default function Home() {
  const [walking, setWalking] = useState<Number | null>(null);
  const [backgroundLoad, setBackgroundLoad] = useState(false);
  const [videoLoad, setVideoLoad] = useState(false);

  const [selectedTabID, setSelectedTabID] = useState(0);
  const [selectedNFTTabID, setSelectedNFTTabID] = useState(0);

  const [loadingGift, setLoadingGift] = useState(true);

  const [openTV, setOpenTV] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [computerHoverDay, setComputerHoverDay] = useState(0);
  const [tabHoverDay, setTabHoverDay] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleTabletModal = useCallback((value: boolean) => {
    if (!videoLoad) {
      return;
    }

    setOpen2(value);
  }, [videoLoad]);

  useEffect(() => {
    setTimeout(() => {
      setLoadingGift(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (backgroundLoad && videoLoad) {
      setTimeout(() => {
        console.log("Walking")
        setWalking(100);
      }, 6000);
    }
  }, [backgroundLoad, videoLoad]);

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
    let startY: number;
    let scrollLeft: number;
    let scrollTop: number;

    slider.addEventListener("mousedown", (e: MouseEvent) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      startY = e.pageY - slider.offsetTop;
      scrollLeft = slider.scrollLeft;
      scrollTop = slider.scrollTop;
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
      const y = e.pageY - slider.offsetTop;
      const walkX = (x - startX) * 3; // scroll-fast
      const walkY = (y - startY) * 3; // scroll-fast
      slider.scrollLeft = scrollLeft - walkX;
      slider.scrollTop = scrollTop - walkY;
    });
  }, []);

  return (
    <div className="relative  w-full ">
      {(!videoLoad || !backgroundLoad || loadingGift) && (
        <PageLoader />
      )}
      {walking === null && (
        <SwipeIndicator />
      )}
      <DirectionIndicator />
      <div className="items">
        <div className="item relative">
          <Image
            alt=""
            className="background_image  relative z-10"
            src={"/desktop/d_background_3.webp"}
            width={2560}
            height={1200}
            onLoad={() => {
              setBackgroundLoad(true);
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
            <div className="w-10 h-10 relative z-10 hover:cursor-custom rounded-full bg-[#0000006f]"></div>
          </div>
          <Image
            alt=""
            onClick={() => toggleTabletModal(true)}
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
            onClick={() => toggleTabletModal(true)}
            className="absolute  tab_top  z-40"
          >
            <div className="w-5 h-5 animate-ping duration-300 ease-linear absolute top-0 rounded-full left-0 bg-[#ffffffad]"></div>
            <div className="w-5 h-5 relative z-10 hover:cursor-custom rounded-full bg-[#0000006f]"></div>
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

      </div>

      <Modal
        open={openTV}
        onClose={() => {
          setOpenTV(false);
        }}
      >
        <div className="rotate-90 lg:rotate-0 lg:h-full lg:flex justify-center items-center outline-none">
          <div
            className={
              "w-[100vh] h-[100vw]  outline-none " +
              "lg:w-full lg:h-full lg:p-16 " +
              "flex items-end lg:items-stretch " +
              ""
            }
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpenTV(false);
            }}
          >
            <div className="relative h-full w-full select-none object-contain">
              <Image
                alt=""
                className="select-none h-full w-full relative z-30 object-contain"
                src={"/assets/tv_retro.webp"}
                width={2000}
                height={2000}
              />
              <div className="absolute top-[10%] bottom-[10%] left-[12%] right-[12%]">
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
        </div>
      </Modal>

      <Modal
        open={open2}
        onClose={() => {
          toggleTabletModal(false);
        }}
      >
        <div
          className="rotate-90 lg:rotate-0 lg:h-full lg:w-full lg:flex justify-center items-center"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleTabletModal(false);
          }}
        >
          <div
            className="w-[100vh] h-[100vw] outline-none lg:w-full lg:h-auto lg:p-16 select-none"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleTabletModal(false);
            }}
          >
            <div
              className="h-full lg:h-auto relative select-none object-contain outline-none"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Image
                alt=""
                className="w-full h-full select-none object-contain relative z-20"
                src={"/assets/tablet_11.webp"}
                width={2000}
                height={2000}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleTabletModal(false);
                }}
              />

              <div
                className="z-40 absolute top-[17%] bottom-[17%] left-[22%] lg:left-[20%] right-[25%] lg:right-[24%]"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <div className="pl-[10%] pr-[5%] pt-[4%] pb-[2%] w-full flex items-center justify-between">
                  <div className="w-full flex items-center justify-end gap-2 lg:gap-5">
                    <div className='noise-overlay'>
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full"
                      >
                        <source src="/desktop/tv_noise.webm" type="video/webm" />
                      </video>
                    </div>
                    <a
                      href="https://www.discord.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        alt=""
                        className=" hover:cursor-custom lg:block hidden"
                        src={"/assets/discord.png"}
                        width={40}
                        height={40}
                      />

                      <Image
                        alt=""
                        className=" hover:cursor-custom block lg:hidden"
                        src={"/assets/discord.png"}
                        width={30}
                        height={30}
                      />
                    </a>
                    <a
                      href="https://twitter.com/Oi_1990s"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        alt=""
                        className=" hover:cursor-custom lg:block hidden"
                        src={"/assets/x.png"}
                        width={40}
                        height={40}
                      />

                      <Image
                        alt=""
                        className=" hover:cursor-custom block lg:hidden"
                        src={"/assets/x.png"}
                        width={30}
                        height={30}
                      />
                    </a>
                  </div>
                </div>
                <div
                  className="relative pb-2 lg:pb-8"
                  style={{ height: "calc(90% - 40px)" }}
                >
                  <div className="h-full lg:py-4 flex flex-col gap-2 ml-1 lg:ml-4 items-start justify-around">
                    <div
                      className={
                        "overflow-hidden hover:cursor-custom rounded-full bg-[#F1ECDF] border-black border-2 hover:z-50" +
                        (selectedTabID == 0 ? " z-50" : "")
                      }
                    >
                      <Image
                        alt=""
                        className="lg:block hidden"
                        src={"/assets/fixed_1.png"}
                        width={70}
                        height={70}
                        onClick={() => {
                          setSelectedTabID(0);
                        }}
                      />

                      <Image
                        alt=""
                        className="block lg:hidden"
                        src={"/assets/fixed_1.png"}
                        width={34}
                        height={34}
                        onClick={() => {
                          setSelectedTabID(0);
                        }}
                      />
                    </div>
                    <div
                      className={
                        "overflow-hidden hover:cursor-custom rounded-full bg-[#F1ECDF] border-black border-2 hover:z-50" +
                        (selectedTabID == 1 ? " z-50" : "")
                      }
                    >
                      <Image
                        alt=""
                        className="lg:block hidden"
                        src={"/assets/fixed_2.png"}
                        width={70}
                        height={70}
                        onClick={() => {
                          setSelectedTabID(1);
                        }}
                      />
                      <Image
                        alt=""
                        className="block lg:hidden "
                        src={"/assets/fixed_2.png"}
                        width={34}
                        height={34}
                        onClick={() => {
                          setSelectedTabID(1);
                        }}
                      />
                    </div>
                    <div
                      className={
                        "overflow-hidden hover:cursor-custom rounded-full bg-[#F1ECDF] border-black border-2 hover:z-50" +
                        (selectedTabID == 2 ? " z-50" : "")
                      }
                    >
                      <Image
                        alt=""
                        className="lg:block hidden"
                        src={"/assets/fixed_3.png"}
                        width={70}
                        height={70}
                        onClick={() => {
                          setSelectedTabID(2);
                        }}
                      />
                      <Image
                        alt=""
                        className="block lg:hidden"
                        src={"/assets/fixed_3.png"}
                        width={34}
                        height={34}
                        onClick={() => {
                          setSelectedTabID(2);
                        }}
                      />
                    </div>
                    <div
                      className={
                        "overflow-hidden hover:cursor-custom rounded-full bg-[#F1ECDF] border-black border-2 hover:z-50" +
                        (selectedTabID == 3 ? " z-50" : "")
                      }
                    >
                      <Image
                        alt=""
                        className="lg:block hidden"
                        src={"/assets/fixed_4.png"}
                        width={70}
                        height={70}
                        onClick={() => {
                          setSelectedTabID(3);
                        }}
                      />
                      <Image
                        alt=""
                        className="block lg:hidden"
                        src={"/assets/fixed_4.png"}
                        width={34}
                        height={34}
                        onClick={() => {
                          setSelectedTabID(3);
                        }}
                      />
                    </div>
                  </div>
                  <div className="bg-[#F1ECDF] absolute left-[25px] lg:left-[55px] top-0 bottom-[1%] right-[14px] lg:right-[36px] overflow-hidden rounded-lg border-black border-2 z-30">
                    <div className="h-[36px] lg:h-[64px] border-b-[2px] border-black flex justify-center items-center">
                      {/* Tab 1 */}
                      {selectedTabID === 0 && (
                        <p className="text-2xl font-[Bevan]">Oi</p>
                      )}

                      {/* Tab 2 */}
                      {selectedTabID === 1 && (
                        <p className="text-2xl font-[Bevan]">Cosmo Kyoto</p>
                      )}

                      {/* Tab 3 */}
                      {selectedTabID === 2 && (
                        <div className="text-2xl">
                          <div className="flex gap-2">
                            <div
                              className="relative overflow-hidden rounded-full w-6 h-6 lg:w-10 lg:h-10 hover:cursor-custom"
                              onClick={() => {
                                setSelectedNFTTabID(0);
                              }}
                            >
                              <Image
                                alt="AkaRanger"
                                className="object-cover object-center"
                                src={"/nft/nft1.png"}
                                fill
                              />
                            </div>
                            <div
                              className="relative overflow-hidden rounded-full w-6 h-6 lg:w-10 lg:h-10 hover:cursor-custom"
                              onClick={() => {
                                setSelectedNFTTabID(1);
                              }}
                            >
                              <Image
                                alt="C.Master"
                                className="object-cover object-center"
                                src={"/nft/nft2.png"}
                                fill
                              />
                            </div>
                            <div
                              className="relative overflow-hidden rounded-full w-6 h-6 lg:w-10 lg:h-10 hover:cursor-custom"
                              onClick={() => {
                                setSelectedNFTTabID(2);
                              }}
                            >
                              <Image
                                alt="K.Kun"
                                className="object-cover object-center"
                                src={"/nft/nft3.png"}
                                fill
                              />
                            </div>
                            <div
                              className="relative overflow-hidden rounded-full w-6 h-6 lg:w-10 lg:h-10 hover:cursor-custom"
                              onClick={() => {
                                setSelectedNFTTabID(3);
                              }}
                            >
                              <Image
                                alt="Pen-Man"
                                className="object-cover object-center"
                                src={"/nft/nft4.png"}
                                fill
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Tab 4 */}
                      {selectedTabID === 3 && (
                        <p className="text-2xl font-[Bevan]">Vision</p>
                      )}
                    </div>
                    <div className="h-full relative overflow-auto p-4">
                      {/* Tab 1 */}
                      {selectedTabID === 0 && (
                        <div className="pb-16">
                          <div className="px-4 flex gap-8">
                            <p className="w-full text-xs lg:text-lg font-[Algol]">
                              [On the Track, In Full Stride]
                              <br />
                              Earth experiences an unprecedented phenomenon one
                              day.
                              <br />
                              As the gravitational pull suddenly weakens, stones
                              that have been floating for a long time and were
                              balanced by the Earth’s gravity, start to emerge.
                              <br />
                              Cities across the globe are unexpectedly launched
                              into space.
                              <br />
                              Over time, the floating stones’ power dwindles
                              slowly.
                              <br />
                              In a new world order where the concept of
                              nation-states has disappeared, these floating
                              stones have become essential resources for cities
                              to survive.
                              <br />
                              In a time where peace has existed for millennia,
                              making traditional forms of warfare unnecessary,
                              cities must find innovative ways to compete for
                              the floating stones to ensure their safety.
                              <br />
                              The competition is held in the form of a sports
                              event known as Cosmo Athletic, where each city
                              sends a representative athlete to take part.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Tab 2 */}
                      {selectedTabID === 1 && (
                        <div className="pb-16">
                          <div className="px-4 h-full">
                            <p className="text-xs lg:text-lg font-[Algol]">
                              The city, situated at the center of the floating
                              district, is an amazing blend of Kyoto’s cultural
                              heritage and cutting-edge cosmic technology.
                              Kyoto’s soul blends harmoniously with the
                              technology of the universe, creating a unique
                              level of experiential wonder.
                              <br />
                              <br />
                              Here, the essence of history and the wonders of
                              advanced space technology come together in perfect
                              harmony, and the “Cosmo Kyoto Stadium” serves as a
                              symbolic location for this fusion.
                              <br />
                              <br />
                              The stadium blends the charm of traditional Kyoto
                              with advanced space-age technology, acting as a
                              hub for diverse sporting events and innovative
                              sports of the present and future. You can
                              experience a unique blend of tradition and
                              modernity at this destination, where peaceful
                              temples and gardens exude the aroma of ancient
                              culture.
                              <br />
                              <br />
                              Try to visit Cosmo Kyoto. Here, you can witness
                              the fusion of past and future, nature and
                              technology, and discover the harmonious blend of
                              space and Kyoto, along with all the manifestations
                              of human creativity.
                              <br />
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Tab 3 */}
                      {selectedTabID === 2 && (
                        <div className="pb-4 lg:pb-16 h-full">
                          <div className="px-6  h-full">
                            {/* NFT 1 */}
                            {selectedNFTTabID === 0 && (
                              <div className="flex gap-4 lg:gap-8 h-full pb-4">
                                <div className="basis-1/3 relative w-full h-full border-black border-solid border-2">
                                  <Image
                                    alt="AkaRanger"
                                    className="object-cover object-center"
                                    src={"/nft/nft1.webp"}
                                    fill
                                  />
                                </div>
                                <div className="basis-2/3">
                                  <h2 className="font-bold text-2xl lg:text-4xl mb-2 font-[Bevan]">
                                    AkaRanger
                                  </h2>
                                  <p className="text-xs lg:text-lg font-[Algol]">
                                    A seasoned NFT and coin industry veteran and
                                    a member of prominent exchange, has had a
                                    significant impact. He has made a lasting
                                    impact on the blockchain industry and has
                                    also had a significant influence on various
                                    trades and partnerships.
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* NFT 2 */}
                            {selectedNFTTabID === 1 && (
                              <div className="flex gap-4 lg:gap-8 h-full pb-4">
                                <div className="basis-1/3 relative w-full h-full border-black border-solid border-2">
                                  <Image
                                    alt="C.Master"
                                    className="object-cover object-center"
                                    src={"/nft/nft2.webp"}
                                    fill
                                  />
                                </div>
                                <div className="basis-2/3">
                                  <h2 className="font-bold text-2xl lg:text-4xl mb-2 font-[Bevan]">
                                    C.Master
                                  </h2>
                                  <p className="text-xs lg:text-lg font-[Algol]">
                                    As a team member of a major company in the
                                    past, he has achieved quantitative results
                                    in various development projects and is now a
                                    seasoned veteran of the NFT industry. His
                                    exceptional ability and passion will lead to
                                    the creation of new quests and challenges on
                                    his future journey, while his
                                    accomplishments will continue to light up
                                    the blockchain ecosystem.
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* NFT 3 */}
                            {selectedNFTTabID === 2 && (
                              <div className="flex gap-4 lg:gap-8 h-full pb-4">
                                <div className="basis-1/3 relative w-full h-full border-black border-solid border-2">
                                  <Image
                                    alt="K.Kun"
                                    className="object-cover object-center"
                                    src={"/nft/nft3.webp"}
                                    fill
                                  />
                                </div>
                                <div className="basis-2/3">
                                  <h2 className="font-bold text-2xl lg:text-4xl mb-2 font-[Bevan]">
                                    K.Kun
                                  </h2>
                                  <p className="text-xs lg:text-lg font-[Algol]">
                                    A seasoned software engineer and passionate
                                    gamer, has spearheaded web and game
                                    engineering teams and made valuable
                                    contributions to numerous projects at
                                    Blizzard, a highly acclaimed gaming firm. In
                                    both gaming and business, he has achieved
                                    remarkable success.
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* NFT 4 */}
                            {selectedNFTTabID === 3 && (
                              <div className="flex gap-4 lg:gap-8 h-full pb-4">
                                <div className="basis-1/3 relative w-full h-full border-black border-solid border-2">
                                  <Image
                                    alt="Pen-Man"
                                    className="object-cover  object-center"
                                    src={"/nft/nft4.webp"}
                                    fill
                                  />
                                </div>
                                <div className="basis-2/3">
                                  <h2 className="font-bold text-2xl lg:text-4xl mb-2 font-[Bevan]">
                                    Pen-Man
                                  </h2>
                                  <p className="text-xs lg:text-lg font-[Algol]">
                                    He has worked closely with animation
                                    powerhouses such as Nickelodeon, BlueSky
                                    Studios, and Bento Box Entertainment on
                                    multiple projects, gaining extensive
                                    experience in collaboration. He has made
                                    contributions that span across a variety of
                                    media, including television programs and
                                    cartoon series for children and teenagers,
                                    as well as popular computer-animated films.
                                    As a result, he is extremely skilled in the
                                    field of animation.
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Tab 4 */}
                      {selectedTabID === 3 && (
                        <div className="pb-16">
                          <div className="px-4">
                            <p className="text-xs lg:text-lg font-[Algol]">
                              Oi intends to introduce a new token at the same
                              time as the Genesis Mint project is launched. The
                              most critical aspect of the project is the token
                              launch, which will happen quickly compared to any
                              other task.
                              <br />
                              <br />
                              Beyond the Genesis Mint project, there are plans
                              to coordinate official licensing partnerships and
                              carefully plan and construct a long-term ecosystem
                              vision.
                              <br />
                              <br />
                              To start with, we will provide merchandise to
                              holders that has been jointly developed with
                              designers from different brands and is not purely
                              for display.
                              <br />
                              <br />
                              The project will continuously improve, grow, and
                              aim for further achievements by taking these
                              steps.
                              <br />
                              <br />
                              Oi has the necessary skills for the project and is
                              enthusiastic about working with professionals who
                              are truly passionate about the ongoing project. We
                              are open to receiving genuine interest and backing
                              for this project.
                              <br />
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div className="opacity-0 w-0 h-0 overflow-hidden">
        <Image
          alt="TV"
          className=""
          width={2000}
          height={2000}
          src={"/assets/tv_retro.webp"}
        />
        <Image
          alt=""
          className="w-full h-full select-none object-contain relative z-30"
          src={"/assets/tablet_11.webp"}
          width={2000}
          height={2000}
        />
        <video muted loop playsInline>
          <source src="/desktop/tv_noise.webm" type="video/webm" />
        </video>

        <Image
          alt="AkaRanger"
          className="object-cover"
          src={"/nft/nft1.png"}
          fill
        />
        <Image
          alt="C.Master"
          className="object-cover"
          src={"/nft/nft2.png"}
          fill
        />
        <Image
          alt="K.Kun"
          className="object-cover"
          src={"/nft/nft3.png"}
          fill
        />
        <Image
          alt="Pen-Man"
          className="object-cover"
          src={"/nft/nft4.png"}
          fill
        />
      </div>
    </div>
  );
}
