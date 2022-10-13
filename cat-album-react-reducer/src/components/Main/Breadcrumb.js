const Breadcrumb = (props) => {
  const onClickHadler = () => {
    props.onClick(props.id, props.name);
  };

  return (
    <div key={props.id} onClick={onClickHadler}>
      {props.name}
    </div>
  );
};

export default Breadcrumb;
