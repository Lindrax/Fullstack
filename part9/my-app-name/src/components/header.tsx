interface Course {
  name: string;
}

const Header = ({ name }: Course) => {
  return <h1>{name}</h1>;
};

export default Header;
