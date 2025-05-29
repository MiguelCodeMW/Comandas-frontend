import Button from "../Button/Button";
import styles from "./ErrorMessage.module.css";
import { NAMES } from "../../utils/Constants/text";
import { ErrorMessageProps } from "../../utils/ErrorMessageProps";

// interface ErrorMessageProps {
//   message: string;
//   onRetry?: () => void;
// }

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>{message}</p>
      {onRetry && <Button onClick={onRetry} text={NAMES.REINTENTAR} />}
    </div>
  );
};

export default ErrorMessage;
