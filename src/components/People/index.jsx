import React from "react";
import { useQuery } from "react-query";
import Person from "./compoents/Person";

const fetchPlanets = async () => {
  const res = await fetch("http://swapi.dev/api/people/");
  return res.json();
};

const People = () => {
  const { data, isError, isFetching, isLoading, isSuccess } = useQuery(
    ["people"],
    fetchPlanets
  );

  return (
    <div>
      <h2>People</h2>
      {isError && <div> Error fetching data!! </div>}
      {isLoading && <div> Loading... </div>}
      {isFetching && !isLoading && <div> Updating... </div>}
      {isSuccess && data && (
        <div>
          {data.results.map((people) => (
            <Person key={people.name} person={people} />
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
