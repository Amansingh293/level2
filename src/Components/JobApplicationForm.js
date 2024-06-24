import React, { useEffect, useState } from "react";
import useFormValidation from "../Hooks/useFormValidation";
import validateForm from "../validationRules";

const JobApplicationForm = () => {
  const initialState = {
    fullName: "",
    email: "",
    phoneNumber: "",
    position: "",
    experience: "",
    portfolioURL: "",
    managementExperience: "",
    skills: {
      JavaScript: false,
      CSS: false,
      Python: false,
      Java: false,
      C: false,
    },
    interviewTime: "",
  };

  const { values, errors, handleChange, handleSubmit } = useFormValidation(
    initialState,
    validateForm
  );
  const [minDateTime, setMinDateTime] = useState("");

  const onSubmit = () => {
    alert(`Form submitted successfully with data: 
      Full Name: ${values.fullName}
      Email: ${values.email}
      Phone Number: ${values.phoneNumber}
      Applying for Position: ${values.position}
      Relevant Experience: ${values.experience}
      Portfolio URL: ${values.portfolioURL}
      Management Experience: ${values.managementExperience}
      Skills: ${Object.keys(values.skills)
        .filter((skill) => values.skills[skill])
        .join(", ")}
      Preferred Interview Time: ${values.interviewTime}`);
  };

  useEffect(() => {
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 16);
    setMinDateTime(formattedDateTime);
  }, []);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid lg:grid-cols-2 gap-5 border-[2px] rounded-xl shadow-xl p-5 lg:text-[1.2rem]"
    >
      <div className="flex flex-col gap-3 items-start">
        <div className="flex justify-start gap-3 items-center w-full">
          <label>Full Name:</label>
          <input
            className="border-[1px] rounded-xl shadow-md p-1"
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
          />
        </div>
        {errors.fullName && (
          <span className="text-red-500">{errors.fullName}</span>
        )}
      </div>
      <div className="flex flex-col gap-3 items-start">
        <div className="flex justify-start gap-3 items-center w-full">
          {" "}
          <label>Email:</label>
          <input
            className="border-[1px] rounded-xl shadow-md p-1"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        {errors.email && <span className="text-red-500">{errors.email}</span>}
      </div>
      <div className="flex flex-col gap-3 items-start">
        <div className="flex justify-start gap-3 items-center w-full">
          {" "}
          <label>Phone Number:</label>
          <input
            className="border-[1px] rounded-xl shadow-md p-1"
            type="number"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
          />
        </div>
        {errors.phoneNumber && (
          <span className="text-red-500">{errors.phoneNumber}</span>
        )}
      </div>
      <div className="flex flex-col gap-3 items-start">
        <div className="flex justify-start gap-3 items-center w-full">
          {" "}
          <label>Applying for Position:</label>
          <select
            name="position"
            value={values.position}
            onChange={handleChange}
            className="border-[1px] rounded-lg shadow-md"
          >
            <option value="">Select Position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
      </div>
      {(values.position === "Developer" || values.position === "Designer") && (
        <div>
          <label>Relevant Experience (years):</label>
          <input
            className="border-[1px] rounded-xl shadow-md p-1"
            type="number"
            name="experience"
            value={values.experience}
            onChange={handleChange}
          />
          {errors.experience && (
            <span className="text-red-500">{errors.experience}</span>
          )}
        </div>
      )}
      {values.position === "Designer" && (
        <div>
          <label>Portfolio URL:</label>
          <input
            className="border-[1px] rounded-xl shadow-md p-1"
            type="text"
            name="portfolioURL"
            value={values.portfolioURL}
            onChange={handleChange}
          />
          {errors.portfolioURL && (
            <span className="text-red-500">{errors.portfolioURL}</span>
          )}
        </div>
      )}
      {values.position === "Manager" && (
        <div>
          <label>Management Experience:</label>
          <input
            className="border-[1px] rounded-xl shadow-md p-1"
            type="text"
            name="managementExperience"
            value={values.managementExperience}
            onChange={handleChange}
          />
          {errors.managementExperience && (
            <span className="text-red-500">{errors.managementExperience}</span>
          )}
        </div>
      )}
      <div>
        <label>Additional Skills:</label>
        {Object.keys(values.skills).map((skill) => (
          <div key={skill}>
            <input
              className="border-[1px] rounded-xl shadow-md p-1"
              type="checkbox"
              name="skills"
              value={skill}
              checked={values.skills[skill]}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "skills",
                    value: {
                      ...values.skills,
                      [skill]: e.target.checked,
                    },
                  },
                })
              }
            />
            <label>{skill}</label>
          </div>
        ))}
        {errors.skills && <span className="text-red-500">{errors.skills}</span>}
      </div>
      <div className="flex flex-col gap-3 items-start">
        <div className="flex justify-start gap-3 items-center w-full">
          {" "}
          <label>Preferred Interview Time:</label>
          <input
            className="border-[1px] rounded-xl shadow-md p-1"
            type="datetime-local"
            name="interviewTime"
            value={values.interviewTime}
            onChange={handleChange}
            min={minDateTime}
          />
        </div>
        {errors.interviewTime && (
          <span className="text-red-500">{errors.interviewTime}</span>
        )}
      </div>
      <button
        className="bg-purple-600 self-end text-white border-[1px] rounded-xl shadow-md p-2 w-[50%]"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default JobApplicationForm;
