import style from './ContactUs.module.css'
import Contact from "../../components/contact/Contact";


const ContactUs = () => {

  return (
    <div className={style.containerContactUs}>
      <Contact/>
    </div>
  );
}

export default ContactUs