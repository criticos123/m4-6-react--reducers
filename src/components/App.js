import React from "react";
import { SeatContext } from "./SeatContext";
import TicketWidget from "./TicketWidget";
import GlobalStyles from "./GlobalStyles";

function App() {
  const {
    state: { numOfRows },
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);
  React.useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => receiveSeatInfoFromServer(data));
  }, []);
  return (
    <>
      <GlobalStyles />
      <span>This venue has {numOfRows} rows!</span>
      <TicketWidget />
    </>
  );
}

export default App;
