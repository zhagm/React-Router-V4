import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRooms } from "../actions/roomActions";
import { Link } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
require("dotenv").config();
const ASSETS_URL = process.env.PUBLIC_URL + "/assets";

const RoomsPage = ({ rooms = [], getRooms }) => {
  useEffect(() => {
    getRooms();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="navBackground bg-default"></div>
      <section className="section section-lg pt-lg-0 mt-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg="12">
              <Row className="row-grid">
                {rooms.map((room) => (
                  <RoomCard key={room._id} room={room} />
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <h1>YOUR ROOMS</h1>
      <Link to={`rooms/new`}>
        <button>Make a room</button>
      </Link>
      <ul>
        {(rooms || []).map((room) => (
          <li key={room._id}>
            {room.name} ({room.members.length} member
            {room.members.length !== 1 && "s"})
            <Link to={`rooms/${room._id}`}>
              <button>ENTER</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

RoomsPage.propTypes = {
  getRooms: PropTypes.func.isRequired,
  rooms: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  rooms: state.rooms.rooms,
});

export default connect(mapStateToProps, { getRooms })(RoomsPage);

// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { getRooms } from "../actions/roomActions";
// import { Link } from "react-router-dom";

// const RoomsPage = ({ rooms, getRooms }) => {
//   useEffect(() => {
//     getRooms();
//     // eslint-disable-next-line
//   }, []);

//   return (
//     <div>
//       <h1>YOUR ROOMS</h1>
//       <Link to={`rooms/new`}>
//         <button>Make a room</button>
//       </Link>
//       <ul>
//         {(rooms || []).map((room) => (
//           <li key={room._id}>
//             {room.name} ({room.members.length} member
//             {room.members.length !== 1 && "s"})
//             <Link to={`rooms/${room._id}`}>
//               <button>ENTER</button>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// RoomsPage.propTypes = {
//   getRooms: PropTypes.func.isRequired,
//   rooms: PropTypes.array.isRequired,
// };

// const mapStateToProps = (state) => ({
//   rooms: state.rooms.rooms,
// });

// export default connect(mapStateToProps, { getRooms })(RoomsPage);
