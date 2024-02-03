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

      <div>
        <div className="flex justify-end">
          <div className="text-block-right">
            <p>Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

            {/* <img src="https://assets.website-files.com/5ca439d02e5a6c7af8b04afd/5ca6cd375f97512c33af6a9b_Logo.svg" alt="" className="signature-small"></img> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
