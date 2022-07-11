import "./App.css";
import WeatherApp from "./Components/WeatherApp";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://graphql-weather-api.herokuapp.com/",
  });

  return (
    <ApolloProvider client={client}>
      <WeatherApp />
    </ApolloProvider>
  );
}

export default App;
