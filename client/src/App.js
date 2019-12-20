import React, { useState, useEffect } from "react";

// SERVICES
import sprintsService from './services/sprintsService';


function App() {
  const [sprints, setsprints] = useState(null);

  useEffect(() => {
    if (!sprints) {
      getSprints();
    }
  });

  const getSprints = async () => {
    let res = await sprintsService.getAll();
    console.log(res);
    setsprints(res);
  }

  return (
    <div className="App">
      <ul className="list">
        {(sprints && sprints.length > 0) ? (
          sprints.map(sprint => <li key={sprint._id}>{sprint.name}</li>)
        ) : (
            <p>No sprints found</p>
          )}
      </ul>
    </div>
  );
}

export default App;