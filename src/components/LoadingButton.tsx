import { Atom } from "react-loading-indicators"

const LoadingButton = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Atom color="#800080" size="small" />
      <h1 className="text-purple-500">loading please wait</h1>
    </div>
  )
}

export default LoadingButton
