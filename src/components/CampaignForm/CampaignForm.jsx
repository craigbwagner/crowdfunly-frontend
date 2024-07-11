import { useState } from "react";

const CampaignForm = (props) => {
  const [formData, setFormData] = useState();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleAddCampaign(formData);
};
console.log("formData", formData);

  return (
    <>
      <main>
        <h1>New Campaign Form</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title-input">Title </label>
          <input
            required
            type="text"
            name="title"
            id="title-input"
            onChange={handleChange}
          />

          <label htmlFor="campaignType-input">Campaign Type </label>
          <select
            required
            name="campaignType"
            id="campaignType-input"
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
            onChange={handleChange}
          />

          <label htmlFor="goalAmount-input">Goal Amount </label>
          <input
            required
            type="Number"
            name="goalAmount"
            id="goalAmount-input"
            onChange={handleChange}
          />

          <label htmlFor="endDate-input">End Date </label>
          <input
            required
            type="date"
            name="endDate"
            id="endDate-input"
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
};

export default CampaignForm;
