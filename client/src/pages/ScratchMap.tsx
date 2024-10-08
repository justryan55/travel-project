import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import { useContext, useEffect, useState } from "react";
import { fetchCountriesVisited, fetchData } from "../services/helpers";
import { UserContext } from "../services/AuthContext";

const PageLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 5fr;
  background-color: #f8f8ff;

  @media (max-width: 768px) {
    grid-template-columns: 5fr;
  }
`;

const CardLayout = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  overflow: scroll;
`;

const CountryCard = styled.div`
  padding: 1rem;
  margin: 0.5rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);

  &:hover {
    font-weight: 500;
    cursor: pointer;
  }
`;

type HandleClickProps = {
  countryName: string;
  countryCode: string;
};

type CountriesMapProps = {
  name: string;
  code: string;
};

export default function ScratchMap() {
  const [user] = useContext(UserContext) || [];
  const [countries, setCountries] = useState<CountriesMapProps[]>([]);
  const [countriesVisited, setCountriesVisited] = useState<string[]>([]);

  useEffect(() => {
    try {
      const getData = async () => {
        const res = await fetchData(`getCountry`, "GET");

        if (!res?.ok) {
          throw new Error(`Response status: ${res?.status}`);
        }

        const data = await res?.json();
        setCountries(data.payload.countries);
      };

      const getCountriesVisitedByUser = async () => {
        if (user?.userId) {
          const res = await fetchCountriesVisited(user?.userId);
          const data = await res?.json();
          setCountriesVisited(data.message);
        }

        getData();
      };
      getCountriesVisitedByUser();
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasVisited = (countryName: string) => {
    return countriesVisited.includes(countryName);
  };

  const handleClick = async ({
    countryName,
    countryCode,
  }: HandleClickProps) => {
    try {
      const res = await fetchData(`toggleCountry`, "POST", {
        countryName,
        countryCode,
      });

      if (user && res?.ok) {
        if (!hasVisited(countryName)) {
          setCountriesVisited((prevVisited) => [...prevVisited, countryName]);
          user.countriesVisited = [...user.countriesVisited, countryName];
        } else {
          setCountriesVisited((prevVisited) =>
            prevVisited.filter((name) => name !== countryName)
          );
          user.countriesVisited = user.countriesVisited.filter(
            (name: string) => name !== countryName
          );
        }
      }

      if (!res?.ok) {
        console.log("Error reaching server");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageLayout>
      <NavigationBar />
      <CardLayout>
        {countries.map((country: CountriesMapProps) => {
          const countryName = country.name;
          const countryCode = country.code;
          return (
            <CountryCard
              onClick={() => {
                handleClick({ countryName, countryCode });
              }}
            >
              {countryName} -
              {hasVisited(countryName) ? (
                <span style={{ color: "green", fontWeight: "500" }}>
                  Visited
                </span>
              ) : (
                <span style={{ color: "red" }}> Not Visited</span>
              )}
            </CountryCard>
          );
        })}
      </CardLayout>
    </PageLayout>
  );
}
