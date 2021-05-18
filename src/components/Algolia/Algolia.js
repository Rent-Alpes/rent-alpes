import algoliasearch from 'algoliasearch';

const client = algoliasearch('WM2R73MT8D', '8f1fea58043949f2ba7714b32998a65d');
const index = client.initIndex("Property");

class Algolia {
    // Ajouter une propriété 
    addProperty = (objects) => 
        index.saveObjects(objects);

    //Recherche d'une propriété 
    searchProperty = (query) =>
        index.search(query).then(({ hits }) => {
            return hits;
          }).catch(err => {
            console.log(err);
          });;  
}

export default Algolia;