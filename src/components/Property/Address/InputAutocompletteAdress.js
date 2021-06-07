import React, { useContext } from "react";
import { HereProvider } from "leaflet-geosearch";
import AsyncSelect from "react-select/async";
import { firebaseContext } from "../../Firebase";

const InputAutocompletteAdress = (props) => {
  const firebase = useContext(firebaseContext);

  const {
    address: [address, setAddress],
  } = {
    address: React.useState([]),
    ...(props.state || {}),
  };
  const provider = new HereProvider({
    params: {
      apiKey: "eRz09NXRI4hfk_pkqkcZvZ-4DhsJLTEpBCiEfEgGxb8",
    },
  });

  const onChangeInput = (event) => {
    setAddress(event);
  };

  const loadOptions = async (inputValue, callback) => {
    try {
      await provider.search({ query: inputValue }).then(function (result) {
        callback(result.map((item) => item));
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {address && (
        <AsyncSelect
          onChange={onChangeInput}
          placeholder="écrivez votre adresse..."
          value={address}
          loadOptions={loadOptions}
        />
      )}
    </>
  );
};

export default InputAutocompletteAdress;
