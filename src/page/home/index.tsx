import { useEffect, useState } from "react";
import "./style.scss";
type FormType = {
  email: string;
  hours: number;
  membership: "basic" | "premium" | "executive";
  type: "individual" | "team";
};
const IndividualPricings = {
  basic: 10,
  premium: 15,
  executive: 20,
};
const TeamPricing = 25;

const Home = () => {
  const [amount, setAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [formData, setFormData] = useState<FormType>({
    email: "",
    hours: 1,
    membership: "basic",
    type: "individual",
  });
  const handleInputs = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedData = localStorage.getItem("formDataList");
    const formDataList: FormType[] = storedData ? JSON.parse(storedData) : [];
    let individualDesks = formDataList.filter(
      (item) => item.type === "individual"
    );
    let teamDesks = formDataList.filter((item) => item.type === "team");
    if (formData.type === "individual") {
      if (individualDesks.length >= 10) {
        alert("Indiviual desks are totally booked.");
      } else {
        const emailExists = formDataList.some(
          (data) => data.email === formData.email
        );
        if (emailExists) {
          alert("This email already exists in the system.");
        } else {
          formDataList.push(formData);
          localStorage.setItem("formDataList", JSON.stringify(formDataList));
          alert("Booking saved");
        }
      }
    } else if (formData.type === "team") {
      if (teamDesks.length >= 5) {
        alert("Team desks are totally booked.");
      } else {
        const emailExists = formDataList.some(
          (data) => data.email === formData.email
        );
        if (emailExists) {
          alert("This email already exists in the system.");
        } else {
          formDataList.push(formData);
          localStorage.setItem("formDataList", JSON.stringify(formDataList));
          alert("Booking saved");
        }
      }
    }
  };
  useEffect(() => {
    if (Number(formData.hours) > 3) {
      let total = Number(formData.hours) * amount;
      setTotalAmount(total - 0.1 * total);
    } else {
      setTotalAmount(Number(formData.hours) * amount);
    }
  }, [formData.hours, amount]);
  useEffect(() => {
    if (formData.type === "individual" && formData.membership) {
      setAmount(IndividualPricings[formData.membership]);
    }
  }, [formData.membership, formData.type]);

  return (
    <div className="pd_home">
      <h4>Welcome, fill the form to book a slot</h4>
      <form onSubmit={handleSubmit}>
        <div className="input_box">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            name="email"
            value={formData.email}
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
            value={formData.hours}
            onChange={(e) => {
              handleInputs(e);
            }}
          />
        </div>
        <div className="input_box">
          <label htmlFor="email">Booking Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={(e) => {
              handleInputs(e);
              if (e.target.value === "team") {
                setAmount(TeamPricing);
              }
            }}
          >
            <option value="individual">Individual</option>
            <option value="team">Team</option>
          </select>
        </div>
        {formData.type === "individual" && (
          <div className="input_box">
            <label htmlFor="membership">Booking Tier</label>
            <select
              value={formData.membership}
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
        )}
        <div className="display_amount">
          <p>Amount per hour: ${amount}</p>
          <p>Total Amount: ${totalAmount.toFixed(2)}</p>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
