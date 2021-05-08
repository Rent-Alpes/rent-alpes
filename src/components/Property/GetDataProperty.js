import React, {useContext,useEffect,useState } from 'react';
import app from 'firebase/app';
import Firebase, { firebaseContext } from '../Firebase';



  const GetDataProperty = () => {

  /* const PropertyRef = app.collection('property');
   const querySnapshot =  PropertyRef.where('city', '==', true).get();*/
    const [user, setUser] = useState(null);
   // const [data, setData] = useState(null);
    
    const firebase = useContext(firebaseContext);
   // var user = firebase.auth().currentUser;
  //  console.log(user)

    
useEffect(()=>{
 firebase.auth.onAuthStateChanged(data=>{
    setUser(data);
  })
  if(!!user)
  {
    console.log(firebase.auth.X)
    
  }
})
  /*
  firebase.user(user.id)
  .get()
  .then(doc=>{

if(doc && doc.exists){
  const mydata=doc.data();
  setData(mydata)
}
  })
  .catch(erreur=>{
console.log(erreur)
  })
  return()=>{
    listener()
  }

},[])*/
 

    
  /* querySnapshot.forEach((doc) => {
     console.log(doc.id, "=>", doc.data());*/
    

    const initialPropertyValues = {
      name: "test",
      address: "test",
      description: "test",
      country:"test",
      traveler: "test",
    };
    



    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">

            {user && (
                        <p style={{ color: "white", fontSize: "large" }}>List of property : <span className="red-text"> {user.email} </span> </p>
                    )}
            
                    
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                     Description
                    </th>
                  
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Country
                    </th>
             
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Traveler
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
               
                    {<tr key={initialPropertyValues.name}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                      
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{initialPropertyValues.address}</div>
                            <div className="text-sm text-gray-500">{initialPropertyValues.postalCode}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{initialPropertyValues.city}</div>
                        <div className="text-sm text-gray-500">{initialPropertyValues.country}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{initialPropertyValues.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{initialPropertyValues.traveler}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="px-2 inline-flex text-xs leading-6 font-semibold rounded-full bg-green-100 text-green-800">
                          Update Property
                        </a>
                      </td>
                    </tr> 
                    }
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
export default GetDataProperty;