import React, { useEffect } from "react";
import { HereProvider } from "leaflet-geosearch";
import AsyncSelect from "react-select/async";

const InputAutocompletteAdress = () => {
  const [address, setAddress] = React.useState([]);
  const provider = new HereProvider({
    params: {
      apiKey: "eRz09NXRI4hfk_pkqkcZvZ-4DhsJLTEpBCiEfEgGxb8",
    },
  });

  useEffect(() => {
    console.log(address.raw.address.street);
  }, [address]);

  const onChangeInput = (event) => {
    setAddress(event);
    console.log(address);
  };

  const loadOptions = async (inputValue, callback) => {
    try {
      await provider.search({ query: inputValue }).then(function (result) {
        // do something with result;
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
          placeholder="Aqui"
          value={address}
          loadOptions={loadOptions}
        />
      )}
    </>
  );
};

export default InputAutocompletteAdress;
