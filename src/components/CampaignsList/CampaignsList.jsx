import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

function CampaignsList({ campaigns }) {
  const [selectedType, setSelectedType] = useState("");
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    {
      field: "Title",
      filter: true,
      filterParams: {
        closeOnApply: true,
        filterOptions: ["contains"],
      },
    },
    { field: "Goal" },
    { field: "Amount Raised" },
    { field: "End Date" },
    {
      field: "Type",
      filter: true,
      filterParams: {
        closeOnApply: true,
        filterOptions: ["contains"],
      },
    },
  ]);

  useEffect(() => {
    const setRows = async () => {
      console.log(campaigns);
      const campaignsArr = await campaigns.map((campaign) => ({
        Title: campaign.title,
        Goal: campaign.goalAmount,
        amountRaised: campaign.amountRaised,
        endDate: new Date(campaign.endDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC",
        }),
        Type: campaign.campaignType,
      }));
      setRowData(campaignsArr);
    };
    setRows();
  }, [campaigns]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const filteredCampaigns = selectedType
    ? campaigns.filter((campaign) => campaign.campaignType === selectedType)
    : campaigns;

  return (
    <div className="campaigns-container">
      <h1>Available Campaigns</h1>
      <label htmlFor="campaignFilterType">Filter By Campaign Type: </label>
      <select
        name="campaignType"
        id="campaignFilterType"
        value={selectedType}
        onChange={handleTypeChange}
      >
        <option value="">All</option>
        <option value="Charity">Charity</option>
        <option value="Education">Education</option>
        <option value="Creative">Creative</option>
        <option value="Sports">Sports</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Business">Business</option>
        <option value="Events">Events</option>
        <option value="Environment">Environment</option>
      </select>

      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>

      {/* <table id="campaignsTable" className="display">
        <thead>
          <tr>
            <th>Campaign Title</th>
            <th>Goal</th>
            <th>Raised</th>
            <th>End Date</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign._id}>
              <td>{campaign.title}</td>
              <td>{campaign.goalAmount}</td>
              <td>{campaign.amountRaised}</td>
              <td>
                End Date:{" "}
                {new Date(campaign.endDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  timeZone: "UTC",
                })}
              </td>
              <td>{campaign.campaignType}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr></tr>
        </tfoot>
      </table> */}

      <ul>
        {campaigns.length === 0 ? (
          <p>No campaigns found.</p>
        ) : filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign) => (
            <li key={campaign._id}>
              <h2>
                <Link to={`/campaigns/${campaign._id}`}>{campaign.title}</Link>
              </h2>
              <p>{campaign.description}</p>
              <p>Goal: ${campaign.goalAmount}</p>
              <p>Raised: ${campaign.amountRaised}</p>
              <p>
                End Date:{" "}
                {new Date(campaign.endDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  timeZone: "UTC",
                })}
              </p>
              <p>Type: {campaign.campaignType}</p>
            </li>
          ))
        ) : (
          <p>No {selectedType} campaigns found.</p>
        )}
      </ul>
    </div>
  );
}

export default CampaignsList;
