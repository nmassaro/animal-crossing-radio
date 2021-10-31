export const ImageCard = ({ src, children }) => {
  return (
    <div className="w-64 shadow-lg rounded-2xl bg-white dark:bg-gray-800">
      <div className="flex flex-col items-center justify-center p-4 space-y-4">
        <a href="#" className="block relative">
          <img alt="Album Art" src={src} className="mx-auto rounded-2xl h-48 w-48 shadow" />
        </a>
        {children}
      </div>
    </div>
  )
}