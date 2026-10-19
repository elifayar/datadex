"use client";

import { useState } from "react";

export default function Home()
{
    const [pokemon_List, set_Pokemon_List] = useState([]);
    const [pokemon_Name, set_Pokemon_Name] = useState("");
    const [pokemon_Type, set_Pokemon_Type] = useState("");
    const [pokemon_Generation, set_Pokemon_Generation] = useState("");
    const [editing_Id, set_Editing_Id] = useState(null);

    const save_Pokemon = (event) =>
    {
        event.preventDefault();

        if (editing_Id === null)
        {
            const new_Pokemon =
            {
                id: Date.now(),
                name: pokemon_Name,
                type: pokemon_Type,
                generation: pokemon_Generation
            };

            set_Pokemon_List([...pokemon_List, new_Pokemon]);
        }
        else
        {
            const new_List = pokemon_List.map((pokemon) =>
            {
                if (pokemon.id === editing_Id)
                {
                    return {
                        ...pokemon,
                        name: pokemon_Name,
                        type: pokemon_Type,
                        generation: pokemon_Generation
                    };
                }

                return pokemon;
            });

            set_Pokemon_List(new_List);
            set_Editing_Id(null);
        }

        set_Pokemon_Name("");
        set_Pokemon_Type("");
        set_Pokemon_Generation("");
    };

    const edit_Pokemon = (pokemon) =>
    {
        set_Pokemon_Name(pokemon.name);
        set_Pokemon_Type(pokemon.type);
        set_Pokemon_Generation(pokemon.generation);
        set_Editing_Id(pokemon.id);
    };

    const delete_Pokemon = (pokemon_Id) =>
    {
        const new_List = pokemon_List.filter((pokemon) => pokemon.id !== pokemon_Id);

        set_Pokemon_List(new_List);
    };

    return (
        <main>
            <h1>DataDex</h1>
            <p className="subtitle">My Pokemon collection</p>

            <form className="pokemon_Form" onSubmit={save_Pokemon}>
                <input
                    type="text"
                    placeholder="Pokemon name"
                    value={pokemon_Name}
                    onChange={(event) => set_Pokemon_Name(event.target.value)}
                />

                <input
                    type="text"
                    placeholder="Type"
                    value={pokemon_Type}
                    onChange={(event) => set_Pokemon_Type(event.target.value)}
                />

                <input
                    type="text"
                    placeholder="Generation"
                    value={pokemon_Generation}
                    onChange={(event) => set_Pokemon_Generation(event.target.value)}
                />

                <button type="submit">
                    {editing_Id === null ? "Add Pokemon" : "Update Pokemon"}
                </button>
            </form>

            {pokemon_List.map((pokemon) =>
            (
                <div className="pokemon_Card" key={pokemon.id}>
                    <h2>{pokemon.name}</h2>
                    <p>Type: {pokemon.type}</p>
                    <p>Generation: {pokemon.generation}</p>

                    <button onClick={() => edit_Pokemon(pokemon)}>
                        Edit
                    </button>

                    <button onClick={() => delete_Pokemon(pokemon.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </main>
    );
}