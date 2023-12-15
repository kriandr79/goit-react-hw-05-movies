import { ThreeCircles } from 'react-loader-spinner';
import css from './Loader.module.css';

function Loader() {
  return (
    <div className={css.loader}>
      <ThreeCircles height="60" width="60" color="#4fa94d" />
    </div>
  );
}

export default Loader;
