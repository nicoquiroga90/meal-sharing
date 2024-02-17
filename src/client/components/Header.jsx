function Header() {
  return (
    <header style={headerStyle}>
      <div style={logoStyle}>🍖</div>
      <h2 style={titleStyle}>meal-sharing</h2>
    </header>
  );
}

const headerStyle = {
  width: '100%',
  backgroundColor: '#f2f2f2',
  padding: '20px',
  borderBottom: '1px solid #ccc',
  display: 'flex',
  flexDirection: 'column',
};

const logoStyle = {
  fontSize: '36px',
};

const titleStyle = {
  fontSize: '16px',
  margin: '5px 0 0 0',
};

export default Header;
