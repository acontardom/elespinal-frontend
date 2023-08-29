import HomeGroup from '../components/HomeGroup';
import HomeNavbar from '../components/homeNavbar';

function Home() {
    return (
        <div>
          <div>
            <HomeNavbar></HomeNavbar>
          </div>
          <br />
          <div>
            <HomeGroup></HomeGroup>
          </div>
          
          
        </div>
      );
    }

export default Home;