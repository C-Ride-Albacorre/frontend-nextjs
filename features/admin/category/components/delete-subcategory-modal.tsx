import Modal from "@/components/layout/modal";
import { Button } from "@/components/ui/buttons/button";

export default function DeleteSubCategoryModal({
  deleteSubCategoryModalOpen,
  handleCloseDeleteSubcategoryModal,
  subcategoryToDelete,
  handleDeleteSubcategory,
  deleteSubcategoryLoading,
}: {
  deleteSubCategoryModalOpen: boolean;
  handleCloseDeleteSubcategoryModal: () => void;
  subcategoryToDelete: { id: string; name: string } | null;
  handleDeleteSubcategory: (id: string, name: string) => void;
  deleteSubcategoryLoading: boolean;
}) {
  return (
    <Modal
      wrapperClassName="max-w-md"
      isModalOpen={deleteSubCategoryModalOpen}
      onClose={() => handleCloseDeleteSubcategoryModal()}
    >
      <div className="flex flex-col justify-center items-center gap-6">
        <h4 className="font-medium text-lg">Delete Confirmation</h4>

        <div className="text-sm text-center text-neutral-600 leading-6">
          Are you sure you want to delete this "
          <h2 className="text-primary-text-100 inline font-medium">
            {subcategoryToDelete?.name}
          </h2>
          " category? This action cannot be undone.
        </div>

        <div className="flex w-full gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handleCloseDeleteSubcategoryModal}
            className="flex-1"
            disabled={deleteSubcategoryLoading}

          >
            Cancel
          </Button>

          <Button
            variant="red"
                  size="icon"
            onClick={() => {
              if (subcategoryToDelete) {
                handleDeleteSubcategory(
                  subcategoryToDelete.id,
                  subcategoryToDelete.name,
                );
              }
          
            }}
            disabled={deleteSubcategoryLoading}

            className="flex-1"
          >
            {deleteSubcategoryLoading ? "Deleting..." : "Yes, Confirm Delete"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
