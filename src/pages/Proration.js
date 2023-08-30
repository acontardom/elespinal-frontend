import MainNavbar from "../components/NavbarMain";
import ProrationNav from "../components/prorationNav";
import ProrationTab from "../components/prorationTab";


function ProrationPage() {
    return (
        <div>
          <div>
            <MainNavbar></MainNavbar>
          </div>
          <br />
          <div>
            <ProrationNav></ProrationNav>
          </div>
          <br />
          <div>
            <ProrationTab></ProrationTab> 
          </div>
        

        </div>
      );
    }

export default ProrationPage;