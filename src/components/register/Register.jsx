import React from "react";
import { useForm } from "react-hook-form";
import '../register/register.css';
import logo from "../../img/logo.png";
import "../../firebase/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const history = useHistory();
  const onSubmit = data => {
    // console.log(data.name);
    // console.log(data.email);
    // console.log(data.password);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user + 'Ya estás logueado');
        history.push("/home");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <section className='logoAndForm' >
      <figure>
        <img className='logo' src={logo} alt='Logo'/>
      </figure>
        <section className='sectionFormRegister'>
          <div className='RegisterNow'>
            <h1>¡Registrate ahora!</h1>
          </div>
      <section className='sectionForm'>
        <form className='formRegister' onSubmit={handleSubmit(onSubmit)}>
          <div className='inputSection'>
            <div className='label'>
              <label>Nombre</label>
            </div>
            <input className='inputForm' type='text' defaultValue="" {...register("name")} />
          </div>
          <div className='inputSection'>
            <div className='label'>
              <label>Correo</label>
            </div>
            <input className='inputForm' type='email' defaultValue="" {...register("email")} />
          </div>
          <div className='inputSection'>
            <div className='label'>
              <label>Contraseña</label>
            </div>
            <input className='inputForm' type='password' {...register("password", { required: true })} />
          </div>
            {errors.exampleRequired && <span>This field is required</span>}
            <div className='inputSection'>
              <div className='label'>
                <label>Confirma contraseña</label>
              </div>
              <input className='inputForm' type='password' {...register("confirmPassword", { required: true })} />
            </div>
            {errors.exampleRequired && <span>This field is required</span>}
            <section className='sectionButton'>
          <button className='buttonRegister' type="submit">REGISTRARSE</button>
            </section>
        </form>
        </section>
      </section>
    </section>
  );
}

export default Register;