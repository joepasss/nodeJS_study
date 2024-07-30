import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/");
  };

  return (
    <div className="error">
      <h3 className="errorMessage"></h3>
      <button className="returnToHome" onClick={onClickHandler}>
        Back to Home!
      </button>
    </div>
  );
};

export default Error;
