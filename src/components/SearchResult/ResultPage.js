import CardItem from "./CardItem";

const ResultPage = () => {
  const propertyInfo = {
    address: "530 Route des Ponthieux",
    bathroom: 6,
    city: "Saint-Gervais-les-Bains",
    country: "France",
    description:
      "Ce merveilleux chalet niché près de Saint-Gervais-les-Bains dégage une atmosphère tranquille et chaleureuse, avec ses poutres apparentes en bois et sa cheminée bordée de pierres qui marque le cœur du chalet. Prenez votre café du matin sur la terrasse, suivi par une journée d'aventure sur les pistes à 5 minutes en voiture. Le soir, réchauffez-vous dans la piscine chauffée en contemplant la vue par la fenêtre, puis détendez-vous dans le sauna du chalet.",
    idUser: "GsA2tiwaaYV5CFBxVRYqa4HQIcx1",
    lat: "45.8919912",
    lon: "6.6927659",
    name: "Chalet Aster",
    postalCode: "74170",
    price: 1500,
    room: 6,
    surface: 320,
    traveler: 14,
  };

  return (
    <div class="flex flex-wrap overflow-hidden">
      <div class="my-3 px-3 w-full overflow-hidden sm:my-2 sm:px-2 sm:w-1/2 md:my-3 md:px-3 md:w-1/2 lg:my-3 lg:px-3 lg:w-1/4 xl:my-3 xl:px-3 xl:w-1/4">
        <CardItem
          name={propertyInfo.name}
          city={propertyInfo.city}
          price={propertyInfo.price}
          bathroom={propertyInfo.bathroom}
          room={propertyInfo.room}
          traveler={propertyInfo.traveler}
        />
      </div>

      <div class="my-3 px-3 w-full overflow-hidden sm:my-2 sm:px-2 sm:w-1/2 md:my-3 md:px-3 md:w-1/2 lg:my-3 lg:px-3 lg:w-1/4 xl:my-3 xl:px-3 xl:w-1/4">
        <CardItem
          name={propertyInfo.name}
          city={propertyInfo.city}
          price={propertyInfo.price}
        />
      </div>
      <div class="my-3 px-3 w-full overflow-hidden sm:my-2 sm:px-2 sm:w-1/2 md:my-3 md:px-3 md:w-1/2 lg:my-3 lg:px-3 lg:w-1/4 xl:my-3 xl:px-3 xl:w-1/4">
        <CardItem
          name={propertyInfo.name}
          city={propertyInfo.city}
          price={propertyInfo.price}
        />
      </div>
      <div class="my-3 px-3 w-full overflow-hidden sm:my-2 sm:px-2 sm:w-1/2 md:my-3 md:px-3 md:w-1/2 lg:my-3 lg:px-3 lg:w-1/4 xl:my-3 xl:px-3 xl:w-1/4">
        <CardItem
          name={propertyInfo.name}
          city={propertyInfo.city}
          price={propertyInfo.price}
        />
      </div>
      <div class="my-3 px-3 w-full overflow-hidden sm:my-2 sm:px-2 sm:w-1/2 md:my-3 md:px-3 md:w-1/2 lg:my-3 lg:px-3 lg:w-1/4 xl:my-3 xl:px-3 xl:w-1/4">
        <CardItem
          name={propertyInfo.name}
          city={propertyInfo.city}
          price={propertyInfo.price}
        />
      </div>
      <div class="my-3 px-3 w-full overflow-hidden sm:my-2 sm:px-2 sm:w-1/2 md:my-3 md:px-3 md:w-1/2 lg:my-3 lg:px-3 lg:w-1/4 xl:my-3 xl:px-3 xl:w-1/4">
        <CardItem
          name={propertyInfo.name}
          city={propertyInfo.city}
          price={propertyInfo.price}
        />
      </div>
    </div>
  );
};

export default ResultPage;
