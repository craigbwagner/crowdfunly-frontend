import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "./CampaignsList.css";
import { Link } from "react-router-dom";

function CampaignsList({ campaigns }) {
  const [rowData, setRowData] = useState([]);

  const LinkCellRenderer = (params) => (
    <Link to={"/campaigns/" + params.data._id}>{params.data.title}</Link>
  );

  const currencyFormatter = (params) => {
    return "$" + formatNumber(params.value);
  };

  const formatNumber = (number) => {
    return Math.floor(number).toLocaleString();
  };

  const columns = [
    {
      headerName: "Title",
      field: "title",
      filter: true,
      filterParams: {
        closeOnApply: true,
        filterOptions: ["contains"],
      },
      cellRenderer: LinkCellRenderer,
      flex: 2,
      minWidth: 200,
      cellClass: "center-cell",
    },
    {
      headerName: "Goal",
      field: "goalAmount",
      flex: 1,
      minWidth: 100,
      cellClass: "centered-cell",
      valueFormatter: currencyFormatter,
    },
    {
      headerName: "Amount Raised",
      field: "amountRaised",
      minWidth: 180,
      flex: 1,
      cellClass: "centered-cell",
      valueFormatter: currencyFormatter,
    },
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
      flex: 1,
      minWidth: 160,
      cellClass: "centered-cell",
    },
    {
      headerName: "Type",
      field: "campaignType",
      filter: true,
      filterParams: {
        closeOnApply: true,
        filterOptions: ["contains"],
      },
      flex: 1,
      minWidth: 150,
      cellClass: "centered-cell",
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
        _id: campaign._id,
      }));
      setRowData(campaignsArr);
    };
    setRows();
  }, [campaigns]);

  return (
    <>
      <h1>Welcome to Crowdfunly!</h1>
      <p>Browse our available campaigns below and find a cause that speaks to you. Your support makes all the difference!</p>
      <div className="campaignslist-container">
        <div className="campaigns-container">
          <div className="ag-theme-quartz" style={{ height: 500 }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columns}
              pagination={true}
              paginationPageSize={10}
              paginationPageSizeSelector={false}
              frameworkComponents={{
                LinkCellRenderer,
              }}
              domLayout="autoHeight"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CampaignsList;
