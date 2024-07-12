const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/campaigns`;

const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const show = async (campaignId) => {
    try {
      const res = await fetch(`${BASE_URL}/${campaignId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
