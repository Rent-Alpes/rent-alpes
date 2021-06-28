import React, { useContext, useEffect, useState } from "react";
import app from "firebase/app";
import { firebaseContext } from "../Firebase";
import Table from "react-tailwind-table";

const ViewReview = () => {
  return (
    <div className="w-full">
      <div className="flex flex-row px-2 py-5">
        <span className="text-base inline-block align-middle pl-3 pr-5">
          Pablo Callejo
        </span>

        <div className="flex flex-col">
          <p className="text-2xl pb-4"> Super casa</p>
          <p className="text-base">
            l'histoire Ce texte latin, généralement utilisé, proviendrait d'un
            texte latin écrit par Cicéron en 45 avant J.-C., sans copier le
            texte original au complet, il reprendrait seulement certaines
            parties et ajouterait des fautes. Ainsi, le mot lorem proviendrait
            du latin dolorem donnant la traduction de dolorem ipsum : la
            douleur. Mais bon, le sens du texte latin en lui-même n'a que très
            peu d'intérêt dans l'utilisation de faux texte. L'intérêt étant
            surtout d'avoir du contenu en attendant que le texte final soit
            livré, permettant ainsi aux graphistes d'avancer sur les maquettes
            sans avoir à attendre les contributions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewReview;
