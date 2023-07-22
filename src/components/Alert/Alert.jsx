import './Alert.css';

const Alert = ({ text, error }) => {

  return (

    error ?
      <div className="alert-container-error">
        <b>{text}</b>
      </div>
      :
      <div className="alert-container-warning">
        <b>{text}</b>
      </div>

  );
}

export default Alert;
