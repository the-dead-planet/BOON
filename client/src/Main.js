import React, { Component, useState, useEffect } from 'react';
import sprintsService from './services/sprintsService';

function Main(props) {
    const [sprints, setSprints] = useState(null);

    const getSprints = async () => {
        let res = await sprintsService.getAll();
        console.log(res);
        setSprints(res);
    }

    useEffect(() => {
        if (!sprints) {
            getSprints();
        }
    })

    return (
        <div>
            <ul>
                {(sprints && sprints.length > 0) ? (
                    sprints.map(sprint => (
                        <li key={sprint._id} style={{ color: "#FFFFFF" }}>
                            <h3>{sprint.name}</h3>
                            <p>{sprint.description}</p>
                        </li>
                    ))
                ) : (
                        <p>No sprints found</p>
                    )}
            </ul>
            <a
                onClick={() => props.onClick("landing")}
                className="ui inverted button btn-slideshow"
            >
                GO BACK!
            </a>
        </div>
    );

}


export default Main;