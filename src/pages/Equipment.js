import React from "react";
import MainNavbar from "../components/NavbarMain";
import EquipmentGrid from "../components/Equipments";


function Equipment() {
    return (
        <div>
          <div>
            <MainNavbar></MainNavbar>
          </div>
          <br />
            <div>
                <EquipmentGrid></EquipmentGrid>

            </div>

        </div>
      );
    }

export default Equipment;