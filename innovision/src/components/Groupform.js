import React, { useContext, useState } from "react";

import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UserContext } from "../context/User.context";
import { addToSingleEvent } from "../config/firebase";

// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../../Config/Firebase";

const formSchema = yup
  .object()
  .shape({
    name: yup.string().required("This is a required field"),
    personal_email: yup.string().email().required("This is a required field"),
    year: yup.string().required("This is a required field"),
    college_roll: yup.string().required("This is a required field"),
    mobile_no: yup.string().required("This is a required field"),
    department: yup.string().required("This is a required field"),
  })
  .required();
const schema = yup.object({
  participants: yup.array().of(formSchema),
});

function Groupform({ title, setModalState1 }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "participants",
  });

  const { currUser } = useContext(UserContext);
  const submitForm = async (data) => {
    const eventName = title.replace(/ /g, "").toLowerCase();
    try {
      await addToSingleEvent(currUser, eventName, {
        ...data,
      });
    } catch (e) {
      console.log(e);
    }
    setModalState1(false);
    console.log(data);
  };

  return (
    <div className="max-h-[400px] overflow-y-auto">
      <h4 className="text-3xl mb-1 text-purple-500 p-3 uppercase">Enter details for {title}</h4>
      <form onSubmit={handleSubmit(submitForm)}>
        {fields.map((item, index) => (
          <>
            <div key={index}>
              <p className="text-xl mb-1 text-purple-500 p-3 uppercase">Member {index + 1} details</p>
              <input
                type="text"
                placeholder={`Team Member ${index + 1} Name`}
                {...register(`participants.${index}.name`)}
                className="p-2 border mb-2 border-white rounded-lg !bg-transparent"
              />
              {errors.name && <span className="text-red-600">Name required</span>}
              <input
                type="text"
                placeholder={`Team Member ${index + 1} Email`}
                {...register(`participants.${index}.personal_email`)}
                className="p-2 border mb-2  border-white rounded-lg !bg-transparent"
              />
              {errors.personal_email && <span className="text-red-600">Email required</span>}
              <input
                type="text"
                placeholder={`Team Member ${index + 1} Mobile no.`}
                {...register(`participants.${index}.mobile_no`)}
                className="p-2 border mb-2  border-white rounded-lg !bg-transparent"
              />
              {errors.mobile_no && <span className="text-red-600">Mobile no. required</span>}
              <input
                type="text"
                placeholder={`Team Member ${index + 1} College roll no.`}
                {...register(`participants.${index}.college_roll`)}
                className="p-2 border mb-2  border-white rounded-lg !bg-transparent"
              />
              {errors.college_roll && <span className="text-red-600">College Roll required</span>}
              <input
                type="text"
                placeholder={`Team Member ${index + 1} Year`}
                {...register(`participants.${index}.year`)}
                className="p-2 border mb-2  border-white rounded-lg !bg-transparent"
              />
              {errors.year && <span className="text-red-600">Year required</span>}
              <input
                type="text"
                placeholder={`Team Member ${index + 1} Department`}
                {...register(`participants.${index}.department`)}
                className="p-2 border mb-2  border-white rounded-lg !bg-transparent"
              />
              {errors.department && <span className="text-red-600">Department required</span>}
              <button
                className="text-white border-[5px] px-4 py-2 rounded-xl bg-red-700 hover:bg-red-300"
                type="button"
                onClick={() => remove(index)}
              >
                Delete
              </button>
              {/* Add more input fields for other details like email, year, etc. */}
            </div>
          </>
        ))}
        <button
          className="text-white border-[5px] px-4 py-2 rounded-xl bg-purple-700 border-purple-400"
          type="button"
          onClick={() => append()}
        >
          Add new Member
        </button>
        <button
          type="submit"
          className="mt-3 inline-flex justify-center rounded-md  bg-gradient-to-r from-violet-500 to-fuchsia-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset focus:from-purple-800 focus:to-blue-950  sm:mt-0 sm:w-auto absolute bottom-1 right-32 w-auto"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Groupform;
