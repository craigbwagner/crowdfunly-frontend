import { useState } from "react";

const CampaignForm = (props) => {
  const [formData, setFormData] = useState({
    title: { type: String, required: true },
    description: { type: String, required: true },
    goalAmount: { type: Number, required: true },
    campaignType: {
      type: String,
      enum: [
        "Charity",
        "Education",
        "Creative",
        "Sports",
        "Entertainment",
        "Business",
        "Events",
        "Environment",
      ],
      required: true,
    },
    endDate: { type: Date, required: true },
  });

  const handelChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("formData", formData);
  };

  return (
    <>
      <main>
        <h1>New Campaign Form</h1>
      </main>
    </>
  );
};

export default CampaignForm;
