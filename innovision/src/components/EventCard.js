import { useContext, useState } from "react";
import { Col } from "react-bootstrap";
import { UserContext } from "../context/User.context";
import { signInWithGoogleRedirect } from "../config/firebase";
import Modal from "./Modal";
import ModalRules from "./ModalRules";

export const EventCard = ({
  title,
  description,
  info,
  imgUrl,
  rules,
  theme,
  note,
  coordinators,
  hasForm,
}) => {
  const { currUser } = useContext(UserContext);
  // const { modalState, setModalState } = useContext(UserContext);
  const [modalState1, setModalState1] = useState(false);
  const [modalRules, setModalRules] = useState(false);

  const handleGoogleSignin = async () => {
    try {
      await signInWithGoogleRedirect();
    } catch (error) {
      console.log(error);
    }
  };

  // const [modalState, setModalState] = useState(false)

  const OpenModal = () => {
    setModalState1(true);
    console.log(modalState1);
  };
  const openRules = () => {
    setModalRules(true);
  };

  return (
    <Col size={12} sm={6} md={4}>
      <div className="event-imgbx">
        <img src={imgUrl} alt="img" />
        {!currUser ? (
          <button className="button" onClick={handleGoogleSignin}>
            <span className=" font-semibold">Sign In / Sign Up</span>
          </button>
        ) : (
          <button className="button" onClick={OpenModal}>
            <span className=" font-semibold">Register Now</span>
          </button>
        )}
        <button
          className="button !top-2/3 z-10 !cursor-pointer"
          onClick={openRules}
        >
          <span className=" font-semibold !cursor-pointer">Guidelines</span>
        </button>
        <ModalRules
          modalRules={modalRules}
          setModalRules={setModalRules}
          title={title}
          info={info}
          rules={rules}
          theme={theme}
          note={note}
          coordinators={coordinators}
        />
        <Modal
          modalState1={modalState1}
          setModalState1={setModalState1}
          title={title}
          hasForm={hasForm}
        />
        <div className="event-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </div>
    </Col>
  );
};
