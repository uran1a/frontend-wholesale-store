import { useSelector } from 'react-redux';
import { IRootState } from '../../features/store';
import ValidationError from '../../types/ValidationError';

import styles from '../../styles/ValidationErrors.module.css';

const ValidationErrors = () => {
  const errors = useSelector((state: IRootState) => state.user.errors);

  return Array.isArray(errors) && errors.length > 0 ? (
    <div>
      {errors.map((error: ValidationError) => (
        <div className={styles.error} key={error.fieldName}>
          <strong>{error.fieldName}:</strong> {error.message}
        </div>
      ))}
    </div>
  ) : null;
};

export default ValidationErrors;