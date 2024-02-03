import services from "@/services";

const Page = async () => {
  const data = await services.work.getWorkPlaces();

  return (
    <div>
      <h1>Works</h1>
      {data.map((item) => (
        <div key={item.company}>
          <h2>{item.company}</h2>
          <p>{item.logo}</p>
          <p>{item.position}</p>
          <p>{item.location}</p>
          <p>{item.specialization}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;
