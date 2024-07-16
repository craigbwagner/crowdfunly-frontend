const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/contributions`;

const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    //   console.log("contributionsService:", res.json())
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };


  export { index };