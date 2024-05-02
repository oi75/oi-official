import Image from 'next/image'

export const SwipeIndicator = () => {
  return (
    <div className=" fixed flex-col lg:hidden top-[300px] left-[100px]  z-50  justify-center">
      <Image
        alt="swipe indicator"
        className="w-[140px]"
        src={"/assets/swipe.gif"}
        width={600}
        height={600}
      />
      <h1 className=" text-[20px] w-[150px] text-black font-bold">
        Swipe to move in any direction
      </h1>
    </div>
  )
}