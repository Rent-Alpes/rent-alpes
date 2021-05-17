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
          <div className="py-2 align-middle inline-block min-w-full sm:px-4 lg:px-5">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
  
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-2xl font-medium text-gray-500 tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-2xl font-medium text-gray-500 tracking-wider"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-2xl font-medium text-gray-500 tracking-wider"
                    >
                     Country
                    </th>
                  
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-2xl font-medium text-gray-500 tracking-wider"
                    >
                      Traveler
                    </th>
             
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-2xl font-medium text-gray-500 tracking-wider"
                    >
                      Available
                    </th>
                
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300" >
             
                    {propertylist && propertylist.map (
                      (property )=>
                      <tr key={property.name}>
                 
                 <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img className="h-30 w-40 rounded-full" src={property.thumb} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-base font-medium text-gray-900">{property.name}</div>
                        </div>
                      </div>
                    </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-base text-gray-900">{property.address}</div>
                        <div className="text-base text-gray-500">{property.city}</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-base text-gray-500">{property.country}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-base text-gray-500">{property.traveler}</td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Free
                        </span>
                      </td>
                      {/*Edition property*/}
                      <td >                     
                         <button to="/editdataproperty"  className="w-full focus:outline-none text-white text-sm mb-4 p-3 rounded-md bg-yellow-500 hover:bg-yellow-600 hover:shadow-lg">
                         <a href="/editdataproperty">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        </a>
                        </button>
                      </td>

                {/*View property*/}
                   <td className=" whitespace-nowrap font-medium">
                     <button  className="w-full focus:outline-none text-white text-sm mb-4 p-3 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                     </svg>
                     </button>
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