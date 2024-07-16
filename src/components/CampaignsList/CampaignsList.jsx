import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

function CampaignsList({ campaigns }) {
  const [rowData, setRowData] = useState([]);
  const columns = [
    {
      headerName: "Title",
      field: "title",
      filter: true,
      filterParams: {
        closeOnApply: true,
        filterOptions: ["contains"],
      },
    },
    { headerName: "Goal", field: "goalAmount" },
    { headerName: "Amount Raised", field: "amountRaised" },
    {
      headerName: "End Date",
      field: "endDate",
      valueFormatter: (params) =>
        new Date(params.value).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC",
        }),
    },
    {
      headerName: "Type",
      field: "campaignType",
      filter: true,
      filterParams: {
        closeOnApply: true,
        filterOptions: ["contains"],
      },
    },
  ];

  useEffect(() => {
    const setRows = async () => {
      const campaignsArr = await campaigns.map((campaign) => ({
        title: campaign.title,
        goalAmount: campaign.goalAmount,
        amountRaised: campaign.amountRaised,
        endDate: campaign.endDate,
        campaignType: campaign.campaignType,
      }));
      setRowData(campaignsArr);
    };
    setRows();
  }, [campaigns]);

  return (
    <div className="campaigns-container">
      <h1>Available Campaigns</h1>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={5}
          paginationPageSizeSelector={[20, 10, 5]}
        />
      </div>
    </div>
  );
}

export default CampaignsList;
