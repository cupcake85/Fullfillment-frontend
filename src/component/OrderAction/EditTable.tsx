import { useState } from "react";

const EditTable = () => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div>
      {isEdit ? (
        <button onClick={() => setIsEdit(false)}>1</button>
      ) : (
        <button onClick={() => setIsEdit(true)}>2</button>
      )}
    </div>
  );
};
export default EditTable;
