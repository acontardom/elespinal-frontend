import React from "react";
import MainNavbar from "../components/NavbarMain";
import PeopleGrid from "../components/People";


function People() {
    return (
        <div>
          <div>
            <MainNavbar></MainNavbar>
          </div>
          <br />
            <div>
                <PeopleGrid></PeopleGrid>
            </div>

        </div>
      );
    }

export default People;