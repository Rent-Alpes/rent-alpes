import algoliasearch from "algoliasearch";
import { useState } from "react";
import app from "firebase/app";

const client = algoliasearch("WM2R73MT8D", "8f1fea58043949f2ba7714b32998a65d");
const index = client.initIndex("Property");
var resultProperty;

export const AddProperty = (propertyValues, propertyId) => {
  const objects = propertyValues;
  objects.objectID = propertyId;
  index.saveObjects(objects);
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
