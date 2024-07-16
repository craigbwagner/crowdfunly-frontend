import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as campaignService from "../../services/campaignService";
import "./CampaignForms.css";

const CampaignForm = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    campaignType: "",
    description: "",
    goalAmount: "",
    endDate: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const confirmMessage = campaignId
      ? "Are you sure you want to update this campaign?"
      : "Are you sure you want to create this campaign?";
    if (window.confirm(confirmMessage)) {
      if (campaignId) {
        props.handleUpdateCampaign(campaignId, formData);
      } else {
        props.handleAddCampaign(formData);
      }
    }
  };

  const { campaignId } = useParams();

  useEffect(() => {
    const fetchCampaign = async () => {
      const campaignData = await campaignService.show(campaignId);
      setFormData({
        ...campaignData,
        endDate: formatDate(campaignData.endDate),
      });
    };
    if (campaignId) fetchCampaign();
  }, [campaignId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <main>
        <form className="campaignForms" onSubmit={handleSubmit}>
          <fieldset className="campaignForms-fieldset" aria-labelledby="campaignForms-legend">
            <legend className="campaignForms-legend">{campaignId ? "Update" : "Create"} Campaign</legend>

            <div className="campaignFormsInputDiv">
              <label htmlFor="title-input">Title </label>
              <input
                className="campaignForms-inputs"
                required
                type="text"
                name="title"
                id="title-input"
                value={formData.title}
                onChange={handleChange}
                placeholder=" "
              />
            </div>

            <div className="campaignFormsInputDiv">
              <label htmlFor="campaignType-input">Campaign Type </label>
              <select
                className="campaignForms-inputs"
                required
                name="campaignType"
                id="campaignType-input"
                value={formData.campaignType}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Charity">Charity</option>
                <option value="Education">Education</option>
                <option value="Creative">Creative</option>
                <option value="Sports">Sports</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Business">Business</option>
                <option value="Events">Events</option>
                <option value="Environment">Environment</option>
              </select>
            </div>
            <div className="campaignFormsInputDiv">
              <label htmlFor="description-input">Description </label>
              <textarea
                className="campaignForms-inputs"
                required
                type="text"
                name="description"
                id="description-input"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="campaignFormsInputDiv">
              <label htmlFor="goalAmount-input">Goal Amount </label>
              <input
                className="campaignForms-inputs"
                required
                type="number"
                name="goalAmount"
                id="goalAmount-input"
                value={formData.goalAmount}
                onChange={handleChange}
              />
            </div>
            <div className="campaignFormsInputDiv">
              <label htmlFor="endDate-input">End Date </label>
              <input
                className="campaignForms-inputs"
                required
                type="date"
                name="endDate"
                id="endDate-input"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
            <div className="campaignFormsButtonDiv">
              <button className="campaignForms-buttons" type="submit">
                {campaignId ? "Update" : "Create"} Campaign
              </button>
            </div>
          </fieldset>
        </form>
      </main>
    </>
  );
};

export default CampaignForm;
