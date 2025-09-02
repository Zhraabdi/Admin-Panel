function BulkDeleteModal({ ids, onConfirm, onCancel }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm">
      <div className="fixed bg-white rounded-[30px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[472px] h-[338px] max-w-[90vw] p-[50px] text-center flex flex-col items-center justify-between">
      <img className="w-24 h-24" src="/images/Close.png" alt="close" />
        <p>آیا از حذف این {ids.length} محصول مطمئنید؟</p>
         <div className="flex gap-3 justify-between items-center">
        <button className="px-3 py-1 w-28 rounded-md border bg-redcustom text-white" onClick={onConfirm} style={{ marginRight: "10px" }}>بله</button>
        <button className="px-3 py-1 w-28 rounded-md border bg-graytwo text-text" onClick={onCancel}>انصراف</button>
        </div>
      </div>
    </div>
  );
}

export default BulkDeleteModal;
