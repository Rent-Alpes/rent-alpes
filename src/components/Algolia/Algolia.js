import algoliasearch from 'algoliasearch';
import app from "firebase/app";

const client = algoliasearch("WM2R73MT8D", "8f1fea58043949f2ba7714b32998a65d");
const index = client.initIndex("Property");
var resultProperty;

export const AddProperty = (propertyValues, propertyId) => {
  const objects = propertyValues;
  objects.objectID = propertyId;
  index.saveObject(objects);
};

export const UpdateAlgolia = (propertyValues, propertyId) => {
  const objects = propertyValues;
  objects.objectID = propertyId;
  index.saveObject(objects);
};
export const DeleteAlgolia = (propertyId) => {
  index.deleteObject(propertyId)
};
export const SearchProperty = (searchText) => {

  index.search(searchText)
    .then(({ hits }) => {
      resultProperty = hits;
    }).catch(err => {
      console.log(err);
    });
    return resultProperty;
}
  // //SearchSame(searchText);
  // index.search(searchText, {
  //   minWordSizefor1Typo: 3,
  //   minWordSizefor2Typos: 3,
  //   allowTyposOnNumericTokens: true
  // })
  //   .then(({ hits }) => {
  //     console.log("No result");
  //     console.log(hits);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });



export  const  SynchPropertys = async () => {
  const propertyList = await GetProperty();
    index.saveObjects(propertyList);
}
async function GetProperty(){
  const db = app.firestore();
  const citiesRef = db.collection('Property');
  const snapshot = await citiesRef.get();
  var propertyList= [];
  snapshot.forEach(doc => {
    const property = doc.data();
    property.objectID = doc.id;
    propertyList.push(property);
  });
  return propertyList;
}
