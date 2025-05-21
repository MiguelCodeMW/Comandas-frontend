import api from "../../api/axio";
import { ROUTES } from "../../utils/Constants/routes";
import styles from "./Categoria.module.css";
import { NAMES } from "../../utils/Constants/text";
import { EliminarCategoriaProps } from "../../utils/Categoria/EliminarCategoriaProps";
import Button from "../Button/Button";

function EliminarCategoria({
  id,
  onCategoriaEliminada,
}: EliminarCategoriaProps) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(NAMES.CATEGORIA_ELIMINAR);
    if (!confirmDelete) return;

    try {
      await api.delete(ROUTES.CATEGORY_DETAIL.replace(":id", id.toString()));
      onCategoriaEliminada();
    } catch (error) {
      alert(NAMES.ALERTA_CATEGORIA);
      console.error(NAMES.ALERTA_CATEGORIA, error);
    }
  };

  return (
    <Button
      text={NAMES.ELIMINAR}
      onClick={handleDelete}
      className={[styles.button, styles.delete].join(" ")}
    />
  );
}

export default EliminarCategoria;
