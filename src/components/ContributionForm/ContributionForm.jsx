import { useState, useEffect } from "react";

function ContributionForm() {
  const [amount, setAmount] = useState("");
  const [campaignId, setCampaignId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input type="number" value={amount} onChange={(evt) => setAmount(evt.target.value)} required />
        </div>
        <div>
          <label>Campaign ID:</label>
          <input type="text" value={campaignId} onChange={(evt) => setCampaignId(evt.target.value)} required />
        </div>
        <button type="submit">Contribute</button>
      </form>
    );
  };
}

export default ContributionForm;
