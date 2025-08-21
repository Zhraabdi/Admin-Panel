import { useState, useEffect } from "react";
import { useUI } from "../context/UIContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, deleteProduct, deleteProductsByIds } from "../api/products";
import DeleteModal from "../components/DeleteModal";
import EditProductModal from "../components/EditProductModal";
import AddProductModal from "../components/AddProductModal";
import Pagination from "../components/Pagination";
import BulkDeleteModal from "../components/BulkDeleteModal";
import { toast } from "react-toastify";

function Products() {
  const { state, dispatch } = useUI();
  const queryClient = useQueryClient();

  const searchTerm = state.searchTerm;
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedIds, setSelectedIds] = useState([]);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const { data, isPending, isError } = useQuery({
    queryKey: ["products", page, limit, searchTerm],
    queryFn: () => getProducts(page, limit, searchTerm),
    keepPreviousData: true,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"], exact: false });
      dispatch({ type: "CLOSE_MODAL" });
      toast.success("محصول با موفقیت حذف شد ");
    },
    onError: () => {
      toast.error("خطا در حذف محصول ");
    },
  });
  

  const bulkMutation = useMutation({
    mutationFn: deleteProductsByIds,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"], exact: false });
      setIsBulkDeleteOpen(false);
      setSelectedIds([]);
      toast.success("محصولات انتخابی با موفقیت حذف شدند ");
    },
    onError: () => {
      toast.error("خطا در حذف گروهی ");
    },
  });
  
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <span className="loader-ring"></span>
      </div>
    );
  }
  
  if (isError && !data) return toast.error("خطا در دریافت محصولات");

  return (
    <div className="max-w-[1140px] flex flex-col mx-3">
      <div className="max-w-[1140px]  flex justify-between items-center px-4 my-9">
        <div className="flex gap-2 items-center ">
        <img src="/images/setting.svg" alt="setting" />
        <h2>مدیریت کالا</h2>
        </div>
        <div className="flex gap-3 text-base">
          {selectedIds.length > 0 && (<button className="px-3 py-1 rounded-md border bg-bluecustom text-white" onClick={() => setIsBulkDeleteOpen(true)}>  حذف گروهی ({selectedIds.length})</button>)}
          <button className="px-3 py-1 rounded-md border bg-bluecustom text-white" onClick={() => dispatch({ type: "OPEN_ADD_MODAL" })}>  افزودن محصول</button>
        </div>
      </div>
    <div className="border border-grayborder rounded-[30px] w-full h-[700px] overflow-x-auto">
    <table className="w-full border-collapse min-w-[600px]">
        <thead className="border-t border-grayborder bg-graycustom h-20">
          <tr className="border-b border-grayborder last:border-b-0">
            <th className="px-4 py-3 text-right font-medium">نام کالا</th>
            <th className="px-4 py-3 text-right font-medium">موجودی</th>
            <th className="ppx-4 py-3 text-right font-medium">قیمت</th>
            <th className="px-4 py-3 text-right font-medium">شناسه</th>
            <th className="px-4 py-3 text-right font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.length > 0 ? (
            data.data.map((p) => (
              <tr key={p.id}  className="border-b border-graycustom last:border-b-0">
                <td  className="px-4 py-3 flex gap-3 checked:bg-blue-600 checked:border-blue-600 "><input type="checkbox" checked={selectedIds.includes(p.id)} onChange={() => toggleSelect(p.id)}/>{p.name} </td>
                <td className="px-4 py-3">{p.quantity}</td>
                <td className="px-4 py-3">{p.price} هزار تومان</td>
                <td className="px-4 py-3">{p.id}</td>
                <td className="px-4 py-3 flex gap-4 justify-end">
                  <img className="cursor-pointer" onClick={() => dispatch({ type: "OPEN_EDIT_MODAL", payload: p })} src="/images/edit.svg" alt="" />
                  <img className="cursor-pointer" onClick={() => dispatch({ type: "OPEN_MODAL", payload: p.id }) } src="/images/trash.svg" alt="" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4"> هیچ محصولی پیدا نشد</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      <Pagination page={page} setPage={setPage} totalPages={data?.totalPages || 1} />
      <EditProductModal />
      {state.isAddModalOpen && ( <AddProductModal onClose={() => dispatch({ type: "CLOSE_ADD_MODAL" })} />)}
      {state.isModalOpen && (
      <DeleteModal
      message="آیا از حذف این محصول مطمئنید؟"
      onConfirm={() => deleteMutation.mutate(state.selectedProductId)}
      onCancel={() => dispatch({ type: "CLOSE_MODAL" })}
      />
      )}
      {isBulkDeleteOpen && ( <BulkDeleteModal ids={selectedIds}  onConfirm={() => bulkMutation.mutate(selectedIds)} onCancel={() => setIsBulkDeleteOpen(false)}/>)}
    </div>
  );
}

export default Products;

