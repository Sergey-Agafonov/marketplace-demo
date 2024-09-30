import { useMemo, useState } from "react";
import "./App.css"; // FIXME global styles (regardless of naming convention attempt), after snapshot testing done
import { Calculator } from "./calculator";
import AddItemForm from "./ItemForm"; // TODO maybe rename item -> ad
import ItemsList from "./ItemsList"; // TODO organize all comp. related files in folders

const App = () => {
  const [items, setItems] = useState([]);
  const calc = useMemo(() => new Calculator(), []);

  // single source of truth for miniscule performance impact (assuming ad poster unlikely to have many thousands of ads)
  const total = useMemo(
    () => items.reduce((sum, item) => sum + calc.getFee(item), 0),
    [calc, items]
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to Marketplace Demo</h1>
      </header>
      <div className="App-page">
        <AddItemForm
          onItemAdded={(item) => setItems((prevItems) => [...prevItems, item])}
        />

        {items.length > 0 && (
          <div className="mt-5">
            <ItemsList items={items} />
            {/* TODO make this stand out */}
            <p className="mt-4">Total fees: {total}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
