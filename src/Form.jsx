import { useState, useEffect } from "react";
import PropTypes from "prop-types";


export default function Form({ addData, editData, onCancel }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    score: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setFormData({
        firstname: editData.firstname,
        lastname: editData.lastname,
        gender: editData.gender,
        score: editData.score,
      });
    } else {
      setFormData({
        firstname: "",
        lastname: "",
        gender: "",
        score: "",
      });
    }
  }, [editData]);

  const validate = () => {
    const error = {};

    if (!formData.firstname) error.firstname = "First name is required";
    if (!formData.lastname) error.lastname = "Last name is required";
    if (!formData.gender) error.gender = "Gender is required";

    const score = parseFloat(formData.score);
    if (isNaN(score)) {
      error.score = "Score is required";
    } else if (score < 0) {
      error.score = "Minimum is 0";
    } else if (score > 100) {
      error.score = "Maximum is 100";
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "score") {
      const score = parseFloat(value);
      const error = { ...errors };

      if (isNaN(score)) {
        error.score = "Score is required";
      } else if (score < 0) {
        error.score = "Minimum is 0";
      } else if (score > 100) {
        error.score = "Maximum is 100";
      } else {
        delete error.score;
      }

      setErrors(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validate();
    if (Object.keys(error).length > 0) {
      setErrors(error);
      return;
    }

    addData({
      firstname: formData.firstname,
      lastname: formData.lastname,
      gender: formData.gender,
      score: parseFloat(formData.score),
    });

    setFormData({
      firstname: "",
      lastname: "",
      gender: "",
      score: "",
    });
  };

  return (
    <div className="grid place-items-center items-center mt-10">
      <form className="grid place-items-center" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-y-5 gap-x-10 text">
          <div className="flex flex-col">
            <label htmlFor="firstname">First name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
            {errors.firstname && (
              <span className="text-red-500">{errors.firstname}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastname">Last name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
            {errors.lastname && (
              <span className="text-red-500">{errors.lastname}</span>
            )}
          </div>

          <div className="flex flex-col ">
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border p-2 rounded-md h-[42px]"
            >
              <option value=""></option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="U">Unknown</option>
            </select>
            {errors.gender && (
              <span className="text-red-500">{errors.gender}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="score">Score</label>
            <input
              type="number"
              id="score"
              name="score"
              value={formData.score}
              onChange={handleChange}
              className="border p-2 rounded-md h-[42px]"
            />
            {errors.score && (
              <span className="text-red-500">{errors.score}</span>
            )}
          </div>
        </div>

        <div className="flex mt-5 mb-10 place-items-center gap-5">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg w-[100px]"
          >
            {editData ? "Edit" : "Add"}
          </button>
          <button
            type="button"
            className="bg-white px-4 py-2 rounded-lg w-[100px]"
            onClick={() => {
              setFormData({
                firstname: "",
                lastname: "",
                gender: "",
                score: "",
              });
              onCancel();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

Form.propTypes = {
  addData: PropTypes.func.isRequired,
  editData: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
};
