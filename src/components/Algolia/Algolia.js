import React, { useState, useEffect } from "react";
import algoliasearch from 'algoliasearch';
import app from "firebase/app";

const client = algoliasearch("WM2R73MT8D", "8f1fea58043949f2ba7714b32998a65d");
const index = client.initIndex("Property");
var filtered = false;
var resultProperty;
var filterParams = {
  maxprice: "",
  minprice: "",
  surface: "",
  room: "",
  traveler: "",
  bathroom: "",
};

export const ApplyFiltersParams = (filters, withFilters) => {
  filterParams = filters;
  filtered = withFilters;
};
export const SearchProperty = (searchText) => {
  index.setSettings({
    attributesForFaceting: [
      'searchable(name)',
      'searchable(city)',
      'searchable(country)',
      'searchable(description)',
      'filterOnly(price)',
      'filterOnly(bathroom)',
      'filterOnly(room)',
      'filterOnly(traveler)',
      'filterOnly(surface)',
    ],
    allowTyposOnNumericTokens: false,
    typoTolerance: 'min',
  }).then(() => {
  });

  if (filtered) {
    if (filterParams.minprice != "" && filterParams.maxprice != "") {
      var min = filterParams.minprice;
      var max = filterParams.maxprice;
      if (filterParams.minprice > filterParams.maxprice) {
        filterParams.minprice = max;
        filterParams.maxprice = min;
      }
    }
    var filters = "";
    for (var [key, value] of Object.entries(filterParams)) {
     var intValue = parseInt(value);
      if (value != "") {
        if (key == "maxprice") {
          filters += " price <= " + intValue + " AND"
        }
        else if (key == "minprice") {
          filters += " price >= " + intValue + " AND"
        }
        else {
          filters += " " + key + " >= " + intValue + " AND"
        }
      }
    };

    filters = filters.substr(0, filters.length - 3)
    index.search(searchText, {
      filters: filters
    })
      .then(({ hits }) => {
        resultProperty = hits;
      }).catch(err => {
        console.log(err);
      });
    return resultProperty;
  } 
  if (searchText == "" || searchText == " " || searchText == null || searchText == undefined) {
    let hits = [];
    index.browseObjects({
      query: '', // Empty query will match all records
      batch: batch => {
        hits = hits.concat(batch);
      }
    }).then(() => {
      resultProperty = hits;
    }).catch(err => {
      console.log(err);
    });
    return resultProperty;
  }
  else {
    index.search(searchText)
      .then(({ hits }) => {
        resultProperty = hits;
      }).catch(err => {
        console.log(err);
      });
    console.log(resultProperty);
    return resultProperty;
  }
}