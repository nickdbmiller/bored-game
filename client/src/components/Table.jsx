import { useState } from 'react';

import Counter from './Counter';
import TerrOwnerSlider from './TerrOwnerSlider.jsx';

export default function Table(props) {
    // This functions the table from being able to be opened or closed so they players can see the map image. 
    const [show, setShow] = useState(true)

    const [tableTerritories, setTableTerritories] = useState(props.territories)

    // prevents from the form for the owner to be defaulted to blank. 
    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    function handleInput(e) {
        const { id, value } = e.target;
        setTableTerritories((prevInput) => ({
            ...prevInput,
            [id]: value,
        }));
    };

    const handleChange = () => {
        handleInput();
        props.setTerritories(tableTerritories)
    }

    // Changes the text in button to show close or open.
    let expandCollapseLabel;
    if (show) {
        expandCollapseLabel = "Close";
    } else if (!show) {
        expandCollapseLabel = "Open";
    };

    return (
        <div>
            <h1
                className='text-lg font-bold text-yellow-50'
            >
                LeaderBoard
            </h1>
            <button
                className="w-16 text-sm font-bold bg-amber-400 border-1 border-black rounded-sm m-2"
                onClick={()=> setShow(!show)}
            >
                    {expandCollapseLabel}
            </button>
            { show? 
                <div className='results'>
                    <form
                        onSubmit={handleSubmit}
                        onChange={handleChange}
                    >
                        <div className='table'>
                            <table>
                                <tbody>
                                    <tr>
                                        <th className='text-yellow-50'>Territory</th>
                                        <th className='text-yellow-50'>Troops</th>
                                        <th className='text-yellow-50'>Owner</th>
                                    </tr>
                                    {tableTerritories.map((territory, i) => {
                                        return (
                                            <tr
                                                key={i}
                                            >
                                                <td>{territory.territory}</td>
                                                <td>
                                                    <Counter troops={territory.troops}/>
                                                </td>
                                                <td>
                                                    <TerrOwnerSlider
                                                        playerNum = {props.playerNum}
                                                        owner = {territory.owner}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
            :null}
        </div>
    )
}
