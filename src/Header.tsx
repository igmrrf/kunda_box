import * as React from 'react';

interface IProps {
  name?: string;
}

const Header: React.FC<IProps> = ({ name }) => (
  <h4>Hello {name}!, Welcome to Kunda Box </h4>
);

Header.defaultProps = {
  name: 'World',
};

export default Header;
