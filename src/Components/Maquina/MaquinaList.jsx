import React from "react";
import { FixedSizeList as List } from "react-window";
import MaquinaCard from "./MaquinaCard";
import { useWindowSize } from "../../Composables/useWindowSize";

function MaquinasList({ maquinas }) {
  const { height } = useWindowSize();
  const Row = ({ index, style }) => (
    <div className="w-full grid grid-cols-4 grid-rows-2 gap-4">
      <MaquinaCard maquina={maquinas[index]} />
    </div>
  );

  return (
    <List
      height={400} // Ajusta la altura según tus necesidades
      itemCount={maquinas.length}
      itemSize={10} // Ajusta el tamaño según la altura de tu tarjeta
      width={"100%"}
    >
      {Row}
    </List>
  );
}

export default MaquinasList;
