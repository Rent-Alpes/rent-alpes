import algoliasearch from 'algoliasearch';
import React, { useState } from "react";
import app from "firebase/app";

  const client = algoliasearch('WM2R73MT8D', '8f1fea58043949f2ba7714b32998a65d');
  const index = client.initIndex("Property");

 

  export const AddProperty = (propertyValues, propertyId) => {
    const objects  = [
      {
      objectID :propertyId,
      name: propertyValues.name,
      address: propertyValues.address,
      postalCode: propertyValues.postalCode,
      city: propertyValues.city,
      country: propertyValues.country,
      bathroom: propertyValues.bathroom,
      description: propertyValues.description,
      equipments: propertyValues.equipments,
      room: propertyValues.room,
      traveler: propertyValues.traveler,
    }
  ];
    index.saveObjects(objects);
  };


