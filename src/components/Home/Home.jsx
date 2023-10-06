import {useNavigate} from "react";
import { Link } from "react-router-dom";
import { Users, Clock, Package, Barcode } from "@phosphor-icons/react";
import "./home.css";

const Home = () => {


  return (
    <div className="body">
      <div className="buttons">
        <Link className="admin" style={{textDecoration: "none"}}>
        <button className="button">
          <Users size={42} />
          Admin
        </button>
        </Link>
        <Link className="timeclock" style={{textDecoration: "none"}}>
        <button className="button">
          <Clock size={42} />
          Time Clock
        </button>
        </Link>
        <Link className="inventory" style={{textDecoration: "none"}}>
        <button className="inventory button">
          <Package size={42} />
          Inventory
        </button>
        </Link>
        <Link to='/sales' className="pos" style={{textDecoration: "none"}}>
          <div className="container">
          <button className="button">
            <Barcode size={42} />
            POS
          </button>
          </div>
          </Link>
      </div>
    </div>
  );
};

export default Home;
