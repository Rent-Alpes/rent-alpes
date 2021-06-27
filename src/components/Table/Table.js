import Table from "react-tailwind-table";

const TableReact = () => {
  const columns = [
    {
      field: "name",
      use: "Property",
    },
    {
      field: "startDate", //Object destructure
      use: "Start Date",
    },

    {
      field: "endDate",
      use: "End Date",
      // use_in_search:false
    },
    {
      field: "travelers",
      use: "Travelers",
      // use_in_search:false
    },
  ];

  return <Table columns={columns} rows={[]} />;
};

export default TableReact;
