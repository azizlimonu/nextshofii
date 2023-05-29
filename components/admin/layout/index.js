import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './styles.module.scss';
import Sidebar from "./sidebar";

const AdminLayout = ({ children }) => {
  const { expandSidebar } = useSelector((state) => ({ ...state }));
  const showSidebar = expandSidebar.expandSidebar;

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div
        style={{ marginLeft: `${showSidebar ? "280px" : "80px"}` }}
        className={styles.layout__main}
      >
        {children}
      </div>
    </div>
  )
}

export default AdminLayout