import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import { SeatContext } from "./SeatContext";
import { ReactComponent as ImageTag } from "../assets/seat-available.svg";
const TicketWidget = () => {
  // TODO: use values from Context
  const { state } = React.useContext(SeatContext);
  const numOfRows = state.numOfRows;
  const seatsPerRow = state.seatsPerRow;
  const hasLoaded = state.hasLoaded;
  const seats = state.seats;
  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag
  if (hasLoaded === true) {
    return (
      <Tippy content={<h1>HELLO</h1>}>
        <Wrapper>
          {range(numOfRows).map((rowIndex) => {
            const rowName = getRowName(rowIndex);

            return (
              <Row key={rowIndex}>
                <RowLabel>Row {rowName}</RowLabel>
                {range(seatsPerRow).map((seatIndex) => {
                  const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                  if (seats[seatId].isBooked === false) {
                    return <ImageTag style={{ filter: "grayscale(100%)" }} />;
                  }
                  return (
                    <SeatWrapper key={seatId}>
                      <ImageTag />
                    </SeatWrapper>
                  );
                })}
              </Row>
            );
          })}
        </Wrapper>
      </Tippy>
    );
  } else {
    return (
      <Wrapper>
        <CircularProgress />
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;
  color: black;
  justify-content: space-between;
  align-items: center;
`;

const RowLabel = styled.div`
  font-weight: bold;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
