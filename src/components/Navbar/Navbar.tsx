import React from 'react';
import { Link } from 'react-router-dom';
import Text from '../Text/Text';
import styles from './Navbar.module.scss';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">
          <Text textType="heading-sm" textWeight="bold" textColor="primary">
            Hack the 6ix
          </Text>
        </Link>
      </div>
      <div className={styles.links}>
        <Link to="/about">
          <Text textType="heading-sm" textWeight="bold" textColor="primary">
            About
          </Text>
        </Link>
        <Link to="/schedule">
          <Text textType="heading-sm" textWeight="bold" textColor="primary">
            Schedule
          </Text>
        </Link>
        <Link to="/sponsors">
          <Text textType="heading-sm" textWeight="bold" textColor="primary">
            Sponsors
          </Text>
        </Link>
        <Link to="/faq">
          <Text textType="heading-sm" textWeight="bold" textColor="primary">
            FAQ
          </Text>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar; 