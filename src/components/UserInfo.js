import React, { useState, useEffect } from "react";
import { useGetUsersQuery } from "../services/users";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";

const UserInfo = () => {
  const [person, setPerson] = useState({});
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const { data, isLoading, refetch } = useGetUsersQuery();
  const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

  useEffect(() => {
    if (data) {
      const randomPerson = data.results[0];
      if (randomPerson) {
        const { phone, email, picture, login, name, dob, location } =
          randomPerson;
        const { large: image } = picture;
        const { password } = login;
        const { first, last } = name;
        const { age } = dob;
        const { number, name: streetName } = location.street;

        const newPerson = {
          image,
          phone,
          email,
          password,
          age,
          street: `${number} ${streetName}`,
          name: `${first} ${last}`,
        };

        setPerson(newPerson);
        setValue(newPerson[title]);
      }
    }
  }, [data, title]);

  const iconLabels = {
    name: { icon: <FaUser />, label: "name" },
    email: { icon: <FaEnvelopeOpen />, label: "email" },
    age: { icon: <FaCalendarTimes />, label: "age" },
    street: { icon: <FaMap />, label: "street" },
    phone: { icon: <FaPhone />, label: "phone" },
    password: { icon: <FaLock />, label: "password" },
  };

  const handleValue = (e) => {
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]);
    }
  };

  return (
    <div className="container">
      <img
        src={person ? person.image : defaultImage}
        alt="random_user"
        className="user-img"
      />
      <p className="user-title">My {title}</p>
      <p className="user-value">{value}</p>
      <div className="values-list">
        {Object.keys(iconLabels).map((key) => (
          <button
            key={key}
            data-label={key}
            onMouseOver={handleValue}
            className="icon"
          >
            {iconLabels[key].icon}
            <p className="caption-style">{iconLabels[key].label}</p>
          </button>
        ))}
      </div>
      <button className="btn" type="button" onClick={() => refetch()}>
        {isLoading ? "Loading..." : "Random User"}
      </button>
    </div>
  );
};

export default UserInfo;
