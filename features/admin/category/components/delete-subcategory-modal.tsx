import Modal from "@/components/layout/modal";
import { Button } from "@/components/ui/buttons/button";

export default function DeleteSubCategoryModal({
  deleteSubCategoryModalOpen,
  handleCloseDeleteSubcategoryModal,
  subcategoryToDelete,
  handleDeleteSubcategory,
}: {
  deleteSubCategoryModalOpen: boolean;
  handleCloseDeleteSubcategoryModal: () => void;
  subcategoryToDelete: { id: string; name: string } | null;
  handleDeleteSubcategory: (id: string, name: string) => void;
}) {
  return (
    <Modal
      wrapperClassName="max-w-md"
      isModalOpen={deleteSubCategoryModalOpen}
      onClose={() => handleCloseDeleteSubcategoryModal()}
    >
      <div className="flex flex-col justify-center items-center gap-6">
        <h4 className="font-medium text-lg">Delete Confirmation</h4>

        <p className="text-sm text-center text-neutral-600 leading-6">
          Are you sure you want to delete this "
          <span className="text-primary-text-100">
            {subcategoryToDelete?.name}
          </span>
          " category? This action cannot be undone.
        </p>

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => handleCloseDeleteSubcategoryModal()}
          >
            Cancel
          </Button>

          <Button
            variant="red"
            onClick={() => {
              if (subcategoryToDelete) {
                handleDeleteSubcategory(
                  subcategoryToDelete.id,
                  subcategoryToDelete.name,
                );
              }
              handleCloseDeleteSubcategoryModal();
            }}
          >
            Confirm Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
