import React from "react";

export const GetEquipment = (props) => {
  const handleCheck = (e) => {
    if (e.target.checked) {
      props.setEquipmentlist([...props.Equipmentlist, e.target.value]);
    } else {
      props.setEquipmentlist(
        props.Equipmentlist.filter((equip) => equip !== e.target.value)
      );
    }
  };

  // console.log(checkedMap);

  return (
    <>
      <form>
        <label>Wifi</label>
        <input
          className="m-2"
          type="checkbox"
          id="1"
          value="Wifi"
          name="Wifi"
          onChange={handleCheck}
        />

        <label>Water Pool</label>
        <input
          className="m-2"
          type="checkbox"
          id="2"
          value="WaterPool"
          name="WaterPool"
          onChange={handleCheck}
        />

        <label>Sauna</label>
        <input
          className="m-2"
          type="checkbox"
          id="3"
          value="Sauna"
          name="Sauna"
          onChange={handleCheck}
        />
        <br />
        <label>Hall of sport</label>
        <input
          className="m-2"
          type="checkbox"
          id="4"
          value="Hall of sport"
          name="Hall of sport"
          onChange={handleCheck}
        />

        <label>Transats</label>
        <input
          className="m-2"
          type="checkbox"
          id="5"
          value="Transats"
          name="Transats"
          onChange={handleCheck}
        />

        <label>Water Pool</label>
        <input
          className="m-2"
          type="checkbox"
          id="6"
          value="WaterPool"
          name="WaterPool"
          onChange={handleCheck}
        />
        <br />
        <label>Barbecue</label>
        <input
          className="m-2"
          type="checkbox"
          id="7"
          value="Barbecue"
          name="Barbecue"
          onChange={handleCheck}
        />

        <label>Ski Local</label>
        <input
          className="m-2"
          type="checkbox"
          id="8"
          value="Ski Local"
          name="Ski Local"
          onChange={handleCheck}
        />
        <br />
        <label>Fitness equipment</label>
        <input
          className="m-2"
          type="checkbox"
          id="9"
          value="Fitness equipment"
          name="Fitness equipment"
          onChange={handleCheck}
        />

        <label>Garden</label>
        <input
          className="m-2"
          type="checkbox"
          id="10"
          value="Garden"
          name="Garden"
          onChange={handleCheck}
        />

        <label>Patio</label>
        <input
          className="m-2"
          type="checkbox"
          id="11"
          value="Patio"
          name="Patio"
          onChange={handleCheck}
        />
        <br />
        <label>Panoramic view</label>
        <input
          className="m-2"
          type="checkbox"
          id="12"
          value="Panoramic view"
          name="Panoramic view"
          onChange={handleCheck}
        />

        <label>Floor heating</label>
        <input
          className="m-2"
          type="checkbox"
          id="13"
          value="Floor heating"
          name="Floor heating"
          onChange={handleCheck}
        />
      </form>
    </>
  );
};

export default GetEquipment;
