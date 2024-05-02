export const DirectionIndicator = () => {
  return (
    <div>
      <div className="fixed bottom-0 left-1/2 animate-pulse z-50">
        <i className="ri-arrow-down-s-fill text-white text-4xl"></i>
      </div>
      <div className="fixed top-1/2 right-4 animate-pulse z-50">
        <i className="ri-arrow-right-s-fill text-white text-4xl"></i>
      </div>
      <div className="fixed top-0 left-1/2 animate-pulse z-50">
        <i className="ri-arrow-up-s-fill text-white text-4xl"></i>
      </div>
      <div className="fixed top-1/2 left-4 animate-pulse z-50">
        <i className="ri-arrow-left-s-fill text-white text-4xl"></i>
      </div>
    </div>
  )
}