import React, { useEffect } from 'react';
import "../StyleCadastro.css";
import {useState} from 'react'
import CadastroPerfil from "./cadastroPerfil";
import {useForm} from "react-hook-form"; 

const Cadastro = () => {
    
  //cria um obj user pra armazenar as respostas dos formularios.
  const [newUser, setNewUser] = useState({
    name: "",
    email: "", //@sga.pucminas.br
    password: "",
    birthDate: "", //2021-02-21" ano, mes, dia -------- fim da primeira pagina
    course: "",
    campus: "", //São Gabriel, Praça da Liberdade, Coração Eucaristico.
    interestsIds: [""], //é o id do interesse -> 650f6763affad354ee338325
    instagram: "",
    intention: "", //FRIENDSHIP, SOMETHING_CASUAL, SERIOUS_RELATIONSHIP
  });

const [mostrarComponente, setMostrarComponente] = useState(false); //mostrar o CadastroPerfil

const handleClickCadastro = (e) => { //se clicar para continuar, ele mostra o cadastroPerfil e esconde o cadastro atual.
  e.preventDefault()
  setMostrarComponente(true);
}

  const {register, handleSubmit, getValues, watch, formState: {errors}} = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data)
    handleClickCadastro(e);
  }

  //Ao passar pro cadastroPerfil, ele manda o JSON de user e o state para mostrar/esconder componente.
    return (
    <div className="container-cadastro">
    {mostrarComponente && <CadastroPerfil  user={newUser} setMostrarComponente={setMostrarComponente} />} 
    {!mostrarComponente && ( 
    <div className="container-cadastro ">
      <div className="wrap-cadastro">
        <form className="cadastro-form">
          
          <span className="cadastro-form-title">
          Cadastre e conheça seu amor
          </span>

          <div className="wrap-input">
            <h4>Qual seu nome?</h4>
            <input className="input" type="name" placeholder="Digite seu nome" name="name" {...register('name', {required:true})}/>
            {errors?.name?.type === 'required' && <p className=' text-vermelhoSanguino'>Nome invalido*</p>}
          </div>
          <div className="wrap-input">
            <h4>Digite o e-mail</h4>
            <input className="input" type="email" placeholder="meuemail@sga.pucminas.br"  name="email"  {...register('email', {required:true, validate: {
              maxLength: (v) =>
                v.length <= 50 || "O email tem tamanho maximo de 50 caracteres.",
              matchPattern: (v) =>
              /^\w+@sga\.pucminas\.br$/.test(v) ||
                "Digite um email valido.",
              }})}/>

            {errors?.email?.message && (
              <p className=' text-vermelhoSanguino'>{errors.email.message}</p>)}

          </div>
          {errors?.email?.type === 'required' && <p className=' text-vermelhoSanguino'>Email invalido*</p>}
          <div className="wrap-input">
            <h4>Digite sua senha</h4>
            <input className="input" type="password" placeholder="********"  name="password"  {...register('password', {required:true, minLength:7})}/>
            {errors?.password?.type === 'minLength' && <p className=' text-vermelhoSanguino'>A senha precisa de ter ao menos 7 caracteres*</p>}
            {errors?.password?.type === 'required' && <p className=' text-vermelhoSanguino'>Digite a senha*</p>}
          </div>
          <div className="wrap-input">
            <h4>Confirme a senha</h4>
            <input className="input" type="password" placeholder="********"  name="passwordConfirm"  {...register('passwordConfirm',  {required:true})}/>
            {watch("passwordConfirm") !== watch("password") && getValues("passwordConfirm") ? (<p className=' text-vermelhoSanguino'>password not match</p>) : null}
          </div>
          <div className="wrap-input">
            <h4>Quando você nasceu</h4>
            <input className="input datepickerbg" type="date" placeholder="01/01/1900" name="birthdate"  {...register('birthdate', {required:true})}/>
            {errors?.date?.type === 'valueAsDate' && <p className=' text-vermelhoSanguino'>Data invalida*</p>}

          </div>
          <div className="container-cadastro-form-btn">
            <button type='submit' onClick={(e) => handleSubmit(onSubmit)(e)} className="cadastro-form-btn" >Continuar</button>

          </div>
        </form>
      </div>
    </div>
    )}
  </div>

)};

export default Cadastro;