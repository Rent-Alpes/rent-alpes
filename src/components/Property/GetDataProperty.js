import React, {useContext,useEffect,useState } from 'react';
import app from 'firebase/app';
import  { firebaseContext } from '../Firebase';



const GetDataProperty = () => {

const db=app.firestore();


    const [User, setUser] = useState(null);
    const [propertylist,setPropertylist]=useState([]);
    const firebase = useContext(firebaseContext);
  

    //Récupération de L'id  utilisateur
useEffect(()=>{
 firebase.auth.onAuthStateChanged(data=>{
    setUser(data);
    GetData(data.uid);
    
  })
 
},[User]
)

    const GetData=async (id) => {
      const response = db.collection("Property");
      const data = [];
      const items = await response
        .where("idUser", "==", id)
        .get();
      items.forEach((doc) => {
        //console.log(doc.data());
        data.push(doc.data());

    
      });
      setPropertylist(data);
      //console.log(data);
    };
 


    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
  
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                     Country
                    </th>
                  
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Traveler
                    </th>
             
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Available
                    </th>
                    <th scope="col" className="relative px-3 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200" >
             
                    {propertylist && propertylist.map (
                      (property )=>
                      <tr key={property.name}>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                      
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{property.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{property.address}</div>
                        <div className="text-sm text-gray-500">{property.city}</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{property.country}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{property.traveler}</td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="px-2 inline-flex text-xs leading-6 font-semibold rounded-full bg-green-100 text-green-800">
                          Update Property
                        </a>
                      </td>
                    </tr> 
                    )}
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
export default GetDataProperty;