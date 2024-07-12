import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ContributionForm() {
  const [amount, setAmount] = useState("");
  const { campaignId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate(`/campaigns/${campaignId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(evt) => setAmount(evt.target.value)}
          required
        />
      </div>
      <button type="submit">Contribute</button>
    </form>
  );
}

export default ContributionForm;
