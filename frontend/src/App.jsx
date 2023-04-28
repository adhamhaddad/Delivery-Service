import { useEffect } from 'react';
import io from 'socket.io-client';
import Header from './components/common/header';
import Main from './components/common/main';
import Footer from './components/common/footer';

const socket = io.connect('http://localhost:3000');
const App = () => {
  useEffect(() => {
    socket.on('connect', (data) => {
      // console.log(data);
    });
  }, []);

  return (
    <>
      <Header />
      <Main socket={socket} />
      <Footer />
    </>
  );
};

export default App;
