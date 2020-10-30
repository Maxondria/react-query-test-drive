import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./components/Planet";

const fetchPlanets = async (_, page) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, isError, isFetching, isLoading, isSuccess } = useQuery(
    ["planets", page],
    fetchPlanets,
    {
      onSuccess: () => console.log("You can do something awesome!."),
    }
  );

  return (
    <div>
      <h2>Planets</h2>

      <button onClick={() => setPage(page + 1)}>Page {page}</button>

      {isError && <div> Error fetching data </div>}
      {isLoading && <div> Loading... </div>}
      {isFetching && !isLoading && <div> Updating... </div>}
      {isSuccess && data && (
        <div>
          {data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
