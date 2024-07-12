import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as campaignService from "../../services/campaignService";

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
    console.log("formData", formData);
    props.handleAddCampaign(formData);
  };

  const { campaignId } = useParams();

  return (
    <>
      <main>
        <h1>New Campaign Form</h1>
        <form onSubmit={handleSubmit}>
          <h2>{campaignId ? "Update" : "Create"} Campaign</h2>
          <label htmlFor="title-input">Title </label>
          <input
            required
            type="text"
            name="title"
            id="title-input"
            value={formData.title}
            onChange={handleChange}
          />

          <label htmlFor="campaignType-input">Campaign Type </label>
          <select
            required
            name="campaignType"
            id="campaignType-input"
            value={formData.campaignType}
            onChange={handleChange}
          >
            <option value="Charity">Charity</option>
            <option value="Education">Education</option>
            <option value="Creative">Creative</option>
            <option value="Sports">Sports</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Business">Business</option>
            <option value="Events">Events</option>
            <option value="Environment">Environment</option>
          </select>

          <label htmlFor="description-input">Description </label>
          <textarea
            required
            type="text"
            name="description"
            id="description-input"
            value={formData.description}
            onChange={handleChange}
          />

          <label htmlFor="goalAmount-input">Goal Amount </label>
          <input
            required
            type="number"
            name="goalAmount"
            id="goalAmount-input"
            value={formData.goalAmount}
            onChange={handleChange}
          />

          <label htmlFor="endDate-input">End Date </label>
          <input
            required
            type="date"
            name="endDate"
            id="endDate-input"
            value={formData.endDate}
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
};

export default CampaignForm;
