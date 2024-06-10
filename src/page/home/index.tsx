import { useState } from "react";

const Home = () => {
  const [formData, setFormData] = useState({
    email: "",
    hours: "",
    membership: "",
    type: "",
  });
  const handleInputs = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="pd_home">
      <h4>Welcome, fill the form to book a slot</h4>
      <form>
        <div className="input_box">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            name="email"
            onChange={(e) => {
              handleInputs(e);
            }}
          />
        </div>
        <div className="input_box">
          <label htmlFor="email">Hours to book</label>
          <input
            type="number"
            required
            name="hours"
            onChange={(e) => {
              handleInputs(e);
            }}
          />
        </div>
        <div className="input_box">
          <label htmlFor="email">Booking Type</label>
          <select
            name="type"
            onChange={(e) => {
              handleInputs(e);
            }}
          >
            <option value="individual">Individual</option>
            <option value="team">Team</option>
          </select>
        </div>
        <div className="input_box">
          <label htmlFor="membership">Booking Tier</label>
          <select
            name="membership"
            onChange={(e) => {
              handleInputs(e);
            }}
          >
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="executive">Executive</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Home;
