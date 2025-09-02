import { TbArrowBigRightFilled } from "react-icons/tb";
import { TbArrowBigLeftFilled } from "react-icons/tb";

function Pagination({ page, setPage, totalPages }) {
  const previousHandler = () => {
    if (page <= 1) return;
    setPage((p) => p - 1);
  };

  const nextHandler = () => {
    if (page >= totalPages) return;
    setPage((p) => p + 1);
  };

  const getPageNumbers = () => {
    let start = Math.max(page - 1, 1);
    let end = Math.min(start + 2, totalPages);
    if (end - start < 2) {
      start = Math.max(end - 2, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center mt-9 gap-4">

    <button onClick={previousHandler} disabled={page === 1} className={page === 1 ? "text-bluecustom opacity-50 cursor-not-allowed" : ""}><TbArrowBigRightFilled size={40} className={page === 1 ? "text-bluecustom" : "text-bluecustom"}/> </button>

    {getPageNumbers().map((num) => (<button key={num}  onClick={() => setPage(num)} className={num === page ? "bg-bluecustom text-white border border-bluecustom rounded-[50%] pt-[8px] pb-[6px] px-[15px] " : " text-gray-400 border border-gray-400 rounded-[50%] pt-[8px] pb-[6px] px-[15px]"}> {num}</button> ))}

    <button onClick={nextHandler} disabled={page === totalPages} className={page === totalPages ? "text-bluecustom opacity-50 cursor-not-allowed" : ""}><TbArrowBigLeftFilled size={40} className={page ===2 ? "text-bluecustom" : "text-bluecustom"} /></button>

    </div>
  );

}

export default Pagination;
