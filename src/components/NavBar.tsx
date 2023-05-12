import Logo from '../assets/img/logo.svg'

const NavBar = ({downloadFunc}) => {
  return (
    <>
      <div className='w-full '>
        <div className="h-16 bg-white border-b border-solid border-gray-300 px-6 flex text-base text-gray-700 items-center font-medium">
          <div className="logo flex items-center gap-2 ">
            <div>
              <a href="/">
                <img src={Logo} alt="EZ Resume" width="124" />
              </a>
            </div>
          </div>
          <div className="grow"></div>
          <div className="h-full flex items-center gap-2">
            <button className="bg-blue-700 py-1 px-4 text-white rounded-md h-10 flex items-center gap-2 font-normal transition hover:bg-blue-600" onClick={downloadFunc}><svg viewBox="0 0 24 24" width="1em" height="1em" className="text-lg"><path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" fill="currentColor"></path></svg> Download</button></div>
        </div>
      </div>
    </>
  )
}

export default NavBar