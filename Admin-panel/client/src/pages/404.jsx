import { Link } from "react-router-dom";
function PageNotFound() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-20 ">
      <p className="text-[38px] text-center text-bluecustom">صفحه موردنظر پیدا نشد </p>
      <img className="w-[300px] " src="/images/error.png" alt="notfound" />
      <button  className="block w-64 h-11 rounded-2xl  text-white bg-bluecustom  font-normal"><Link to="/login">بازگشت</Link></button>
    </div>
  )
}

export default PageNotFound