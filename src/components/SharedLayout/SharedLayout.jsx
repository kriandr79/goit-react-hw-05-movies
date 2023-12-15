import { Suspense } from 'react';
import { Outlet, Link } from 'react-router-dom';
import css from './SharedLayout.module.css'

const SharedLayout = () => {
  return (
    <>
      <header>
        <div className={css.headercontainer}>
          <nav className={css.navlinkswrapper}>
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
          </nav>
        </div>
      </header>
      <main>
        <div className={css.maincontainer}>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </>
  );
};

export default SharedLayout;
