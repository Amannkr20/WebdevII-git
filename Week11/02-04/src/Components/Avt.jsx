function Avt(props) {
  console.log(props); // const props = {name:"manish",id:46}

  return (
    <div>
      <h1>Name: {props.name}</h1>
      <h2>Id: {props.id}</h2>
    </div>
  );
}

export default Avt;
