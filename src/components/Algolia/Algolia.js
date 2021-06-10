import algoliasearch from "algoliasearch";

const client = algoliasearch('WM2R73MT8D', '8f1fea58043949f2ba7714b32998a65d');
const index = client.initIndex("Property");



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
  function SearchSame(searchText) {
    index
      .search(searchText)
      .then(({ hits }) => {
        resultProperty = hits;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  SearchSame(searchText);
  return resultProperty;
};
