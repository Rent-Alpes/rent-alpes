const CardItem = (props) => {
  return (
    <div className="wrapper antialiased text-gray-900">
      <div>
        <img
          src="https://source.unsplash.com/random/350x350"
          alt=" random image"
          className="w-full object-cover object-center rounded-lg shadow-md"
        />

        <div className="relative px-4 -mt-20 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-baseline">
              <div className="text-gray-600 uppercase text-xs font-semibold tracking-wider">
                {props.city}
              </div>
            </div>

            <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
              {props.name}
            </h4>

            <div className="mt-2">
              {props.price}€
              <span className="text-gray-600 text-sm"> /nuit</span>
            </div>
            <div className="mt-4">
              <span className="text-teal-600 text-md font-semibold">
                4/5 ratings{" "}
              </span>
              <span className="text-sm text-gray-600">
                (based on 234 ratings)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
