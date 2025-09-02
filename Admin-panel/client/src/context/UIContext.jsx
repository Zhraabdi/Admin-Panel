import { createContext, useReducer, useContext } from "react";

const UIContext = createContext();

const initialState = {
  isModalOpen: false,         
  selectedProductId: null,
  isEditModalOpen: false,     
  editingProduct: null,
  isAddModalOpen: false,       
  isBulkDeleteModalOpen: false, 
  selectedIds: [],
  searchTerm: "",
      
};

const uiReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MODAL":  return { ...state, isModalOpen: true, selectedProductId: action.payload };

    case "CLOSE_MODAL": return { ...state, isModalOpen: false, selectedProductId: null };

    case "OPEN_EDIT_MODAL": return { ...state, isEditModalOpen: true, editingProduct: action.payload };

    case "CLOSE_EDIT_MODAL": return { ...state, isEditModalOpen: false, editingProduct: null };

    case "OPEN_ADD_MODAL": return { ...state, isAddModalOpen: true };

    case "CLOSE_ADD_MODAL": return { ...state, isAddModalOpen: false };

    case "OPEN_BULK_DELETE_MODAL": return { ...state, isBulkDeleteModalOpen: true, selectedIds: action.payload };
    
    case "CLOSE_BULK_DELETE_MODAL": return { ...state, isBulkDeleteModalOpen: false, selectedIds: [] };

    case "SET_SEARCH": return { ...state, searchTerm: action.payload };

    default: return state;
  }
};

export function UIProvider({ children }) {
  const [state, dispatch] = useReducer(uiReducer, initialState);
  return (
    <UIContext.Provider value={{ state, dispatch }}>
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);
