import { Disclosure } from '@headlessui/react';
import logo from '../../../assets/logo.png';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';
import { ALL_ROUTES_PATHS } from '../../../utils/routes';

export default function Header() {
  return (
    <div className="w-full fixed top-0 z-50">
      <Disclosure as="nav" className={`relative headerPurpleBG z-50`}>
        {() => (
          <>
            <div className="mx-auto px-4 sm:px-6 lg:px-8 z-50">
              <div className="flex h-16 sm:h-20 justify-between z-50">
                <div className="flex z-50">
                  <Link to={ALL_ROUTES_PATHS.LANDING} className="flex z-20">
                    <div className="flex flex-shrink-0 items-center">
                      <img className={`${classes.logo} z-20`} src={logo} alt="Recipe maker" />
                    </div>
                    <div
                      className={`${classes.reduceLineHeight} text-xs sm:text-xl lg:text-2xl ml-4 flex items-center bold text-indigo-300 max-w-min xl:max-w-max font-semibold`}>
                      Recipe Maker
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </div>
  );
}
