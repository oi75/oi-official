import Image from 'next/image'

export const PageLoader = () => {
  return (
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
    </div>
  )

}