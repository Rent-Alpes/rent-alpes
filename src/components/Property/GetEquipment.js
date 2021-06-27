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

  return (
    <>
      <div className="flex mt-4 justify-between">
        <div>
          <input
            className="m-2"
            type="checkbox"
            id="1"
            value="Wifi"
            name="Wifi"
            onChange={handleCheck}
          />
          <label>Wifi</label>
          <br />

          <input
            className="m-2"
            type="checkbox"
            id="3"
            value="Sauna"
            name="Sauna"
            onChange={handleCheck}
          />
          <label>Sauna</label>
          <br />

          <input
            className="m-2"
            type="checkbox"
            id="4"
            value="Hall of sport"
            name="Hall of sport"
            onChange={handleCheck}
          />
          <label>Hall of sport</label>
          <br />

          <input
            className="m-2"
            type="checkbox"
            id="5"
            value="Transats"
            name="Transats"
            onChange={handleCheck}
          />
          <label>Transats</label>
          <br />
          <input
            className="m-2"
            type="checkbox"
            id="6"
            value="WaterPool"
            name="WaterPool"
            onChange={handleCheck}
          />
          <label>Water Pool</label>
          <br />

          <input
            className="m-2"
            type="checkbox"
            id="7"
            value="Barbecue"
            name="Barbecue"
            onChange={handleCheck}
          />
          <label>Barbecue</label>
          <br />

          <input
            className="m-2"
            type="checkbox"
            id="8"
            value="Ski Local"
            name="Ski Local"
            onChange={handleCheck}
          />
          <label>Ski Local</label>
          <br />
        </div>
        <div className="">
          <input
            className="m-2"
            type="checkbox"
            id="9"
            value="Fitness equipment"
            name="Fitness equipment"
            onChange={handleCheck}
          />
          <label>Fitness equipment</label>

          <br />
          <input
            className="m-2"
            type="checkbox"
            id="10"
            value="Garden"
            name="Garden"
            onChange={handleCheck}
          />
          <label>Garden</label>
          <br />
          <input
            className="m-2"
            type="checkbox"
            id="11"
            value="Patio"
            name="Patio"
            onChange={handleCheck}
          />
          <label>Patio</label>
          <br />

          <input
            className="m-2"
            type="checkbox"
            id="12"
            value="Panoramic view"
            name="Panoramic view"
            onChange={handleCheck}
          />
          <label>Panoramic view</label>
          <br />

          <input
            className="m-2"
            type="checkbox"
            id="13"
            value="Floor heating"
            name="Floor heating"
            onChange={handleCheck}
          />
          <label>Floor heating</label>
        </div>
      </div>
    </>
  );
};

export default GetEquipment;
